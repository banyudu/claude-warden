# Claude Warden

Smart command safety filter for [Claude Code](https://claude.ai/code). Parses shell commands, evaluates each against configurable safety rules, and returns allow/deny/ask decisions — eliminating unnecessary permission prompts while blocking dangerous commands.

## The problem

Claude Code's permission system is all-or-nothing. In the default mode, you're prompted for **every** shell command — even `ls`, `cat`, and `grep`. This creates a painful UX where you're clicking "Allow" hundreds of times per session on obviously safe commands. The alternative (yolo mode) disables all prompts, which is dangerous.

There's no middle ground: you can't say "allow `git` but block `git push --force`", or "allow `ssh` to my dev server but prompt for production". And compound commands like `npm run build && npm test` trigger a single opaque prompt with no visibility into what's actually being run.

## How Warden solves it

Warden hooks into Claude Code's `PreToolUse` event and **parses every shell command into an AST** using [bash-parser](https://github.com/vorpaljs/bash-parser). This means it doesn't just see `npm run build && git push --force` as a single string — it walks the AST to extract each individual command, then evaluates them independently against a configurable rule engine.

This AST-based approach enables:

- **Pipe and chain decomposition**: `cat file | grep pattern | wc -l` is parsed into three commands, each evaluated separately. All safe → auto-allow. One dangerous → deny the whole pipeline.
- **Argument-aware rules**: `git status` → allow, `git push --force` → prompt. `rm temp.txt` → allow, `rm -rf /` → prompt. The evaluator matches against argument patterns, not just command names.
- **Recursive evaluation of remote commands**: `ssh devserver 'cat /etc/hosts'` → Warden extracts the remote command, parses it through the same pipeline, and allows it. `ssh devserver 'sudo rm -rf /'` → denied. Same for `docker exec`, `kubectl exec`, and `sprite exec`.
- **Shell wrapper unwrapping**: `sh -c "npm run build && npm test"` → the inner command is extracted and recursively parsed/evaluated, not treated as an opaque string.
- **Env prefix handling**: `NODE_ENV=production npm run build` → correctly evaluates `npm run build`, ignoring the env prefix.
- **Recursive subshell evaluation**: Commands with `$()` or backticks are extracted, parsed, and recursively evaluated through the same pipeline. `echo $(cat file.txt)` → both `echo` and `cat` are evaluated individually. Only unparseable constructs (heredocs, complex shell syntax) fall back to prompting when `askOnSubshell` is enabled.
- **Feedback on blocked commands**: When a command is blocked or flagged, Warden provides a system message explaining why and a YAML snippet showing how to allow it in your config.

The result: **100+ common dev commands auto-approved**, dangerous commands auto-denied, everything else configurable — with zero changes to how you use Claude Code.

### Before and after

| Command | Without Warden | With Warden |
|---------|---------------|-------------|
| `ls -la` | Prompted | Auto-allowed |
| `cat file \| grep pattern \| wc -l` | Prompted | Auto-allowed (3 safe commands) |
| `npm run build && npm test` | Prompted | Auto-allowed |
| `git push --force origin main` | Prompted | Prompted (force push is risky) |
| `sudo rm -rf /` | Prompted | Auto-denied (sudo is blocked) |
| `ssh devserver cat /etc/hosts` | Prompted | Auto-allowed (trusted host + safe cmd) |
| `ssh devserver sudo rm -rf /` | Prompted | Auto-denied (trusted host + dangerous cmd) |

## Install

Two commands inside Claude Code:

```
/plugin marketplace add banyudu/claude-warden
/plugin install claude-warden@claude-warden
```

That's it. Restart Claude Code and Warden is active.

### Alternative: install from npm

```bash
npm install -g claude-warden
claude --plugin-dir $(npm root -g)/claude-warden
```

### Alternative: test locally from source

```bash
git clone https://github.com/banyudu/claude-warden.git
cd claude-warden && npm install && npm run build
claude --plugin-dir ./claude-warden
```

## Configure

Warden works out of the box with sensible defaults. To customize, create a config file:

- **User-level** (applies everywhere): `~/.claude/warden.yaml`
- **Project-level** (overrides user-level): `.claude/warden.yaml`

Copy [config/warden.default.yaml](config/warden.default.yaml) as a starting point.

### Config priority (scoped layers)

Config is evaluated in layers with **project > user > default** priority:

1. **Project-level** (`.claude/warden.yaml`) — highest priority
2. **User-level** (`~/.claude/warden.yaml`)
3. **Built-in defaults**

Within each layer, `alwaysDeny` is checked before `alwaysAllow`. The first layer with a matching entry wins. For command-specific rules, the first layer that defines a rule for a given command wins.

This means:
- A project `alwaysDeny` for `curl` overrides a user `alwaysAllow` for `curl`
- A user `alwaysAllow` for `sudo` overrides the default `alwaysDeny` for `sudo`
- A project rule for `npm` overrides the default rule for `npm`

### Config options

```yaml
# Default decision for unknown commands: allow | deny | ask
defaultDecision: ask

# Trigger "ask" for commands with $() or backticks
askOnSubshell: true

# Add commands to always allow/deny (scoped to this config level)
alwaysAllow:
  - terraform
  - flyctl
alwaysDeny:
  - nc

# Trusted remote targets (auto-allow connection, evaluate remote commands)
trustedSSHHosts:
  - devserver
  - "*.internal.company.com"
trustedDockerContainers:
  - my-app
  - dev-*
trustedKubectlContexts:
  - minikube
trustedSprites:
  - my-sprite

# Per-command rules (override built-in defaults for this scope)
rules:
  - command: npx
    default: allow
  - command: docker
    default: ask
    argPatterns:
      - match:
          anyArgMatches: ['^(ps|images|logs)$']
        decision: allow
        description: Read-only docker commands
```

## Feedback and `/warden-allow`

When Warden blocks or flags a command, it includes a system message explaining:

1. **Why** the command was blocked/flagged (per-command reasons)
2. **How to allow it** — a ready-to-use YAML snippet for your config

Use the `/warden-allow` slash command to apply the suggested config change. It will ask which scope (project or user) to use.

## Built-in defaults

### Always allowed (~60 commands)
File readers (`cat`, `head`, `tail`, `less`), search tools (`grep`, `rg`, `find`, `fd`), directory listing (`ls`, `tree`), text processing (`sed`, `awk`, `jq`), git, package managers (`npm`, `pnpm`, `yarn`), build tools (`make`, `cargo`, `go`, `tsc`), and more.

### Always denied
`sudo`, `su`, `mkfs`, `fdisk`, `dd`, `shutdown`, `reboot`, `iptables`, `crontab`, `systemctl`, `launchctl`

### Conditional rules
Commands like `node`, `npx`, `docker`, `ssh`, `git push --force`, `rm`, `chmod` have argument-aware rules. For example:
- `git` is allowed but `git push --force` triggers a prompt
- `rm temp.txt` is allowed but `rm -rf /` is prompted
- `chmod 644 file` prompts but `chmod -R 777 /var` is denied

### Trusted remote targets
Configure trusted hosts/containers/contexts to auto-allow connections and recursively evaluate remote commands:
- **SSH**: `trustedSSHHosts` — also covers `scp` and `rsync`
- **Docker**: `trustedDockerContainers` — for `docker exec`
- **kubectl**: `trustedKubectlContexts` — for `kubectl exec` (requires explicit `--context`)
- **Sprite**: `trustedSprites` — for `sprite exec`/`console`

All support glob patterns: `*`, `?`, `[...]`, `[!...]`, `{a,b,c}`

## How it works

1. Claude Code calls the `PreToolUse` hook before every Bash command
2. Warden parses the command into an AST via [bash-parser](https://github.com/vorpaljs/bash-parser), walking the tree to extract individual commands from pipes, chains, logical expressions, and subshells
3. Shell wrappers (`sh -c`, `bash -c`) and remote commands (`ssh`, `docker exec`, `kubectl exec`, `sprite exec`) are recursively parsed and evaluated
4. Each command is evaluated through the rule hierarchy: alwaysDeny → alwaysAllow → trusted remote targets → command-specific rules with argument matching → default decision (checked per layer in priority order)
5. Results are combined: any deny → deny whole pipeline, any ask → ask, all allow → allow
6. Returns the decision via stdout JSON (allow/ask) or exit code 2 (deny), with a system message explaining the reasoning for deny/ask decisions

## Development

```bash
pnpm install
pnpm run build        # Build to dist/index.cjs
pnpm run test         # Run tests
pnpm run typecheck    # Type check
pnpm run dev          # Watch mode
```

## License

MIT
