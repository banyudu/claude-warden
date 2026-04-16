import { readFileSync, existsSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import { homedir } from 'os';
import { join } from 'path';
import type {
  WardenConfig, ConfigLayer, TrustedTarget,
  TrustedRemote, RemoteContext, TargetPolicy, PathPolicy, DatabasePolicy, EndpointPolicy,
  SkillConfigLayer,
} from './types';
import { DEFAULT_CONFIG } from './defaults';

const VALID_DECISIONS = new Set(['allow', 'deny', 'ask']);
function isValidDecision(value: string): value is 'allow' | 'deny' | 'ask' {
  return VALID_DECISIONS.has(value);
}

// Default to quiet: when running as a PreToolUse hook, any stderr
// output is surfaced by Claude Code as "hook error" — even with exit
// code 0. Silent-by-default means any new hook entry point is safe
// without extra wiring. CLI entry points (cli.ts, codex-export.ts)
// explicitly call setQuiet(false) to restore full verbosity.
let quiet = true;
export function setQuiet(value: boolean): void {
  quiet = value;
}
export function warn(message: string): void {
  if (quiet) return;
  process.stderr.write(message);
}

const USER_CONFIG_PATHS = [
  join(homedir(), '.claude', 'warden.yaml'),
  join(homedir(), '.claude', 'warden.json'),
];

const PROJECT_CONFIG_NAMES = [
  '.claude/warden.yaml',
  '.claude/warden.json',
];

export function loadConfig(cwd?: string): WardenConfig {
  const config = structuredClone(DEFAULT_CONFIG);
  const defaultLayer = config.layers[0];

  let userLayer: ConfigLayer | null = null;
  let userRaw: Record<string, unknown> | null = null;
  for (const configPath of USER_CONFIG_PATHS) {
    const result = tryLoadFile(configPath);
    if (result) {
      userLayer = extractLayer(result);
      userRaw = result;
      break;
    }
  }

  let workspaceLayer: ConfigLayer | null = null;
  let workspaceRaw: Record<string, unknown> | null = null;
  if (cwd) {
    for (const name of PROJECT_CONFIG_NAMES) {
      const result = tryLoadFile(join(cwd, name));
      if (result) {
        workspaceLayer = extractLayer(result);
        workspaceRaw = result;
        break;
      }
    }
  }

  // Build layers: workspace > user > default
  config.layers = [
    ...(workspaceLayer ? [workspaceLayer] : []),
    ...(userLayer ? [userLayer] : []),
    defaultLayer,
  ];

  // Build skill layers: workspace > user > default
  const defaultSkillLayer = config.skillRules.layers[0];
  const userSkillLayer = userRaw?.skills ? extractSkillLayer(userRaw.skills as Record<string, unknown>) : null;
  const workspaceSkillLayer = workspaceRaw?.skills ? extractSkillLayer(workspaceRaw.skills as Record<string, unknown>) : null;
  config.skillRules.layers = [
    ...(workspaceSkillLayer ? [workspaceSkillLayer] : []),
    ...(userSkillLayer ? [userSkillLayer] : []),
    defaultSkillLayer,
  ];

  // Merge non-layer fields from user config, then workspace config (workspace wins)
  if (userRaw) mergeNonLayerFields(config, userRaw);
  if (workspaceRaw) mergeNonLayerFields(config, workspaceRaw);

  return config;
}

function tryLoadFile(filePath: string): Record<string, unknown> | null {
  if (!existsSync(filePath)) return null;

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = filePath.endsWith('.yaml') || filePath.endsWith('.yml')
      ? parseYaml(raw)
      : JSON.parse(raw);

    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, unknown>;
    }
  } catch (err) {
    warn(`[warden] Warning: failed to parse config ${filePath}: ${err instanceof Error ? err.message : String(err)}\n`);
  }
  return null;
}

function extractGenericLayer(raw: Record<string, unknown>, nameKey: string): { alwaysAllow: string[]; alwaysDeny: string[]; rules: unknown[] } {
  const rules = Array.isArray(raw.rules) ? raw.rules : [];
  for (const rule of rules) {
    if (rule && typeof rule === 'object') {
      if (rule.default && !isValidDecision(rule.default)) {
        warn(`[warden] Warning: invalid rule default "${rule.default}" for "${rule[nameKey]}", using "ask"\n`);
        rule.default = 'ask';
      }
      if (Array.isArray(rule.argPatterns)) {
        for (const pattern of rule.argPatterns) {
          if (pattern?.decision && !isValidDecision(pattern.decision)) {
            warn(`[warden] Warning: invalid pattern decision "${pattern.decision}" for "${rule[nameKey]}", using "ask"\n`);
            pattern.decision = 'ask';
          }
        }
      }
    }
  }
  return {
    alwaysAllow: Array.isArray(raw.alwaysAllow) ? raw.alwaysAllow : [],
    alwaysDeny: Array.isArray(raw.alwaysDeny) ? raw.alwaysDeny : [],
    rules,
  };
}

