import type {
  ParseResult, WardenConfig, EvalResult, Decision,
  CommandEvalDetail, ParsedCommand, CommandRule,
} from './types';
import { parseCommand } from './parser';

export function evaluate(parsed: ParseResult, config: WardenConfig): EvalResult {
  if (parsed.parseError) {
    return { decision: 'ask', reason: 'Could not parse command safely', details: [] };
  }

  if (parsed.commands.length === 0) {
    return { decision: 'allow', reason: 'Empty command', details: [] };
  }

  // Recursively evaluate extracted subshell commands
  if (parsed.hasSubshell && parsed.subshellCommands.length > 0) {
    for (const subCmd of parsed.subshellCommands) {
      const subParsed = parseCommand(subCmd);
      const subResult = evaluate(subParsed, config);
      if (subResult.decision === 'deny') {
        return { decision: 'deny', reason: `Subshell command: ${subResult.reason}`, details: subResult.details };
      }
      if (subResult.decision === 'ask') {
        return { decision: 'ask', reason: `Subshell command: ${subResult.reason}`, details: subResult.details };
      }
    }
  } else if (parsed.hasSubshell && parsed.subshellCommands.length === 0 && config.askOnSubshell) {
    // Unparseable subshell (heredocs, complex constructs) — fall back to ask
    return { decision: 'ask', reason: 'Command contains subshell/command substitution', details: [] };
  }

  const details: CommandEvalDetail[] = [];
  for (const cmd of parsed.commands) {
    details.push(evaluateCommand(cmd, config));
  }

  // Combine: deny > ask > allow
  const decisions = details.map(d => d.decision);

  if (decisions.includes('deny')) {
    const denied = details.filter(d => d.decision === 'deny');
    return {
      decision: 'deny',
      reason: denied.map(d => `${d.command}: ${d.reason}`).join('; '),
      details,
    };
  }

  if (decisions.includes('ask')) {
    const asked = details.filter(d => d.decision === 'ask');
    return {
      decision: 'ask',
      reason: asked.map(d => `${d.command}: ${d.reason}`).join('; '),
      details,
    };
  }

  return { decision: 'allow', reason: 'All commands are safe', details };
}

function evaluateCommand(cmd: ParsedCommand, config: WardenConfig): CommandEvalDetail {
  const { command, args } = cmd;

  // 1. Scoped alwaysDeny → alwaysAllow per layer (workspace > user > default)
  for (const layer of config.layers) {
    if (layer.alwaysDeny.includes(command)) {
      return { command, args, decision: 'deny', reason: `"${command}" is blocked`, matchedRule: 'alwaysDeny' };
    }
    if (layer.alwaysAllow.includes(command)) {
      return { command, args, decision: 'allow', reason: `"${command}" is safe`, matchedRule: 'alwaysAllow' };
    }
  }

  // 2. Remote target whitelisting with recursive command evaluation
  if ((command === 'ssh' || command === 'scp' || command === 'rsync') && config.trustedSSHHosts?.length) {
    const sshResult = evaluateSSHCommand(cmd, config);
    if (sshResult) return sshResult;
  }
  if (command === 'docker' && config.trustedDockerContainers?.length) {
    const dockerResult = evaluateDockerExec(cmd, config);
    if (dockerResult) return dockerResult;
  }
  if (command === 'kubectl' && config.trustedKubectlContexts?.length) {
    const kubectlResult = evaluateKubectlExec(cmd, config);
    if (kubectlResult) return kubectlResult;
  }
  if (command === 'sprite' && config.trustedSprites?.length) {
    const spriteResult = evaluateSpriteExec(cmd, config);
    if (spriteResult) return spriteResult;
  }

  // 3. Scoped command rules (first layer with a matching rule wins)
  for (const layer of config.layers) {
    const rule = layer.rules.find(r => r.command === command);
    if (rule) {
      return evaluateRule(cmd, rule);
    }
  }

  // 4. Default
  return { command, args, decision: config.defaultDecision, reason: `No rule for "${command}"`, matchedRule: 'default' };
}

