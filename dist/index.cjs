"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/parser.ts
var import_bash_parser = __toESM(require("bash-parser"), 1);
var import_path = require("path");
var HEREDOC_REGEX = /<<-?\s*['"]?\w+['"]?/;
function convertCommand(node) {
  if (!node.name) return null;
  const command = node.name.text.includes("/") ? (0, import_path.basename)(node.name.text) : node.name.text;
  const envPrefixes = [];
  if (node.prefix) {
    for (const p of node.prefix) {
      if (p.type === "AssignmentWord") {
        envPrefixes.push(p.text);
      }
    }
  }
  const args = [];
  if (node.suffix) {
    for (const s of node.suffix) {
      if (s.type === "Word") {
        args.push(s.text);
      }
    }
  }
  const rawParts = [
    ...envPrefixes,
    node.name.text,
    ...args
  ];
  const raw = rawParts.join(" ");
  return { command, args, envPrefixes, raw };
}
function hasCommandExpansion(node) {
  if (node.type === "CommandExpansion") return true;
  if (node.type === "Command") {
    const cmd = node;
    if (cmd.suffix) {
      for (const s of cmd.suffix) {
        if (s.type === "Word" && s.expansion) {
          for (const exp of s.expansion) {
            if (exp.type === "CommandExpansion") return true;
          }
        }
      }
    }
    if (cmd.name?.expansion) {
      for (const exp of cmd.name.expansion) {
        if (exp.type === "CommandExpansion") return true;
      }
    }
  }
  return false;
}
function walkNode(node, result) {
  switch (node.type) {
    case "Command": {
      const cmd = node;
      if (hasCommandExpansion(node)) {
        result.hasSubshell = true;
      }
      const parsed = convertCommand(cmd);
      if (!parsed) break;
      if ((parsed.command === "sh" || parsed.command === "bash" || parsed.command === "zsh") && parsed.args.length >= 2 && parsed.args[0] === "-c") {
        const innerResult = parseCommand(parsed.args[1]);
        if (innerResult.parseError) {
          result.commands.push(parsed);
        } else {
          result.commands.push(...innerResult.commands);
          if (innerResult.hasSubshell) {
            result.hasSubshell = true;
          }
        }
      } else {
        result.commands.push(parsed);
      }
      break;
    }
    case "Pipeline": {
      const pipeline = node;
      for (const cmd of pipeline.commands) {
        walkNode(cmd, result);
      }
      break;
    }
    case "LogicalExpression": {
      const logical = node;
      walkNode(logical.left, result);
      walkNode(logical.right, result);
      break;
    }
    case "Subshell": {
      result.hasSubshell = true;
      const subshell = node;
      if (subshell.list?.commands) {
        for (const cmd of subshell.list.commands) {
          walkNode(cmd, result);
        }
      }
      break;
    }
    // Complex constructs — flag as subshell for safety
    case "If":
    case "For":
    case "While":
    case "Until":
    case "Case":
    case "Function":
      result.hasSubshell = true;
      break;
    default:
      break;
  }
}
function parseCommand(input) {
  if (!input || !input.trim()) {
    return { commands: [], hasSubshell: false, parseError: false };
  }
  const hasHeredoc = HEREDOC_REGEX.test(input);
  if (hasHeredoc) {
    const firstLine = input.split("\n")[0];
    const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, "").trim();
    if (!cmdPart) {
      return { commands: [], hasSubshell: false, parseError: true };
    }
    try {
      const ast = (0, import_bash_parser.default)(cmdPart);
      const result = { commands: [], hasSubshell: false };
      for (const cmd of ast.commands) {
        walkNode(cmd, result);
      }
      return { commands: result.commands, hasSubshell: true, parseError: false };
    } catch {
      return { commands: [], hasSubshell: true, parseError: true };
    }
  }
  try {
    const ast = (0, import_bash_parser.default)(input);
    const result = { commands: [], hasSubshell: false };
    for (const cmd of ast.commands) {
      walkNode(cmd, result);
    }
    return { commands: result.commands, hasSubshell: result.hasSubshell, parseError: false };
  } catch {
    return { commands: [], hasSubshell: false, parseError: true };
  }
}