function extractSkillLayer(raw: Record<string, unknown>): SkillConfigLayer {
  return extractGenericLayer(raw, 'skill') as SkillConfigLayer;
}

function extractLayer(raw: Record<string, unknown>): ConfigLayer {
  return extractGenericLayer(raw, 'command') as ConfigLayer;
}

export function parseTrustedList(raw: unknown[]): TrustedTarget[] {
  return raw.map(entry => {
    if (typeof entry === 'string') return { name: entry };
    if (entry && typeof entry === 'object' && 'name' in entry) {
      const obj = entry as Record<string, unknown>;
      const target: TrustedTarget = { name: String(obj.name) };
      if (obj.allowAll === true) target.allowAll = true;
      if (obj.overrides && typeof obj.overrides === 'object') {
        target.overrides = extractLayer(obj.overrides as Record<string, unknown>);
      }
      return target;
    }
    return null;
  }).filter((t): t is TrustedTarget => t !== null);
}

const VALID_REMOTE_CONTEXTS = new Set<RemoteContext>(['ssh', 'docker', 'kubectl', 'sprite', 'fly']);

function parseTrustedRemotes(raw: unknown[]): TrustedRemote[] {
  const results: TrustedRemote[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const obj = entry as Record<string, unknown>;
    const context = String(obj.context || '');
    if (!VALID_REMOTE_CONTEXTS.has(context as RemoteContext)) {
      warn(`[warden] Warning: unknown remote context "${context}", skipping\n`);
      continue;
    }
    const name = String(obj.name || '');
    if (!name) continue;
    const remote: TrustedRemote = { name, context: context as RemoteContext };
    if (obj.allowAll === true) remote.allowAll = true;
    if (obj.overrides && typeof obj.overrides === 'object') {
      remote.overrides = extractLayer(obj.overrides as Record<string, unknown>);
    }
    results.push(remote);
  }
  return results;
}

function parseTargetPolicies(raw: unknown[]): TargetPolicy[] {
  const results: TargetPolicy[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const obj = entry as Record<string, unknown>;
    const type = String(obj.type || '');

    const rawDecision = String(obj.decision || 'allow');
    const decision: 'allow' | 'deny' | 'ask' = isValidDecision(rawDecision) ? rawDecision as 'allow' | 'deny' | 'ask' : 'allow';

    const base = {
      commands: Array.isArray(obj.commands) ? obj.commands.map(String) : undefined,
      decision,
      reason: obj.reason ? String(obj.reason) : undefined,
      allowAll: obj.allowAll === true ? true : undefined,
    };

    switch (type) {
      case 'path': {
        const path = String(obj.path || '');
        if (!path) continue;
        const policy: PathPolicy = { ...base, type: 'path', path };
        if (obj.recursive === false) policy.recursive = false;
        results.push(policy);
        break;
      }
      case 'database': {
        const host = String(obj.host || '');
        if (!host) continue;
        const policy: DatabasePolicy = { ...base, type: 'database', host };
        if (typeof obj.port === 'number') policy.port = obj.port;
        if (obj.database) policy.database = String(obj.database);
        results.push(policy);
        break;
      }
      case 'endpoint': {
        const pattern = String(obj.pattern || '');
        if (!pattern) continue;
        results.push({ ...base, type: 'endpoint', pattern });
        break;
      }
      default:
        warn(`[warden] Warning: unknown target policy type "${type}", skipping\n`);
    }
  }
  return results;
}

// Legacy parsers — convert old format to unified TargetPolicy types

function parseLegacyPaths(raw: unknown[]): PathPolicy[] {
  const results: PathPolicy[] = [];
  for (const e of raw) {
    if (!e || typeof e !== 'object') continue;
    const obj = e as Record<string, unknown>;
    const decision = String(obj.decision || 'allow');
    if (!isValidDecision(decision)) continue;
    const path = String(obj.path || '');
    if (!path) continue;
    const tp: PathPolicy = { type: 'path', path, decision: decision as PathPolicy['decision'] };
    if (obj.recursive === false) tp.recursive = false;
    if (Array.isArray(obj.commands)) tp.commands = obj.commands.map(String);
    if (obj.reason) tp.reason = String(obj.reason);
    results.push(tp);
  }
  return results;
}

function parseLegacyDatabases(raw: unknown[]): DatabasePolicy[] {
  const results: DatabasePolicy[] = [];
  for (const e of raw) {
    if (!e || typeof e !== 'object') continue;
    const obj = e as Record<string, unknown>;
    const decision = String(obj.decision || 'allow');
    if (!isValidDecision(decision)) continue;
    const host = String(obj.host || '');
    if (!host) continue;
    const td: DatabasePolicy = { type: 'database', host, decision: decision as DatabasePolicy['decision'] };
    if (typeof obj.port === 'number') td.port = obj.port;
    if (obj.database) td.database = String(obj.database);
    if (Array.isArray(obj.commands)) td.commands = obj.commands.map(String);
    if (obj.reason) td.reason = String(obj.reason);
    results.push(td);
  }
  return results;
}