function evaluateRule(cmd: ParsedCommand, rule: CommandRule): CommandEvalDetail {
  const { command, args } = cmd;
  const argsJoined = args.join(' ');

  for (const pattern of rule.argPatterns || []) {
    const m = pattern.match;
    let matched = true;

    if (m.noArgs !== undefined) {
      matched = matched && (m.noArgs === (args.length === 0));
    }

    if (m.argsMatch && matched) {
      matched = m.argsMatch.some(re => new RegExp(re).test(argsJoined));
    }

    if (m.anyArgMatches && matched) {
      matched = args.some(arg => m.anyArgMatches!.some(re => new RegExp(re).test(arg)));
    }

    if (m.argCount && matched) {
      if (m.argCount.min !== undefined) matched = matched && args.length >= m.argCount.min;
      if (m.argCount.max !== undefined) matched = matched && args.length <= m.argCount.max;
    }

    if (m.not) matched = !matched;

    if (matched) {
      return {
        command, args,
        decision: pattern.decision,
        reason: pattern.reason || pattern.description || `Matched pattern for "${command}"`,
        matchedRule: `${command}:argPattern`,
      };
    }
  }

  // No pattern matched → use rule default
  return {
    command, args,
    decision: rule.default,
    reason: `Default for "${command}"`,
    matchedRule: `${command}:default`,
  };
}

/** SSH flags that consume the next argument (skip it when extracting host). */
const SSH_FLAGS_WITH_VALUE = new Set([
  '-b', '-c', '-D', '-E', '-e', '-F', '-I', '-i', '-J', '-L',
  '-l', '-m', '-O', '-o', '-p', '-Q', '-R', '-S', '-W', '-w',
]);

/** Convert a glob pattern to a RegExp. Supports *, ?, [...], and {a,b,c}. */
function globToRegex(pattern: string): RegExp {
  let regex = '';
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i];
    if (ch === '*') {
      regex += '.*';
    } else if (ch === '?') {
      regex += '.';
    } else if (ch === '[') {
      // Pass through character class until closing ]
      i++;
      // Handle negation [!...] → [^...]
      if (i < pattern.length && pattern[i] === '!') {
        regex += '[^';
        i++;
      } else {
        regex += '[';
      }
      while (i < pattern.length && pattern[i] !== ']') {
        regex += pattern[i];
        i++;
      }
      if (i < pattern.length) {
        regex += ']';
      }
    } else if (ch === '{') {
      // Brace expansion {a,b,c} → (a|b|c)
      const end = pattern.indexOf('}', i);
      if (end !== -1) {
        const alternatives = pattern.slice(i + 1, end).split(',').map(s => s.replace(/[.+^$|\\()]/g, '\\$&'));
        regex += `(${alternatives.join('|')})`;
        i = end;
      } else {
        regex += '\\{';
      }
    } else if ('.+^$|\\()'.includes(ch)) {
      regex += '\\' + ch;
    } else {
      regex += ch;
    }
    i++;
  }
  return new RegExp(`^${regex}$`);
}

function matchesPattern(value: string, patterns: string[]): boolean {
  return patterns.some(p => globToRegex(p).test(value));
}

interface SSHParseResult {
  host: string | null;
  remoteCommand: string | null;
}

function parseSSHArgs(args: string[]): SSHParseResult {
  let host: string | null = null;
  const remoteArgs: string[] = [];
  let i = 0;

  while (i < args.length) {
    const arg = args[i];
    if (SSH_FLAGS_WITH_VALUE.has(arg)) {
      i += 2; // skip flag and its value
      continue;
    }
    if (arg.startsWith('-')) {
      i++; // boolean flag
      continue;
    }
    // First positional arg is host
    if (!host) {
      host = arg.includes('@') ? arg.split('@').pop()! : arg;
      i++;
      // Remaining positional args are the remote command
      while (i < args.length) {
        remoteArgs.push(args[i]);
        i++;
      }
      break;
    }
    i++;
  }

  return {
    host,
    remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(' ') : null,
  };
}

/** Extract host from scp/rsync args like `[user@]host:path`. */
function extractHostFromRemotePath(args: string[]): string | null {
  for (const arg of args) {
    const match = arg.match(/^(?:[^@]+@)?([^:]+):/);
    if (match) return match[1];
  }
  return null;
}