// src/evaluator.ts
function evaluate(parsed, config) {
  if (parsed.parseError) {
    return { decision: "ask", reason: "Could not parse command safely", details: [] };
  }
  if (parsed.commands.length === 0) {
    return { decision: "allow", reason: "Empty command", details: [] };
  }
  if (parsed.hasSubshell && config.askOnSubshell) {
    return { decision: "ask", reason: "Command contains subshell/command substitution", details: [] };
  }
  const details = [];
  for (const cmd of parsed.commands) {
    details.push(evaluateCommand(cmd, config));
  }
  const decisions = details.map((d) => d.decision);
  if (decisions.includes("deny")) {
    const denied = details.filter((d) => d.decision === "deny");
    return {
      decision: "deny",
      reason: denied.map((d) => `${d.command}: ${d.reason}`).join("; "),
      details
    };
  }
  if (decisions.includes("ask")) {
    const asked = details.filter((d) => d.decision === "ask");
    return {
      decision: "ask",
      reason: asked.map((d) => `${d.command}: ${d.reason}`).join("; "),
      details
    };
  }
  return { decision: "allow", reason: "All commands are safe", details };
}
function evaluateCommand(cmd, config) {
  const { command, args } = cmd;
  for (const gp of config.globalDeny || []) {
    if (new RegExp(gp.pattern).test(cmd.raw)) {
      return { command, args, decision: "deny", reason: gp.reason, matchedRule: "globalDeny" };
    }
  }
  if (config.alwaysDeny?.includes(command)) {
    return { command, args, decision: "deny", reason: `"${command}" is blocked`, matchedRule: "alwaysDeny" };
  }
  if (config.alwaysAllow?.includes(command)) {
    return { command, args, decision: "allow", reason: `"${command}" is safe`, matchedRule: "alwaysAllow" };
  }
  if ((command === "ssh" || command === "scp" || command === "rsync") && config.trustedSSHHosts?.length) {
    const sshResult = evaluateSSHCommand(cmd, config);
    if (sshResult) return sshResult;
  }
  if (command === "docker" && config.trustedDockerContainers?.length) {
    const dockerResult = evaluateDockerExec(cmd, config);
    if (dockerResult) return dockerResult;
  }
  if (command === "kubectl" && config.trustedKubectlContexts?.length) {
    const kubectlResult = evaluateKubectlExec(cmd, config);
    if (kubectlResult) return kubectlResult;
  }
  if (command === "sprite" && config.trustedSprites?.length) {
    const spriteResult = evaluateSpriteExec(cmd, config);
    if (spriteResult) return spriteResult;
  }
  const rule = config.rules.find((r) => r.command === command);
  if (rule) {
    return evaluateRule(cmd, rule);
  }
  return { command, args, decision: config.defaultDecision, reason: `No rule for "${command}"`, matchedRule: "default" };
}
function evaluateRule(cmd, rule) {
  const { command, args } = cmd;
  const argsJoined = args.join(" ");
  for (const pattern of rule.argPatterns || []) {
    const m = pattern.match;
    let matched = true;
    if (m.noArgs !== void 0) {
      matched = matched && m.noArgs === (args.length === 0);
    }
    if (m.argsMatch && matched) {
      matched = m.argsMatch.some((re) => new RegExp(re).test(argsJoined));
    }
    if (m.anyArgMatches && matched) {
      matched = args.some((arg) => m.anyArgMatches.some((re) => new RegExp(re).test(arg)));
    }
    if (m.argCount && matched) {
      if (m.argCount.min !== void 0) matched = matched && args.length >= m.argCount.min;
      if (m.argCount.max !== void 0) matched = matched && args.length <= m.argCount.max;
    }
    if (m.not) matched = !matched;
    if (matched) {
      return {
        command,
        args,
        decision: pattern.decision,
        reason: pattern.reason || pattern.description || `Matched pattern for "${command}"`,
        matchedRule: `${command}:argPattern`
      };
    }
  }
  return {
    command,
    args,
    decision: rule.default,
    reason: `Default for "${command}"`,
    matchedRule: `${command}:default`
  };
}
var SSH_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-b",
  "-c",
  "-D",
  "-E",
  "-e",
  "-F",
  "-I",
  "-i",
  "-J",
  "-L",
  "-l",
  "-m",
  "-O",
  "-o",
  "-p",
  "-Q",
  "-R",
  "-S",
  "-W",
  "-w"
]);
function globToRegex(pattern) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}
function matchesPattern(value, patterns) {
  return patterns.some((p) => globToRegex(p).test(value));
}
function parseSSHArgs(args) {
  let host = null;
  const remoteArgs = [];
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (SSH_FLAGS_WITH_VALUE.has(arg)) {
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!host) {
      host = arg.includes("@") ? arg.split("@").pop() : arg;
      i++;
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
    remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(" ") : null
  };
}
function extractHostFromRemotePath(args) {
  for (const arg of args) {
    const match = arg.match(/^(?:[^@]+@)?([^:]+):/);
    if (match) return match[1];
  }
  return null;
}
function evaluateSSHCommand(cmd, config) {
  const { command, args } = cmd;
  const trustedHosts = config.trustedSSHHosts || [];
  if (command === "scp" || command === "rsync") {
    const host2 = extractHostFromRemotePath(args);
    if (host2 && matchesPattern(host2, trustedHosts)) {
      return {
        command,
        args,
        decision: "allow",
        reason: `Trusted SSH host "${host2}"`,
        matchedRule: "trustedSSHHosts"
      };
    }
    return null;
  }
  const { host, remoteCommand } = parseSSHArgs(args);
  if (!host || !matchesPattern(host, trustedHosts)) return null;
  if (!remoteCommand) {
    return {
      command,
      args,
      decision: "allow",
      reason: `Trusted SSH host "${host}" (interactive)`,
      matchedRule: "trustedSSHHosts"
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, config);
  return {
    command,
    args,
    decision: result.decision,
    reason: `Trusted SSH host "${host}": ${result.reason}`,
    matchedRule: "trustedSSHHosts"
  };
}
var DOCKER_EXEC_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-e",
  "--env",
  "--env-file",
  "-u",
  "--user",
  "-w",
  "--workdir",
  "--detach-keys"
]);
function parseDockerExecArgs(args) {
  let target = null;
  const remoteArgs = [];
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (DOCKER_EXEC_FLAGS_WITH_VALUE.has(arg)) {
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
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
  return { target, remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(" ") : null };
}
function evaluateDockerExec(cmd, config) {
  const { command, args } = cmd;
  if (args[0] !== "exec") return null;
  const { target, remoteCommand } = parseDockerExecArgs(args.slice(1));
  if (!target || !matchesPattern(target, config.trustedDockerContainers || [])) return null;
  if (!remoteCommand) {
    return {
      command,
      args,
      decision: "allow",
      reason: `Trusted Docker container "${target}" (interactive)`,
      matchedRule: "trustedDockerContainers"
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, config);
  return {
    command,
    args,
    decision: result.decision,
    reason: `Trusted Docker container "${target}": ${result.reason}`,
    matchedRule: "trustedDockerContainers"
  };
}
var KUBECTL_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-n",
  "--namespace",
  "-c",
  "--container",
  "--context",
  "--cluster",
  "--kubeconfig",
  "-s",
  "--server",
  "--token",
  "--user",
  "--as",
  "--as-group",
  "--certificate-authority",
  "--client-certificate",
  "--client-key",
  "-l",
  "--selector",
  "-f",
  "--filename",
  "--cache-dir",
  "--request-timeout",
  "-o",
  "--output"
]);
function parseKubectlExecArgs(args) {
  let context = null;
  let pod = null;
  const remoteArgs = [];
  let i = 0;
  let pastSeparator = false;
  while (i < args.length) {
    const arg = args[i];
    if (arg === "--") {
      pastSeparator = true;
      i++;
      while (i < args.length) {
        remoteArgs.push(args[i]);
        i++;
      }
      break;
    }
    if (arg.startsWith("--") && arg.includes("=")) {
      if (arg.startsWith("--context=")) {
        context = arg.split("=")[1];
      }
      i++;
      continue;
    }
    if (KUBECTL_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === "--context") context = args[i + 1] || null;
      i += 2;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!pod) {
      pod = arg;
    }
    i++;
  }
  return { context, pod, remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(" ") : null };
}
function evaluateKubectlExec(cmd, config) {
  const { command, args } = cmd;
  if (args[0] !== "exec") return null;
  const { context, pod, remoteCommand } = parseKubectlExecArgs(args.slice(1));
  const trustedContexts = config.trustedKubectlContexts || [];
  if (!context || !matchesPattern(context, trustedContexts)) return null;
  if (!remoteCommand) {
    return {
      command,
      args,
      decision: "allow",
      reason: `Trusted kubectl context "${context}"${pod ? `, pod "${pod}"` : ""} (interactive)`,
      matchedRule: "trustedKubectlContexts"
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, config);
  return {
    command,
    args,
    decision: result.decision,
    reason: `Trusted kubectl context "${context}": ${result.reason}`,
    matchedRule: "trustedKubectlContexts"
  };
}
var SPRITE_FLAGS_WITH_VALUE = /* @__PURE__ */ new Set([
  "-o",
  "--org",
  "-s",
  "--sprite"
]);
function parseSpriteExecArgs(args) {
  let spriteName = null;
  const remoteArgs = [];
  let foundExec = false;
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg.startsWith("--") && arg.includes("=")) {
      if (arg.startsWith("--sprite=")) {
        spriteName = arg.split("=")[1];
      }
      i++;
      continue;
    }
    if (SPRITE_FLAGS_WITH_VALUE.has(arg)) {
      if (arg === "-s" || arg === "--sprite") {
        spriteName = args[i + 1] || null;
      }
      i += 2;
      continue;
    }
    if (arg === "--debug") {
      i++;
      continue;
    }
    if (arg.startsWith("-")) {
      i++;
      continue;
    }
    if (!foundExec) {
      if (arg === "exec" || arg === "x" || arg === "console" || arg === "c") {
        foundExec = true;
        i++;
        continue;
      }
      return { spriteName: null, remoteCommand: null };
    }
    while (i < args.length) {
      remoteArgs.push(args[i]);
      i++;
    }
    break;
  }
  return {
    spriteName,
    remoteCommand: remoteArgs.length > 0 ? remoteArgs.join(" ") : null
  };
}
function evaluateSpriteExec(cmd, config) {
  const { command, args } = cmd;
  const { spriteName, remoteCommand } = parseSpriteExecArgs(args);
  const trustedSprites = config.trustedSprites || [];
  if (!spriteName || !matchesPattern(spriteName, trustedSprites)) return null;
  if (!remoteCommand) {
    return {
      command,
      args,
      decision: "allow",
      reason: `Trusted sprite "${spriteName}" (interactive)`,
      matchedRule: "trustedSprites"
    };
  }
  const parsed = parseCommand(remoteCommand);
  const result = evaluate(parsed, config);
  return {
    command,
    args,
    decision: result.decision,
    reason: `Trusted sprite "${spriteName}": ${result.reason}`,
    matchedRule: "trustedSprites"
  };
}

