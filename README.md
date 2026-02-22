# Claude Warden

Smart command safety filter for [Claude Code](https://claude.ai/code). Parses shell commands, evaluates each against configurable safety rules, and returns allow/deny/ask decisions — eliminating unnecessary permission prompts while blocking dangerous commands.

## What it does

Without Warden, Claude Code prompts you for **every** shell command. With Warden:

- `ls`, `grep`, `cat`, `git status` → **auto-approved** (100+ safe commands)
- `sudo`, `shutdown`, `rm -rf /` → **auto-denied**
- `npm install`, `docker build`, `ssh prod` → **configurable** per-command rules with argument pattern matching

It handles pipes, chains (`&&`, `||`, `;`), env prefixes, `sh -c` wrappers, and subshells. If any command in a pipeline is denied, the whole pipeline is denied.

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

### Config options

```yaml
# Default decision for unknown commands: allow | deny | ask
defaultDecision: ask

# Trigger "ask" for commands with $() or backticks
askOnSubshell: true

# Add commands to always allow/deny
alwaysAllow:
  - terraform
  - flyctl
alwaysDeny:
  - nc

# Block patterns (regex against full command string)
globalDeny:
  - pattern: 'curl.*evil\.com'
    reason: 'Blocked domain'

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

# Per-command rules (override built-in defaults)
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

### Config priority

Project `.claude/warden.yaml` > User `~/.claude/warden.yaml` > Built-in defaults

## Built-in defaults

### Always allowed (~60 commands)
File readers (`cat`, `head`, `tail`, `less`), search tools (`grep`, `rg`, `find`, `fd`), directory listing (`ls`, `tree`), text processing (`sed`, `awk`, `jq`), git, package managers (`npm`, `pnpm`, `yarn`), build tools (`make`, `cargo`, `go`, `tsc`), and more.

### Always denied
`sudo`, `su`, `mkfs`, `fdisk`, `dd`, `shutdown`, `reboot`, `iptables`, `crontab`, `systemctl`, `launchctl`

### Global deny patterns
- `rm -rf` (recursive force delete)
- Direct writes to block devices
- `chmod -R 777`
- Fork bombs

### Conditional rules
Commands like `node`, `npx`, `docker`, `ssh`, `git push --force`, `rm` have argument-aware rules. For example, `git` is allowed but `git push --force` triggers a prompt.

## How it works

1. Claude Code calls the `PreToolUse` hook before every Bash command
2. Warden parses the command into individual parts (handling pipes, chains, env prefixes)
3. Each part is evaluated: global deny → alwaysDeny → alwaysAllow → command rules → default
4. For pipelines: any deny → deny whole pipeline, any ask → ask, all allow → allow
5. Returns the decision via stdout JSON (allow/ask) or exit code 2 (deny)

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