function evaluateSSHCommand(cmd: ParsedCommand, config: WardenConfig): CommandEvalDetail | null {
  const { command, args } = cmd;
  const trustedHosts = config.trustedSSHHosts || [];

  if (command === 'scp' || command === 'rsync') {
    const host = extractHostFromRemotePath(args);
    if (host && matchesPattern(host, trustedHosts)) {
      return {
        command, args,
        decision: 'allow',
        reason: `Trusted SSH host "${host}"`,
        matchedRule: 'trustedSSHHosts',
      };
    }
    return null; // fall through to normal rules
  }

  // ssh
  const { host, remoteCommand } = parseSSHArgs(args);
  if (!host || !matchesPattern(host, trustedHosts)) return null;

  // Trusted host, no remote command
  if (!remoteCommand) {
    return {
      command, args,
      decision: 'allow',
      reason: `Trusted SSH host "${host}" (interactive)`,
      matchedRule: 'trustedSSHHosts',
    };
  }

  // Trusted host with remote command — recursively evaluate with context overrides
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, configWithContextOverrides(config));
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted SSH host "${host}": ${result.reason}`,
    matchedRule: 'trustedSSHHosts',
  };
}

// ─── Docker exec whitelisting ───

/** docker exec flags that consume the next argument. */
const DOCKER_EXEC_FLAGS_WITH_VALUE = new Set([
  '-e', '--env', '--env-file', '-u', '--user', '-w', '--workdir', '--detach-keys',
]);

interface ExecParseResult {
  target: string | null;
  remoteArgs: string[];
}

/** Shell interpreters that are safe as interactive sessions on trusted remotes. */
const INTERACTIVE_SHELLS = new Set(['bash', 'sh', 'zsh']);

/** Build a config with trustedContextOverrides applied as the highest-priority layer. */
function configWithContextOverrides(config: WardenConfig): WardenConfig {
  if (!config.trustedContextOverrides) return config;
  return {
    ...config,
    layers: [config.trustedContextOverrides, ...config.layers],
  };
}

/**
 * Evaluate remote command args from a trusted remote context (docker, kubectl, sprite).
 * Handles: no command (interactive), bare shell, shell -c "...", and normal commands.
 * Uses structured args to avoid losing quote context from join+re-parse.
 */
function evaluateRemoteCommand(
  remoteArgs: string[],
  config: WardenConfig,
): EvalResult {
  const overriddenConfig = configWithContextOverrides(config);

  if (remoteArgs.length === 0) {
    return { decision: 'allow', reason: 'interactive', details: [] };
  }

  const remoteCmd = remoteArgs[0];

  // Bare shell invocation (e.g. `bash`, `sh`) → interactive session
  if (INTERACTIVE_SHELLS.has(remoteCmd) && remoteArgs.length === 1) {
    return { decision: 'allow', reason: 'interactive shell', details: [] };
  }

  // Shell -c "..." → evaluate the inner command string (which preserves pipes/operators)
  if (INTERACTIVE_SHELLS.has(remoteCmd) && remoteArgs[1] === '-c' && remoteArgs.length >= 3) {
    const innerCommand = remoteArgs.slice(2).join(' ');
    const parsed = parseCommand(innerCommand);
    return evaluate(parsed, overriddenConfig);
  }

  // Normal command — construct a ParsedCommand directly from structured args
  const parsed: ParseResult = {
    commands: [{ command: remoteCmd, args: remoteArgs.slice(1) }],
    hasSubshell: false,
    subshellCommands: [],
  };
  return evaluate(parsed, overriddenConfig);
}

function parseDockerExecArgs(args: string[]): ExecParseResult {
  let target: string | null = null;
  const remoteArgs: string[] = [];
  let i = 0;

  while (i < args.length) {
    const arg = args[i];
    if (DOCKER_EXEC_FLAGS_WITH_VALUE.has(arg)) {
      i += 2;
      continue;
    }
    if (arg.startsWith('-')) {
      i++;
      continue;
    }
    if (!target) {
      target = arg;
      i++;
      while (i < args.length) {
        remoteArgs.push(args[i]);
        i++;
      }
      break;
    }
    i++;
  }

  return { target, remoteArgs };
}

function evaluateDockerExec(cmd: ParsedCommand, config: WardenConfig): CommandEvalDetail | null {
  const { command, args } = cmd;
  if (args[0] !== 'exec') return null;

  const { target, remoteArgs } = parseDockerExecArgs(args.slice(1));
  if (!target || !matchesPattern(target, config.trustedDockerContainers || [])) return null;

  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted Docker container "${target}" (${result.reason})`,
    matchedRule: 'trustedDockerContainers',
  };
}