// src/rules.ts
var import_fs = require("fs");
var import_yaml = require("yaml");
var import_os = require("os");
var import_path2 = require("path");

// src/defaults.ts
var DEFAULT_CONFIG = {
  defaultDecision: "ask",
  askOnSubshell: true,
  trustedSSHHosts: [],
  trustedDockerContainers: [],
  trustedKubectlContexts: [],
  trustedSprites: [],
  alwaysAllow: [
    // Read-only file operations
    "cat",
    "head",
    "tail",
    "less",
    "more",
    "wc",
    "sort",
    "uniq",
    "tee",
    "diff",
    "comm",
    "cut",
    "paste",
    "tr",
    "fold",
    "expand",
    "unexpand",
    "column",
    "rev",
    "tac",
    "nl",
    "od",
    "xxd",
    "file",
    "stat",
    // Search/find
    "grep",
    "egrep",
    "fgrep",
    "rg",
    "ag",
    "ack",
    "find",
    "fd",
    "fzf",
    "locate",
    "which",
    "whereis",
    "type",
    "command",
    // Directory listing
    "ls",
    "dir",
    "tree",
    "exa",
    "eza",
    "lsd",
    // Path/string utilities
    "basename",
    "dirname",
    "realpath",
    "readlink",
    "echo",
    "printf",
    "true",
    "false",
    "test",
    "[",
    // Date/time
    "date",
    "cal",
    // Environment info
    "env",
    "printenv",
    "uname",
    "hostname",
    "whoami",
    "id",
    "pwd",
    // Process viewing (read-only)
    "ps",
    "top",
    "htop",
    "uptime",
    "free",
    "df",
    "du",
    "lsof",
    // Text processing
    "sed",
    "awk",
    "jq",
    "yq",
    "xargs",
    "seq",
    // Pagers and formatters
    "bat",
    "pygmentize",
    "highlight",
    // Version managers (read-only)
    "nvm",
    "fnm",
    "nvm",
    "rbenv",
    "pyenv",
    // Misc safe
    "cd",
    "pushd",
    "popd",
    "dirs",
    "hash",
    "alias",
    "sleep",
    "wait",
    "time",
    "md5",
    "md5sum",
    "sha256sum",
    "shasum",
    "cksum",
    "base64",
    "openssl"
  ],
  alwaysDeny: [
    "sudo",
    "su",
    "doas",
    "mkfs",
    "fdisk",
    "dd",
    "shutdown",
    "reboot",
    "halt",
    "poweroff",
    "iptables",
    "ip6tables",
    "nft",
    "useradd",
    "userdel",
    "usermod",
    "groupadd",
    "groupdel",
    "crontab",
    "systemctl",
    "service",
    "launchctl"
  ],
  globalDeny: [
    { pattern: "rm\\s+-[^\\s]*r[^\\s]*f|rm\\s+-[^\\s]*f[^\\s]*r", reason: "Recursive force delete" },
    { pattern: ">\\/dev\\/sd|>\\/dev\\/nvme|>\\/dev\\/hd", reason: "Direct write to block device" },
    { pattern: "chmod\\s+-R\\s+777", reason: "Recursively setting world-writable permissions" },
    { pattern: ":\\(\\)\\s*\\{", reason: "Fork bomb pattern detected" }
  ],
  rules: [
    // --- Node.js ecosystem ---
    {
      command: "node",
      default: "ask",
      argPatterns: [
        { match: { anyArgMatches: ["^-e$", "^--eval", "^-p$", "^--print"] }, decision: "ask", reason: "Evaluating inline code" },
        { match: { anyArgMatches: ["^--(version|help)$", "^-[vh]$"] }, decision: "allow", description: "Version/help flags" },
        { match: { noArgs: true }, decision: "ask", reason: "Interactive REPL" }
      ]
    },
    {
      command: "npx",
      default: "ask",
      argPatterns: [
        {
          match: { anyArgMatches: ["^(jest|vitest|tsx|ts-node|tsc|eslint|prettier|rimraf|mkdirp|concurrently|turbo|next|nuxt|vite|astro|playwright|cypress|mocha|nyc|c8|nodemon|ts-jest|tsup|esbuild|rollup|webpack|prisma|drizzle-kit|typeorm|knex|sequelize-cli|tailwindcss|postcss|autoprefixer|lint-staged|husky|changeset|semantic-release|lerna|nx|create-react-app|create-next-app|create-vite|degit|storybook|wrangler|netlify|vercel)$"] },
          decision: "allow",
          description: "Well-known dev tools"
        },
        { match: { anyArgMatches: ["^--(version|help)$", "^-[vh]$"] }, decision: "allow", description: "Version/help flags" }
      ]
    },
    {
      command: "bunx",
      default: "ask",
      argPatterns: [
        {
          match: { anyArgMatches: ["^(jest|vitest|tsx|tsc|eslint|prettier|turbo|next|vite|astro|playwright|prisma|drizzle-kit|tsup|esbuild|tailwindcss|storybook|wrangler)$"] },
          decision: "allow",
          description: "Well-known dev tools"
        }
      ]
    },
    {
      command: "npm",
      default: "allow",
      argPatterns: [
        { match: { anyArgMatches: ["^(publish|unpublish|deprecate|owner|access|token|adduser|login)$"] }, decision: "ask", reason: "Registry modification" }
      ]
    },
    { command: "pnpm", default: "allow", argPatterns: [{ match: { anyArgMatches: ["^publish$"] }, decision: "ask", reason: "Publishing" }] },
    { command: "yarn", default: "allow", argPatterns: [{ match: { anyArgMatches: ["^publish$"] }, decision: "ask", reason: "Publishing" }] },
    {
      command: "bun",
      default: "ask",
      argPatterns: [
        { match: { anyArgMatches: ["^(install|add|remove|run|test|build|init|create|pm|x|upgrade|link|unlink)$"] }, decision: "allow", description: "Standard bun commands" },
        { match: { anyArgMatches: ["^--(version|help)$"] }, decision: "allow" }
      ]
    },
    // --- Python ---
    {
      command: "python",
      default: "ask",
      argPatterns: [
        { match: { anyArgMatches: ["^--(version|help)$", "^-V$"] }, decision: "allow" }
      ]
    },
    {
      command: "python3",
      default: "ask",
      argPatterns: [
        { match: { anyArgMatches: ["^--(version|help)$", "^-V$"] }, decision: "allow" }
      ]
    },
    { command: "pip", default: "allow" },
    { command: "pip3", default: "allow" },
    { command: "uv", default: "allow" },
    { command: "pipx", default: "ask" },
    // --- Git ---
    {
      command: "git",
      default: "allow",
      argPatterns: [
        { match: { argsMatch: ["push\\s+--force", "push\\s+-f\\b"] }, decision: "ask", reason: "Force push can overwrite remote history" },
        { match: { argsMatch: ["reset\\s+--hard"] }, decision: "ask", reason: "Hard reset discards changes" },
        { match: { anyArgMatches: ["^clean$"] }, decision: "ask", reason: "git clean removes untracked files" }
      ]
    },
    { command: "gh", default: "allow" },
    // --- Build tools ---
    { command: "make", default: "allow" },
    { command: "cmake", default: "allow" },
    { command: "cargo", default: "allow" },
    { command: "go", default: "allow" },
    { command: "rustup", default: "allow" },
    { command: "tsc", default: "allow" },
    { command: "turbo", default: "allow" },
    { command: "nx", default: "allow" },
    { command: "lerna", default: "allow" },
    // --- Docker ---
    {
      command: "docker",
      default: "ask",
      argPatterns: [
        { match: { anyArgMatches: ["^(ps|images|logs|inspect|stats|top|version|info)$"] }, decision: "allow", description: "Read-only docker commands" },
        { match: { anyArgMatches: ["^(build|run|compose|exec|pull|stop|start|restart|create)$"] }, decision: "ask", reason: "Docker state-changing operation" },
        { match: { anyArgMatches: ["^(system\\s+prune|container\\s+prune|image\\s+prune)$"] }, decision: "ask", reason: "Docker prune operations" }
      ]
    },
    { command: "docker-compose", default: "ask" },
    { command: "kubectl", default: "ask" },
    // --- File operations ---
    {
      command: "rm",
      default: "ask",
      argPatterns: [
        { match: { argsMatch: ["-[^\\s]*r"] }, decision: "ask", reason: "Recursive delete" },
        { match: { argCount: { max: 3 }, not: false }, decision: "allow", description: "Deleting a small number of non-recursive files" }
      ]
    },
    { command: "mkdir", default: "allow" },
    { command: "touch", default: "allow" },
    { command: "cp", default: "allow" },
    { command: "mv", default: "allow" },
    { command: "ln", default: "allow" },
    { command: "chmod", default: "ask" },
    { command: "chown", default: "ask" },
    // --- Network ---
    { command: "curl", default: "allow" },
    { command: "wget", default: "allow" },
    { command: "ssh", default: "ask" },
    { command: "scp", default: "ask" },
    { command: "rsync", default: "ask" },
    // --- Package managers ---
    { command: "brew", default: "allow" },
    { command: "apt", default: "ask" },
    { command: "apt-get", default: "ask" },
    { command: "yum", default: "ask" },
    { command: "dnf", default: "ask" },
    { command: "pacman", default: "ask" },
    // --- Terraform / IaC ---
    { command: "terraform", default: "ask", argPatterns: [
      { match: { anyArgMatches: ["^(plan|validate|fmt|show|state|output|providers|version|graph|console)$"] }, decision: "allow", description: "Read-only terraform commands" }
    ] }
  ]
};