function parseLegacyEndpoints(raw: unknown[]): EndpointPolicy[] {
  const results: EndpointPolicy[] = [];
  for (const e of raw) {
    if (!e || typeof e !== 'object') continue;
    const obj = e as Record<string, unknown>;
    const decision = String(obj.decision || 'allow');
    if (!isValidDecision(decision)) continue;
    const pattern = String(obj.pattern || '');
    if (!pattern) continue;
    const te: EndpointPolicy = { type: 'endpoint', pattern, decision: decision as EndpointPolicy['decision'] };
    if (Array.isArray(obj.commands)) te.commands = obj.commands.map(String);
    if (obj.reason) te.reason = String(obj.reason);
    results.push(te);
  }
  return results;
}

// Legacy remote context key → RemoteContext mapping
const LEGACY_REMOTE_MAP: Record<string, RemoteContext> = {
  trustedSSHHosts: 'ssh',
  trustedDockerContainers: 'docker',
  trustedKubectlContexts: 'kubectl',
  trustedSprites: 'sprite',
  trustedFlyApps: 'fly',
};

function mergeNonLayerFields(config: WardenConfig, raw: Record<string, unknown>): void {
  // Unified keys (processed first)
  if (Array.isArray(raw.trustedRemotes)) {
    config.trustedRemotes = [...(config.trustedRemotes || []), ...parseTrustedRemotes(raw.trustedRemotes)];
  }
  if (Array.isArray(raw.targetPolicies)) {
    config.targetPolicies = [...(config.targetPolicies || []), ...parseTargetPolicies(raw.targetPolicies)];
  }

  // Legacy remote context aliases → append to trustedRemotes
  for (const [key, context] of Object.entries(LEGACY_REMOTE_MAP)) {
    if (Array.isArray(raw[key])) {
      const remotes = parseTrustedList(raw[key] as unknown[]).map(t => ({ ...t, context }));
      config.trustedRemotes = [...(config.trustedRemotes || []), ...remotes];
    }
  }

  // Legacy data target aliases → append to targetPolicies
  if (Array.isArray(raw.trustedPaths)) {
    config.targetPolicies = [...(config.targetPolicies || []), ...parseLegacyPaths(raw.trustedPaths)];
  }
  if (Array.isArray(raw.trustedDatabases)) {
    config.targetPolicies = [...(config.targetPolicies || []), ...parseLegacyDatabases(raw.trustedDatabases)];
  }
  if (Array.isArray(raw.trustedEndpoints)) {
    config.targetPolicies = [...(config.targetPolicies || []), ...parseLegacyEndpoints(raw.trustedEndpoints)];
  }

  if (typeof raw.defaultDecision === 'string') {
    if (isValidDecision(raw.defaultDecision)) {
      config.defaultDecision = raw.defaultDecision;
    } else {
      warn(`[warden] Warning: invalid defaultDecision "${raw.defaultDecision}", ignoring\n`);
    }
  }
  if (typeof raw.askOnSubshell === 'boolean') {
    config.askOnSubshell = raw.askOnSubshell;
  }
  if (typeof raw.notifyOnAsk === 'boolean') {
    config.notifyOnAsk = raw.notifyOnAsk;
  }
  if (typeof raw.notifyOnDeny === 'boolean') {
    config.notifyOnDeny = raw.notifyOnDeny;
  }
  // Skill-level defaultDecision from skills.defaultDecision
  if (raw.skills && typeof raw.skills === 'object') {
    const skills = raw.skills as Record<string, unknown>;
    if (typeof skills.defaultDecision === 'string') {
      if (isValidDecision(skills.defaultDecision)) {
        config.skillRules.defaultDecision = skills.defaultDecision;
      } else {
        warn(`[warden] Warning: invalid skills.defaultDecision "${skills.defaultDecision}", ignoring\n`);
      }
    }
  }

  if (raw.trustedContextOverrides && typeof raw.trustedContextOverrides === 'object') {
    const overrides = raw.trustedContextOverrides as Record<string, unknown>;
    const layer = extractLayer(overrides);
    // Merge with existing overrides (later config wins by prepending)
    if (config.trustedContextOverrides) {
      config.trustedContextOverrides = {
        alwaysAllow: [...layer.alwaysAllow, ...config.trustedContextOverrides.alwaysAllow],
        alwaysDeny: [...layer.alwaysDeny, ...config.trustedContextOverrides.alwaysDeny],
        rules: [...layer.rules, ...config.trustedContextOverrides.rules],
      };
    } else {
      config.trustedContextOverrides = layer;
    }
  }
}
