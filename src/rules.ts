import { readFileSync, existsSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import { homedir } from 'os';
import { join } from 'path';
import type { WardenConfig, ConfigLayer } from './types';
import { DEFAULT_CONFIG } from './defaults';

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
  } catch {
    // Skip invalid config files silently
  }
  return null;
}

function extractLayer(raw: Record<string, unknown>): ConfigLayer {
  return {
    alwaysAllow: Array.isArray(raw.alwaysAllow) ? raw.alwaysAllow : [],
    alwaysDeny: Array.isArray(raw.alwaysDeny) ? raw.alwaysDeny : [],
    rules: Array.isArray(raw.rules) ? raw.rules : [],
  };
}

function mergeNonLayerFields(config: WardenConfig, raw: Record<string, unknown>): void {
  if (Array.isArray(raw.trustedSSHHosts)) {
    config.trustedSSHHosts = [...(config.trustedSSHHosts || []), ...raw.trustedSSHHosts];
  }
  if (Array.isArray(raw.trustedDockerContainers)) {
    config.trustedDockerContainers = [...(config.trustedDockerContainers || []), ...raw.trustedDockerContainers];
  }
  if (Array.isArray(raw.trustedKubectlContexts)) {
    config.trustedKubectlContexts = [...(config.trustedKubectlContexts || []), ...raw.trustedKubectlContexts];
  }
  if (Array.isArray(raw.trustedSprites)) {
    config.trustedSprites = [...(config.trustedSprites || []), ...raw.trustedSprites];
  }
  if (typeof raw.defaultDecision === 'string') {
    config.defaultDecision = raw.defaultDecision as WardenConfig['defaultDecision'];
  }
  if (typeof raw.askOnSubshell === 'boolean') {
    config.askOnSubshell = raw.askOnSubshell;
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