// ─── kubectl exec whitelisting ───

/** kubectl flags that consume the next argument (relevant to exec). */
const KUBECTL_FLAGS_WITH_VALUE = new Set([
  '-n', '--namespace', '-c', '--container', '--context', '--cluster',
  '--kubeconfig', '-s', '--server', '--token', '--user', '--as',
  '--as-group', '--certificate-authority', '--client-certificate',
  '--client-key', '-l', '--selector', '-f', '--filename',
  '--cache-dir', '--request-timeout', '-o', '--output',
]);

function parseKubectlExecArgs(args: string[]): { context: string | null; pod: string | null; remoteArgs: string[] } {
  let context: string | null = null;
  let pod: string | null = null;
  const remoteArgs: string[] = [];
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    if (arg === '--') {
      i++;
      while (i < args.length) {
        remoteArgs.push(args[i]);
        i++;
      }
      break;
    }

    // Handle --flag=value syntax
    if (arg.startsWith('--') && arg.includes('=')) {
      if (arg.startsWith('--context=')) {
        context = arg.split('=')[1];
      }
      i++;
      continue;
    }

    if (KUBECTL_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === '--context') context = args[i + 1] || null;
      i += 2;
      continue;
    }
    if (arg.startsWith('-')) {
      i++;
      continue;
    }
    // First positional arg is the pod
    if (!pod) {
      pod = arg;
    }
    i++;
  }

  return { context, pod, remoteArgs };
}

function evaluateKubectlExec(cmd: ParsedCommand, config: WardenConfig): CommandEvalDetail | null {
  const { command, args } = cmd;
  if (args[0] !== 'exec') return null;

  const { context, pod, remoteArgs } = parseKubectlExecArgs(args.slice(1));
  const trustedContexts = config.trustedKubectlContexts || [];

  // Must have a context (explicit or matched) to whitelist
  if (!context || !matchesPattern(context, trustedContexts)) return null;

  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted kubectl context "${context}"${pod ? `, pod "${pod}"` : ''} (${result.reason})`,
    matchedRule: 'trustedKubectlContexts',
  };
}

// ─── Sprite exec whitelisting ───

/** sprite global flags that consume the next argument. */
const SPRITE_FLAGS_WITH_VALUE = new Set([
  '-o', '--org', '-s', '--sprite',
]);

function parseSpriteExecArgs(args: string[]): { spriteName: string | null; remoteArgs: string[] } {
  let spriteName: string | null = null;
  const remoteArgs: string[] = [];
  let foundExec = false;
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    // Handle --flag=value syntax
    if (arg.startsWith('--') && arg.includes('=')) {
      if (arg.startsWith('--sprite=')) {
        spriteName = arg.split('=')[1];
      }
      i++;
      continue;
    }

    if (SPRITE_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === '-s' || arg === '--sprite') {
        spriteName = args[i + 1] || null;
      }
      i += 2;
      continue;
    }

    if (arg === '--debug') {
      i++;
      continue;
    }

    if (arg.startsWith('-')) {
      i++;
      continue;
    }

    // Look for "exec", "x", "console", or "c" subcommand
    if (!foundExec) {
      if (arg === 'exec' || arg === 'x' || arg === 'console' || arg === 'c') {
        foundExec = true;
        i++;
        continue;
      }
      // Unknown positional before subcommand — bail
      return { spriteName: null, remoteArgs: [] };
    }

    // After exec subcommand, remaining args are the remote command
    while (i < args.length) {
      remoteArgs.push(args[i]);
      i++;
    }
    break;
  }

  return { spriteName, remoteArgs };
}

function evaluateSpriteExec(cmd: ParsedCommand, config: WardenConfig): CommandEvalDetail | null {
  const { command, args } = cmd;
  const { spriteName, remoteArgs } = parseSpriteExecArgs(args);
  const trustedSprites = config.trustedSprites || [];

  if (!spriteName || !matchesPattern(spriteName, trustedSprites)) return null;

  const result = evaluateRemoteCommand(remoteArgs, config);
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted sprite "${spriteName}" (${result.reason})`,
    matchedRule: 'trustedSprites',
  };
}
