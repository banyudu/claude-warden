import { resolve, normalize } from 'path';
import type {
  ParsedCommand, WardenConfig, CommandEvalDetail,
  PathPolicy, DatabasePolicy, EndpointPolicy,
} from './types';
import { globToRegex } from './glob';

// Commands known to operate on filesystem paths
const PATH_COMMANDS = new Set([
  'rm', 'chmod', 'chown', 'cp', 'mv', 'tee', 'mkdir', 'rmdir', 'touch', 'ln',
]);

export function evaluatePathTarget(
  cmd: ParsedCommand,
  cwd: string,
  targets: PathPolicy[],
): CommandEvalDetail | null {
  if (targets.length === 0) return null;

  // Extract positional args (skip flags)
  const positionalArgs = cmd.args.filter(a => !a.startsWith('-'));
  if (positionalArgs.length === 0) return null;

  let bestMatch: CommandEvalDetail | null = null;

  for (const target of targets) {
    // allowAll: match any command, skip commands filter and PATH_COMMANDS gate
    if (target.allowAll) {
      // Still need path to match
    } else {
      // Filter by command list if specified
      if (target.commands && target.commands.length > 0 && !target.commands.includes(cmd.command)) {
        continue;
      }

      // Skip if command isn't a path-operating command (when no commands filter specified)
      if (!target.commands && !PATH_COMMANDS.has(cmd.command)) {
        continue;
      }
    }

    const targetPath = normalize(target.path.replace(/\{\{cwd\}\}/g, cwd));
    const recursive = target.recursive !== false; // default true

    for (const arg of positionalArgs) {
      const resolvedArg = normalize(resolve(cwd, arg));

      const matches = recursive
        ? resolvedArg === targetPath || resolvedArg.startsWith(targetPath + '/')
        : resolvedArg === targetPath;

      if (matches) {
        const decision = target.allowAll ? 'allow' as const : target.decision;
        const detail: CommandEvalDetail = {
          command: cmd.command,
          args: cmd.args,
          decision,
          reason: target.reason || `Path "${resolvedArg}" matches trusted path "${target.path}" (${decision})`,
          matchedRule: 'trustedPaths',
        };
        // Deny takes precedence
        if (decision === 'deny') return detail;
        if (!bestMatch || bestMatch.decision !== 'deny') {
          bestMatch = detail;
        }
      }
    }
  }

  return bestMatch;
}

// DB command flag mappings
const DB_HOST_FLAGS: Record<string, string[]> = {
  psql: ['-h', '--host'],
  mysql: ['-h', '--host'],
  mariadb: ['-h', '--host'],
  'redis-cli': ['-h'],
  mongosh: ['--host'],
};

const DB_DATABASE_FLAGS: Record<string, string[]> = {
  psql: ['-d', '--dbname'],
  mysql: ['-D', '--database'],
  mariadb: ['-D', '--database'],
};

const DB_PORT_FLAGS: Record<string, string[]> = {
  psql: ['-p', '--port'],
  mysql: ['-P', '--port'],
  mariadb: ['-P', '--port'],
  'redis-cli': ['-p'],
  mongosh: ['--port'],
};

interface DBConnectionInfo {
  host?: string;
  port?: number;
  database?: string;
}

function extractFlagValue(args: string[], flags: string[]): string | undefined {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    // --flag=value
    for (const f of flags) {
      if (arg.startsWith(f + '=')) {
        return arg.slice(f.length + 1);
      }
    }
    // --flag value
    if (flags.includes(arg) && i + 1 < args.length) {
      return args[i + 1];
    }
  }
  return undefined;
}

function parseDBConnection(cmd: ParsedCommand): DBConnectionInfo {
  const command = cmd.command;
  const info: DBConnectionInfo = {};

  // Check for URI format
  for (const arg of cmd.args) {
    if (arg.startsWith('postgresql://') || arg.startsWith('postgres://')) {
      try {
        const url = new URL(arg);
        info.host = url.hostname;
        if (url.port) info.port = parseInt(url.port, 10);
        if (url.pathname.length > 1) info.database = url.pathname.slice(1);
        return info;
      } catch { /* not a valid URL, continue */ }
    }
    if (arg.startsWith('mongodb://') || arg.startsWith('mongodb+srv://')) {
      try {
        const url = new URL(arg);
        info.host = url.hostname;
        if (url.port) info.port = parseInt(url.port, 10);
        if (url.pathname.length > 1) info.database = url.pathname.slice(1);
        return info;
      } catch { /* not a valid URL, continue */ }
    }
  }

  // Flag-based parsing
  const hostFlags = DB_HOST_FLAGS[command];
  if (hostFlags) {
    const h = extractFlagValue(cmd.args, hostFlags);
    if (h) info.host = h;
  }

  const dbFlags = DB_DATABASE_FLAGS[command];
  if (dbFlags) {
    const d = extractFlagValue(cmd.args, dbFlags);
    if (d) info.database = d;
  }

  const portFlags = DB_PORT_FLAGS[command];
  if (portFlags) {
    const p = extractFlagValue(cmd.args, portFlags);
    if (p) info.port = parseInt(p, 10);
  }

  return info;
}

