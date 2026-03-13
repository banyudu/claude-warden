import { homedir } from 'os';
import type {
  ParseResult, WardenConfig, EvalResult, Decision,
  CommandEvalDetail, ParsedCommand, CommandRule, TrustedTarget,
} from './types';
import { parseCommand } from './parser';

/** Safely test a regex pattern, returning false on invalid patterns. */
function safeRegexTest(pattern: string, input: string): boolean {
  try {
    return new RegExp(pattern).test(input);
  } catch {
    process.stderr.write(`[warden] Warning: invalid regex pattern: ${pattern}\n`);
    return false;
  }
}

/**
 * Match a config entry name against a parsed command.
 * If the name contains '/' (full path), match against originalCommand (with ~ expansion).
 * Otherwise, match against the basename (current behavior).
 */
function commandMatchesName(cmd: ParsedCommand, name: string): boolean {
  if (name.startsWith('/')) {
    return cmd.originalCommand === name;
  }
  if (name.startsWith('~/')) {
    return cmd.originalCommand === homedir() + name.slice(1);
  }
  return cmd.command === name;
}

const MAX_RECURSION_DEPTH = 10;

export function evaluate(parsed: ParseResult, config: WardenConfig, depth: number = 0): EvalResult {
  if (depth > MAX_RECURSION_DEPTH) {
    return { decision: 'ask', reason: 'Maximum recursion depth exceeded', details: [] };
  }

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
      const subResult = evaluate(subParsed, config, depth + 1);
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
    details.push(evaluateCommand(cmd, config, depth));
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

function evaluateCommand(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail {
  const { command, args } = cmd;

  // 1. Scoped alwaysDeny → alwaysAllow per layer (workspace > user > default)
  for (const layer of config.layers) {
    if (layer.alwaysDeny.some(name => commandMatchesName(cmd, name))) {
      return { command, args, decision: 'deny', reason: `"${command}" is blocked`, matchedRule: 'alwaysDeny' };
    }
    if (layer.alwaysAllow.some(name => commandMatchesName(cmd, name))) {
      return { command, args, decision: 'allow', reason: `"${command}" is safe`, matchedRule: 'alwaysAllow' };
    }
  }

  // 2. Remote target whitelisting with recursive command evaluation
  if ((command === 'ssh' || command === 'scp' || command === 'rsync') && config.trustedSSHHosts?.length) {
    const sshResult = evaluateSSHCommand(cmd, config, depth);
    if (sshResult) return sshResult;
  }
  if (command === 'docker' && config.trustedDockerContainers?.length) {
    const dockerResult = evaluateDockerExec(cmd, config, depth);
    if (dockerResult) return dockerResult;
  }
  if (command === 'kubectl' && config.trustedKubectlContexts?.length) {
    const kubectlResult = evaluateKubectlExec(cmd, config, depth);
    if (kubectlResult) return kubectlResult;
  }
  if (command === 'sprite' && config.trustedSprites?.length) {
    const spriteResult = evaluateSpriteExec(cmd, config, depth);
    if (spriteResult) return spriteResult;
  }
  if (command === 'xargs') {
    return evaluateXargsCommand(cmd, config, depth);
  }
  if (command === 'find') {
    return evaluateFindCommand(cmd, config, depth);
  }

  // 3. Scoped command rules — collect and merge across layers
  const mergedRule = collectMergedRule(cmd, config);
  if (mergedRule) {
    return evaluateRule(cmd, mergedRule);
  }

  // 4. Default
  return { command, args, decision: config.defaultDecision, reason: `No rule for "${command}"`, matchedRule: 'default' };
}

/**
 * Collect matching rules across all layers and merge them.
 * Rules are merged by concatenating argPatterns in layer priority order.
 * The `default` decision comes from the highest-priority layer that defines a rule.
 * If any rule has `override: true`, stop collecting from lower layers.
 */
function collectMergedRule(cmd: ParsedCommand, config: WardenConfig): CommandRule | null {
  const matchingRules: CommandRule[] = [];

  for (const layer of config.layers) {
    const rule = layer.rules.find(r => commandMatchesName(cmd, r.command));
    if (rule) {
      matchingRules.push(rule);
      if (rule.override) break;
    }
  }

  if (matchingRules.length === 0) return null;
  if (matchingRules.length === 1) return matchingRules[0];

  const mergedPatterns: CommandRule['argPatterns'] = [];
  for (const rule of matchingRules) {
    if (rule.argPatterns) {
      mergedPatterns.push(...rule.argPatterns);
    }
  }

  return {
    command: matchingRules[0].command,
    default: matchingRules[0].default,
    argPatterns: mergedPatterns,
  };
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
      matched = m.argsMatch.some(re => safeRegexTest(re, argsJoined));
    }

    if (m.anyArgMatches && matched) {
      matched = args.some(arg => m.anyArgMatches!.some(re => safeRegexTest(re, arg)));
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

/** xargs short flags that consume a value. */
const XARGS_SHORT_FLAGS_WITH_VALUE = new Set(['E', 'I', 'L', 'n', 'P', 's', 'S', 'd', 'a']);
/** xargs short flags that do not consume a value. */
const XARGS_SHORT_FLAGS_NO_VALUE = new Set(['0', 'e', 'o', 'p', 'r', 't', 'x']);
/** xargs long flags that consume a value. */
const XARGS_LONG_FLAGS_WITH_VALUE = new Set([
  '--eof', '--replace', '--max-lines', '--max-args', '--max-procs', '--max-chars',
  '--arg-file', '--delimiter',
]);
/** xargs long flags that do not consume a value. */
const XARGS_LONG_FLAGS_NO_VALUE = new Set([
  '--null', '--exit', '--open-tty', '--interactive', '--no-run-if-empty',
  '--verbose', '--show-limits',
]);

function parseXargsSubcommand(args: string[]): { subcommand: ParsedCommand | null; unresolved: boolean } {
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    if (arg === '--') {
      i++;
      break;
    }

    if (!arg.startsWith('-') || arg === '-') {
      break;
    }

    if (arg.startsWith('--')) {
      const eqIndex = arg.indexOf('=');
      const longFlag = eqIndex === -1 ? arg : arg.slice(0, eqIndex);

      if (XARGS_LONG_FLAGS_WITH_VALUE.has(longFlag)) {
        if (eqIndex !== -1) {
          i++;
          continue;
        }
        if (i + 1 >= args.length) return { subcommand: null, unresolved: true };
        i += 2;
        continue;
      }

      if (XARGS_LONG_FLAGS_NO_VALUE.has(longFlag)) {
        i++;
        continue;
      }

      return { subcommand: null, unresolved: true };
    }

    const short = arg[1];
    if (XARGS_SHORT_FLAGS_WITH_VALUE.has(short)) {
      // Inline value form, e.g. -n1 / -I{}
      if (arg.length > 2) {
        i++;
        continue;
      }
      if (i + 1 >= args.length) return { subcommand: null, unresolved: true };
      i += 2;
      continue;
    }

    // Grouped short flags, e.g. -0rt
    const grouped = arg.slice(1).split('');
    const allKnownNoValue = grouped.every(ch => XARGS_SHORT_FLAGS_NO_VALUE.has(ch));
    if (allKnownNoValue) {
      i++;
      continue;
    }

    return { subcommand: null, unresolved: true };
  }

  // No explicit command means xargs defaults to `echo`.
  if (i >= args.length) {
    return {
      unresolved: false,
      subcommand: {
        command: 'echo',
        originalCommand: 'echo',
        args: [],
        envPrefixes: [],
        raw: 'echo',
      },
    };
  }

  const subcommand = args[i];
  const subArgs = args.slice(i + 1);
  return {
    unresolved: false,
    subcommand: {
      command: subcommand,
      originalCommand: subcommand,
      args: subArgs,
      envPrefixes: [],
      raw: [subcommand, ...subArgs].join(' '),
    },
  };
}

function evaluateXargsCommand(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail {
  const { command, args } = cmd;
  const { subcommand, unresolved } = parseXargsSubcommand(args);

  if (unresolved || !subcommand) {
    return {
      command,
      args,
      decision: 'ask',
      reason: 'xargs subcommand could not be resolved safely',
      matchedRule: 'xargs:subcommand',
    };
  }

  // Handle sh/bash/zsh -c "..." — recursively parse inner command
  const isShellExec =
    (subcommand.command === 'sh' || subcommand.command === 'bash' || subcommand.command === 'zsh') &&
    subcommand.args.length >= 2 &&
    subcommand.args[0] === '-c';

  let parsed: ParseResult;
  if (isShellExec) {
    const innerResult = parseCommand(subcommand.args[1]);
    if (innerResult.parseError) {
      parsed = { commands: [subcommand], hasSubshell: false, subshellCommands: [], parseError: false };
    } else {
      parsed = innerResult;
    }
  } else {
    parsed = { commands: [subcommand], hasSubshell: false, subshellCommands: [], parseError: false };
  }

  const result = evaluate(parsed, config, depth + 1);

  return {
    command,
    args,
    decision: result.decision,
    reason: `xargs subcommand "${subcommand.command}": ${result.reason}`,
    matchedRule: 'xargs:subcommand',
  };
}

// ─── find -exec whitelisting ───

function parseFindExecCommands(args: string[]): ParsedCommand[] {
  const commands: ParsedCommand[] = [];
  let i = 0;

  while (i < args.length) {
    if (args[i] === '-exec' || args[i] === '-execdir') {
      i++;
      const cmdArgs: string[] = [];
      while (i < args.length && args[i] !== ';' && args[i] !== '+') {
        if (args[i] !== '{}') {
          cmdArgs.push(args[i]);
        }
        i++;
      }
      i++; // skip terminator
      if (cmdArgs.length > 0) {
        commands.push({
          command: cmdArgs[0],
          originalCommand: cmdArgs[0],
          args: cmdArgs.slice(1),
          envPrefixes: [],
          raw: cmdArgs.join(' '),
        });
      }
    } else {
      i++;
    }
  }

  return commands;
}

function evaluateFindCommand(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail {
  const { command, args } = cmd;

  // -delete, -ok, -okdir are inherently dangerous
  if (args.some(a => a === '-delete')) {
    return { command, args, decision: 'ask', reason: 'find -delete can remove files', matchedRule: 'find:delete' };
  }
  if (args.some(a => a === '-ok' || a === '-okdir')) {
    return { command, args, decision: 'ask', reason: 'find -ok/-okdir can execute commands interactively', matchedRule: 'find:ok' };
  }

  // Extract and evaluate -exec/-execdir commands
  const execCommands = parseFindExecCommands(args);

  if (execCommands.length === 0) {
    return { command, args, decision: 'allow', reason: 'find without dangerous flags', matchedRule: 'find:safe' };
  }

  for (const execCmd of execCommands) {
    const parsed: ParseResult = {
      commands: [execCmd],
      hasSubshell: false,
      subshellCommands: [],
      parseError: false,
    };
    const result = evaluate(parsed, config, depth + 1);
    if (result.decision === 'deny') {
      return { command, args, decision: 'deny', reason: `find -exec: ${result.reason}`, matchedRule: 'find:exec' };
    }
    if (result.decision === 'ask') {
      return { command, args, decision: 'ask', reason: `find -exec: ${result.reason}`, matchedRule: 'find:exec' };
    }
  }

  return { command, args, decision: 'allow', reason: 'find -exec commands are safe', matchedRule: 'find:exec' };
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

function matchesPattern(value: string, targets: TrustedTarget[]): boolean {
  return targets.some(t => globToRegex(t.name).test(value));
}

function findMatchingTarget(value: string, targets: TrustedTarget[]): TrustedTarget | null {
  return targets.find(t => globToRegex(t.name).test(value)) || null;
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
    remoteCommand: remoteArgs.length > 0 ? remoteArgs.map(shellQuote).join(' ') : null,
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

function evaluateSSHCommand(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail | null {
  const { command, args } = cmd;
  const trustedHosts = config.trustedSSHHosts || [];

  if (command === 'scp' || command === 'rsync') {
    const host = extractHostFromRemotePath(args);
    if (!host) return null;
    const target = findMatchingTarget(host, trustedHosts);
    if (!target) return null;
    if (target.allowAll || !target.overrides) {
      return {
        command, args,
        decision: 'allow',
        reason: `Trusted SSH host "${host}"${target.allowAll ? ' (allowAll)' : ''}`,
        matchedRule: 'trustedSSHHosts',
      };
    }
    if (target.overrides.alwaysDeny.some(name => name === command)) {
      return {
        command, args,
        decision: 'deny',
        reason: `Trusted SSH host "${host}": "${command}" blocked by overrides`,
        matchedRule: 'trustedSSHHosts',
      };
    }
    return {
      command, args,
      decision: 'allow',
      reason: `Trusted SSH host "${host}"`,
      matchedRule: 'trustedSSHHosts',
    };
  }

  // ssh
  const { host, remoteCommand } = parseSSHArgs(args);
  if (!host) return null;
  const target = findMatchingTarget(host, trustedHosts);
  if (!target) return null;

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
  if (target.allowAll) {
    return {
      command, args,
      decision: 'allow',
      reason: `Trusted SSH host "${host}" (allowAll)`,
      matchedRule: 'trustedSSHHosts',
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, configWithContextOverrides(config, target), depth + 1);
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

/** Re-quote an arg if it contains spaces or shell metacharacters. */
function shellQuote(arg: string): string {
  if (/[\s"'\\$`!#&|;()<>]/.test(arg)) {
    return `'${arg.replace(/'/g, "'\\''")}'`;
  }
  return arg;
}

/** Build a config with trustedContextOverrides applied as the highest-priority layer. */
function configWithContextOverrides(config: WardenConfig, target?: TrustedTarget | null): WardenConfig {
  const overrideLayers = [];
  // Per-target overrides take highest priority
  if (target?.overrides) overrideLayers.push(target.overrides);
  // Global overrides are baseline
  if (config.trustedContextOverrides) overrideLayers.push(config.trustedContextOverrides);
  if (overrideLayers.length === 0) return config;
  return {
    ...config,
    layers: [...overrideLayers, ...config.layers],
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
  target?: TrustedTarget | null,
  depth: number = 0,
): EvalResult {
  if (target?.allowAll) {
    return { decision: 'allow', reason: 'allowAll target', details: [] };
  }
  const overriddenConfig = configWithContextOverrides(config, target);

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
    return evaluate(parsed, overriddenConfig, depth + 1);
  }

  // Normal command — construct a ParsedCommand directly from structured args
  const parsed: ParseResult = {
    commands: [{ command: remoteCmd, originalCommand: remoteCmd, args: remoteArgs.slice(1), envPrefixes: [], raw: remoteArgs.join(' ') }],
    hasSubshell: false,
    subshellCommands: [],
    parseError: false,
  };
  return evaluate(parsed, overriddenConfig, depth + 1);
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

function evaluateDockerExec(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail | null {
  const { command, args } = cmd;
  if (args[0] !== 'exec') return null;

  const { target: containerName, remoteArgs } = parseDockerExecArgs(args.slice(1));
  if (!containerName) return null;
  const matched = findMatchingTarget(containerName, config.trustedDockerContainers || []);
  if (!matched) return null;

  const result = evaluateRemoteCommand(remoteArgs, config, matched, depth);
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted Docker container "${containerName}" (${result.reason})`,
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

function evaluateKubectlExec(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail | null {
  const { command, args } = cmd;
  if (args[0] !== 'exec') return null;

  const { context, pod, remoteArgs } = parseKubectlExecArgs(args.slice(1));
  if (!context) return null;
  const matched = findMatchingTarget(context, config.trustedKubectlContexts || []);
  if (!matched) return null;

  const result = evaluateRemoteCommand(remoteArgs, config, matched, depth);
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

function evaluateSpriteExec(cmd: ParsedCommand, config: WardenConfig, depth: number = 0): CommandEvalDetail | null {
  const { command, args } = cmd;
  const { spriteName, remoteArgs } = parseSpriteExecArgs(args);
  if (!spriteName) return null;
  const matched = findMatchingTarget(spriteName, config.trustedSprites || []);
  if (!matched) return null;

  const result = evaluateRemoteCommand(remoteArgs, config, matched, depth);
  return {
    command, args,
    decision: result.decision,
    reason: `Trusted sprite "${spriteName}" (${result.reason})`,
    matchedRule: 'trustedSprites',
  };
}