// src/rules.ts
var USER_CONFIG_PATHS = [
  (0, import_path2.join)((0, import_os.homedir)(), ".claude", "warden.yaml"),
  (0, import_path2.join)((0, import_os.homedir)(), ".claude", "warden.json")
];
var PROJECT_CONFIG_NAMES = [
  ".claude/warden.yaml",
  ".claude/warden.json"
];
function loadConfig(cwd) {
  const config = structuredClone(DEFAULT_CONFIG);
  for (const configPath of USER_CONFIG_PATHS) {
    if (tryMergeConfigFile(config, configPath)) break;
  }
  if (cwd) {
    for (const name of PROJECT_CONFIG_NAMES) {
      if (tryMergeConfigFile(config, (0, import_path2.join)(cwd, name))) break;
    }
  }
  return config;
}
function tryMergeConfigFile(config, filePath) {
  if (!(0, import_fs.existsSync)(filePath)) return false;
  try {
    const raw = (0, import_fs.readFileSync)(filePath, "utf-8");
    const parsed = filePath.endsWith(".yaml") || filePath.endsWith(".yml") ? (0, import_yaml.parse)(raw) : JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      mergeConfig(config, parsed);
      return true;
    }
  } catch {
  }
  return false;
}
function mergeConfig(base, override) {
  if (override.alwaysAllow) {
    base.alwaysAllow = [...base.alwaysAllow || [], ...override.alwaysAllow];
  }
  if (override.alwaysDeny) {
    base.alwaysDeny = [...base.alwaysDeny || [], ...override.alwaysDeny];
  }
  if (override.globalDeny) {
    base.globalDeny = [...base.globalDeny || [], ...override.globalDeny];
  }
  if (override.trustedSSHHosts) {
    base.trustedSSHHosts = [...base.trustedSSHHosts || [], ...override.trustedSSHHosts];
  }
  if (override.trustedDockerContainers) {
    base.trustedDockerContainers = [...base.trustedDockerContainers || [], ...override.trustedDockerContainers];
  }
  if (override.trustedKubectlContexts) {
    base.trustedKubectlContexts = [...base.trustedKubectlContexts || [], ...override.trustedKubectlContexts];
  }
  if (override.trustedSprites) {
    base.trustedSprites = [...base.trustedSprites || [], ...override.trustedSprites];
  }
  if (override.defaultDecision) {
    base.defaultDecision = override.defaultDecision;
  }
  if (override.askOnSubshell !== void 0) {
    base.askOnSubshell = override.askOnSubshell;
  }
  if (override.rules) {
    for (const userRule of override.rules) {
      const idx = base.rules.findIndex((r) => r.command === userRule.command);
      if (idx >= 0) {
        base.rules[idx] = userRule;
      } else {
        base.rules.push(userRule);
      }
    }
  }
}

// src/index.ts
async function main() {
  let raw = "";
  for await (const chunk of process.stdin) {
    raw += chunk;
  }
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }
  if (input.tool_name !== "Bash") {
    process.exit(0);
  }
  const command = input.tool_input?.command;
  if (!command || typeof command !== "string") {
    process.exit(0);
  }
  const config = loadConfig(input.cwd);
  const parsed = parseCommand(command);
  const result = evaluate(parsed, config);
  if (result.decision === "allow") {
    const output = {
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow",
        permissionDecisionReason: `[warden] ${result.reason}`
      }
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }
  if (result.decision === "deny") {
    process.stderr.write(`[warden] Blocked: ${result.reason}
`);
    process.exit(2);
  }
  process.exit(0);
}
main().catch(() => process.exit(0));