const DB_COMMANDS = new Set(Object.keys(DB_HOST_FLAGS));

export function evaluateDatabaseTarget(
  cmd: ParsedCommand,
  targets: DatabasePolicy[],
): CommandEvalDetail | null {
  if (targets.length === 0) return null;

  // allowAll targets can match any command that has DB connection info
  const hasAllowAll = targets.some(t => t.allowAll);
  if (!hasAllowAll && !DB_COMMANDS.has(cmd.command)) return null;

  // For non-allowAll targets, still gate on DB_COMMANDS
  const applicableTargets = targets.filter(t => t.allowAll || DB_COMMANDS.has(cmd.command));
  if (applicableTargets.length === 0) return null;

  const conn = parseDBConnection(cmd);
  if (!conn.host) return null;

  let bestMatch: CommandEvalDetail | null = null;

  for (const target of applicableTargets) {
    if (!target.allowAll && target.commands && target.commands.length > 0 && !target.commands.includes(cmd.command)) {
      continue;
    }

    const hostMatch = globToRegex(target.host).test(conn.host);
    if (!hostMatch) continue;

    if (target.port !== undefined && conn.port !== undefined && target.port !== conn.port) {
      continue;
    }

    if (target.database) {
      // If target specifies a database, the command must also specify one and it must match
      if (!conn.database || !globToRegex(target.database).test(conn.database)) continue;
    }

    const decision = target.allowAll ? 'allow' as const : target.decision;
    const detail: CommandEvalDetail = {
      command: cmd.command,
      args: cmd.args,
      decision,
      reason: target.reason || `Database "${conn.host}${conn.database ? '/' + conn.database : ''}" matches trusted database (${decision})`,
      matchedRule: 'trustedDatabases',
    };

    if (decision === 'deny') return detail;
    if (!bestMatch) bestMatch = detail;
  }

  return bestMatch;
}

const ENDPOINT_COMMANDS = new Set(['curl', 'wget', 'http', 'httpie']);

function extractURLs(cmd: ParsedCommand): string[] {
  const urls: string[] = [];
  const args = cmd.args;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    // curl --url flag
    if ((arg === '--url') && i + 1 < args.length) {
      urls.push(args[i + 1]);
      i++;
      continue;
    }
    // Positional URLs (starts with http:// or https://)
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      urls.push(arg);
    }
  }

  return urls;
}

export function evaluateEndpointTarget(
  cmd: ParsedCommand,
  targets: EndpointPolicy[],
): CommandEvalDetail | null {
  if (targets.length === 0) return null;

  // allowAll targets can match any command that has URL args
  const hasAllowAll = targets.some(t => t.allowAll);
  if (!hasAllowAll && !ENDPOINT_COMMANDS.has(cmd.command)) return null;

  const urls = extractURLs(cmd);
  if (urls.length === 0) return null;

  let bestMatch: CommandEvalDetail | null = null;

  for (const target of targets) {
    if (!target.allowAll && target.commands && target.commands.length > 0 && !target.commands.includes(cmd.command)) {
      continue;
    }

    for (const url of urls) {
      if (globToRegex(target.pattern).test(url)) {
        const decision = target.allowAll ? 'allow' as const : target.decision;
        const detail: CommandEvalDetail = {
          command: cmd.command,
          args: cmd.args,
          decision,
          reason: target.reason || `URL "${url}" matches trusted endpoint "${target.pattern}" (${decision})`,
          matchedRule: 'trustedEndpoints',
        };

        if (decision === 'deny') return detail;
        if (!bestMatch) bestMatch = detail;
      }
    }
  }

  return bestMatch;
}

export function evaluateTargetPolicies(
  cmd: ParsedCommand,
  cwd: string,
  config: WardenConfig,
): CommandEvalDetail | null {
  const policies = config.targetPolicies;
  if (!policies?.length) return null;

  const results: CommandEvalDetail[] = [];

  const pathPolicies = policies.filter((p): p is PathPolicy => p.type === 'path');
  if (pathPolicies.length) {
    const r = evaluatePathTarget(cmd, cwd, pathPolicies);
    if (r) results.push(r);
  }

  const dbPolicies = policies.filter((p): p is DatabasePolicy => p.type === 'database');
  if (dbPolicies.length) {
    const r = evaluateDatabaseTarget(cmd, dbPolicies);
    if (r) results.push(r);
  }

  const endpointPolicies = policies.filter((p): p is EndpointPolicy => p.type === 'endpoint');
  if (endpointPolicies.length) {
    const r = evaluateEndpointTarget(cmd, endpointPolicies);
    if (r) results.push(r);
  }

  if (results.length === 0) return null;

  // Deny takes precedence
  const deny = results.find(r => r.decision === 'deny');
  if (deny) return deny;

  return results[0];
}
