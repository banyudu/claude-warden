# Claude Warden

[![npm version](https://img.shields.io/npm/v/claude-warden)](https://www.npmjs.com/package/claude-warden)
[![npm downloads](https://img.shields.io/npm/dm/claude-warden)](https://www.npmjs.com/package/claude-warden)
[![GitHub license](https://img.shields.io/github/license/banyudu/claude-warden)](https://github.com/banyudu/claude-warden/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/banyudu/claude-warden)](https://github.com/banyudu/claude-warden/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/banyudu/claude-warden/ci.yml?label=CI)](https://github.com/banyudu/claude-warden/actions)

Smart command safety filter for [Claude Code](https://claude.ai/code), [OpenAI Codex CLI](https://developers.openai.com/codex/hooks), [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/customize-copilot-cli/use-hooks), and other AI coding agents. Parses shell commands, evaluates each against configurable safety rules, and returns allow/deny/ask decisions — eliminating unnecessary permission prompts while blocking dangerous commands.

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

## Warden vs Auto Mode

Claude Code recently introduced [Auto Mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode), which uses a background classifier model to approve or block actions without manual prompts. Here's how it compares to Warden:

| | Warden | Auto Mode |
|---|---|---|
| **How it works** | Deterministic rule engine with AST-based shell parsing | LLM classifier (Sonnet 4.6) reviews each action |
| **Availability** | All plans, all models, all providers (API, Bedrock, Vertex) | Team/Enterprise only, Sonnet 4.6 or Opus 4.6 only |
| **Token cost** | Zero — runs locally as a hook | Extra classifier calls count toward token usage |
| **Latency** | Near-instant (local process) | Network round-trip per classified action |
| **Configurability** | Full control via YAML — per-command rules, `targetPolicies`, and `trustedRemotes` | Prose-based rules, admin-managed trusted infrastructure |
| **Predictability** | Deterministic — same command always gets the same decision | Probabilistic — classifier may have false positives/negatives |
| **Scope** | Shell commands only (Bash tool) | All tool calls (Bash, file edits, network, subagents) |

**Can I use both?** Yes. Warden runs as a `PreToolUse` hook, which executes before Auto Mode's classifier. Warden handles fast, deterministic decisions for shell commands, and Auto Mode covers everything else (file edits, network requests, subagent spawning). They are complementary.

**When to choose Warden alone:** You're on a Free/Pro plan, using API/Bedrock/Vertex providers, want zero extra token cost, or need deterministic and auditable command-level rules.

**When to choose Auto Mode alone:** You want broader coverage beyond shell commands and are comfortable with classifier-based decisions.

**When to use both:** You want the best of both worlds — instant deterministic shell command filtering from Warden, plus Auto Mode's broader safety net for non-shell actions.

## Install

Two commands inside Claude Code:

```
/plugin marketplace add banyudu/claude-warden
/plugin install warden@claude-warden
```

That's it. Restart Claude Code and Warden is active.

### Update

```
claude plugin update warden@claude-warden
```

If the update command reports you're already at the latest version but you know a newer version exists, the local marketplace cache may be stale. Force a refresh:

```bash
cd ~/.claude/plugins/marketplaces/claude-warden && git pull
```

Then run the update command again.

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

## Codex CLI

Codex supports [PreToolUse hooks](https://developers.openai.com/codex/hooks) with a wire protocol nearly identical to Claude Code's, so the **same** Warden hook binary works natively — no rule export needed.

### Setup

1. Install Warden globally so the `warden-hook` binary lands in your `PATH`:

```bash
npm install -g claude-warden
```

2. Drop the following into `~/.codex/hooks.json` (user-wide) or `<repo>/.codex/hooks.json` (project-scoped):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "warden-hook",
            "statusMessage": "Checking Bash command with Warden"
          }
        ]
      }
    ]
  }
}
```

A ready-to-use template ships at [`.codex/hooks.json`](.codex/hooks.json). If `warden-hook` isn't on your `PATH` (e.g. non-global install), use the absolute path instead: `node /path/to/claude-warden/dist/index.cjs`.

### How it works

Codex sends the same `{tool_name, tool_input.command, cwd, session_id, ...}` payload on stdin and accepts the same `hookSpecificOutput.permissionDecision` response as Claude Code. The identical `dist/index.cjs` binary runs the full parser/evaluator pipeline — trusted hosts, YOLO mode, argument-aware rules, and all. The same `~/.claude/warden.yaml` and `.claude/warden.yaml` config files drive both.

### Known Codex limitations

- **Bash only** — Codex PreToolUse currently intercepts only shell commands; MCP, Write, and WebSearch tools are not hooked.
- **Work in progress upstream** — Codex's hook system may miss some shell invocations. Treat it as defense-in-depth, not a hard sandbox.
- **`deny` is authoritative; `allow`/`ask` fail open** — Codex currently honors `deny` (and exit code 2) but treats `allow`/`ask` as "fail open" (command proceeds). This is safe: Warden's deny list still blocks dangerous commands.
- **No undo** — hooks cannot revert a command that has already executed.

### Fallback: static rule export

For environments where the hook approach isn't viable, Warden can still export a static `execpolicy` rules file:

```bash
pnpm run codex:export-rules   # writes .codex/rules/warden.rules
```

Use `--cwd <dir>`, `--out <path>`, or `--stdout` to customize. This snapshot loses dynamic behavior (trusted hosts, YOLO, etc.) but works with older Codex setups.

## GitHub Copilot CLI

Warden supports GitHub Copilot CLI's [preToolUse hook](https://docs.github.com/en/copilot/reference/hooks-configuration) natively.

### Setup

1. Install Warden in your project:

```bash
npm install claude-warden
```

2. Copy the hook config to your repo:

```bash
cp node_modules/claude-warden/.github/hooks/warden.json .github/hooks/warden.json
```

3. Commit `.github/hooks/warden.json` to your default branch. Copilot CLI loads hooks from your current working directory automatically.

That's it. Copilot CLI will now evaluate bash commands through Warden's rule engine before execution.

### How it works

Copilot CLI sends a `preToolUse` event with `{"toolName": "bash", "toolArgs": "{\"command\": \"...\"}"}` on stdin. Warden's Copilot adapter (`dist/copilot.cjs`) parses this, runs the command through the same AST-based evaluation pipeline used for Claude Code, and returns `{"permissionDecision": "allow|deny|ask", "permissionDecisionReason": "..."}` on stdout.

The same `~/.claude/warden.yaml` and `.claude/warden.yaml` config files are used for both Claude Code and Copilot CLI.

## Generic CLI

Warden also provides a standalone CLI for use with any tool or shell script:

```bash
npx claude-warden eval "ls -la"                    # → allow
npx claude-warden eval "shutdown -h now"            # → deny (exit code 2)
npx claude-warden eval --json "git push --force"    # → JSON output
npx claude-warden eval --cwd /path/to/project "rm -rf dist"
```

Exit codes: `0` = allow, `1` = ask, `2` = deny.

Use `--json` for machine-readable output suitable for scripting.

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

# Trusted remote contexts (auto-allow connection, evaluate remote commands)
trustedRemotes:
  - context: ssh
    name: devserver
  - context: ssh
    name: "*.internal.company.com"
  - context: docker
    name: my-app
  - context: docker
    name: dev-*
  - context: kubectl
    name: minikube
  - context: sprite
    name: my-sprite

# Target-based policy overrides for data-sensitive commands
targetPolicies:
  - type: path
    path: "{{cwd}}"
    commands: [rm, cp, mv]
    decision: allow
  - type: endpoint
    pattern: "http://localhost:*"
    decision: allow
  - type: database
    host: "prod-db.internal"
    decision: deny
    reason: Production database

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

# Skill (slash command) filtering — gate Claude Code skill invocations.
# Skill names use the short form ("commit", not "/commit"). Glob patterns
# are supported so you can whitelist an entire plugin namespace.
skills:
  defaultDecision: ask
  alwaysAllow:
    - commit
    - review
    - simplify
    - "plugin-dev:*"      # allow every skill in the "plugin-dev" plugin
  alwaysDeny:
    - deploy
  rules:
    - skill: release
      default: ask
      argPatterns:
        - match:
            argsMatch: ["--dry-run"]
          decision: allow
          description: Dry-run release is safe
```

## Skill (slash command) filtering

Warden also intercepts Claude Code's `Skill` tool (the mechanism behind `/slash-command` invocations) using the same layered rule engine as shell commands. This lets you whitelist safe skills (read-only helpers, code review, summarization) while still prompting for anything that could modify state.

Skill names are the identifier Claude Code uses internally — **without the leading `/`**. Built-in skills use a bare name (`commit`, `review`), plugin skills use `<plugin>:<skill>` (e.g. `plugin-dev:agent-development`, `code-review:code-review`). Glob patterns `*`, `?`, `[...]`, `{a,b,c}` are supported, so `"plugin-dev:*"` matches every skill in that plugin.

### Configure

```yaml
skills:
  # Default for skills with no matching rule: allow | deny | ask
  defaultDecision: ask

  # Auto-allow these skills (scoped to this config layer)
  alwaysAllow:
    - commit
    - review
    - "plugin-dev:*"

  # Auto-deny these skills
  alwaysDeny:
    - deploy

  # Per-skill rules with argument-aware matching
  rules:
    - skill: release
      default: ask
      argPatterns:
        - match:
            argsMatch: ["--dry-run"]
          decision: allow
          description: Dry-run release is safe
```

Layering follows the same **project > user > default** priority as shell rules (see [Config priority](#config-priority-scoped-layers)).

### Built-in skill defaults

Warden ships with a curated allow-list of skills that are read-only or informational — review tools (`review`, `security-review`, `code-review:code-review`), search/summarization helpers (`promptfolio-*`, `slack:find-discussions`, `slack:summarize-channel`), plugin-development guidance (`plugin-dev:*-development`), and `*-usage` docs skills. Everything else falls through to `defaultDecision: ask`.

## YOLO mode

Need to temporarily bypass all permission prompts? YOLO mode auto-allows all commands for a limited time or the full session — while still blocking always-deny commands (like `sudo`, `shutdown`) for safety.

### Activate via slash command

```
/warden:yolo session    # Full session, no expiry
/warden:yolo 5m         # 5 minutes
/warden:yolo 15m        # 15 minutes
/warden:yolo off        # Turn off immediately
```

Running `/warden:yolo` with no arguments shows a menu of duration options.

### Activate via environment variable

For non-interactive sessions where `/warden:yolo` can't be invoked (e.g. piped prompts), set the `WARDEN_YOLO` env var:

```bash
WARDEN_YOLO=true claude < prompts.txt
WARDEN_YOLO=1 claude < prompts.txt
```

Unlike the slash command, `WARDEN_YOLO` bypasses **all** checks including always-deny commands — it short-circuits before any parsing or evaluation, same as `--dangerously-skip-permissions`.

### How it works

YOLO mode is **session-scoped** — it only affects the current Claude Code session. The hook intercepts special activation commands and stores state in a temp file keyed by session ID. When a command is evaluated during YOLO mode, the hook skips normal rule evaluation and auto-allows (except always-deny commands). Expired YOLO states are cleaned up automatically.

### Discovery

When Warden prompts you for permission (`ask` decision), the system message includes a tip about YOLO mode so you can discover it when you need it most.

## Feedback and `/warden:allow`

When Warden blocks or flags a command, it includes a system message explaining:

1. **Why** the command was blocked/flagged (per-command reasons)
2. **How to allow it** — a ready-to-use YAML snippet for your config

Use the `/warden:allow` slash command to apply the suggested config change. It will ask which scope (project or user) to use.

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

### Trusted remotes
Configure `trustedRemotes` to auto-allow connections and recursively evaluate remote commands:
- **SSH**: `context: ssh` — also covers `scp` and `rsync`
- **Docker**: `context: docker` — for `docker exec`
- **kubectl**: `context: kubectl` — for `kubectl exec` (requires explicit `--context`)
- **Sprite**: `context: sprite` — for `sprite exec`/`console`
- **Fly.io**: `context: fly` — for `fly ssh console`

Remote names support glob patterns: `*`, `?`, `[...]`, `[!...]`, `{a,b,c}`

### Target-based policies
Configure `targetPolicies` to override decisions based on what a command touches:
- **Path**: allow or deny commands targeting specific files/directories, including `{{cwd}}`
- **Database**: match DB host, optional port, and optional database name
- **Endpoint**: match HTTP(S) endpoints for tools like `curl` and `wget`

Legacy aliases such as `trustedSSHHosts`, `trustedDockerContainers`, `trustedKubectlContexts`, `trustedSprites`, `trustedFlyApps`, `trustedPaths`, `trustedDatabases`, and `trustedEndpoints` are still supported, but new configs should prefer `trustedRemotes` and `targetPolicies`.

## How it works

1. Claude Code calls the `PreToolUse` hook before every Bash command
2. Warden parses the command into an AST via [bash-parser](https://github.com/vorpaljs/bash-parser), walking the tree to extract individual commands from pipes, chains, logical expressions, and subshells
3. Shell wrappers (`sh -c`, `bash -c`) and remote commands (`ssh`, `docker exec`, `kubectl exec`, `sprite exec`) are recursively parsed and evaluated
4. Each command is evaluated through the rule hierarchy: alwaysDeny → alwaysAllow → target-based policies → trusted remote contexts → command-specific rules with argument matching → default decision (checked per layer in priority order)
5. Results are combined: any deny → deny whole pipeline, any ask → ask, all allow → allow
6. Returns the decision via stdout JSON (allow/ask) or exit code 2 (deny), with a system message explaining the reasoning for deny/ask decisions

## FAQ

### Warden says "All commands are safe" but I still get a permission prompt

This usually means **another plugin's hook** is overriding Warden's decision. When multiple PreToolUse hooks run, Claude Code uses "most restrictive wins" — if any hook returns `ask`, it overrides another hook's `allow`.

**Common culprit:** The `github-dev` plugin ships a `git_commit_confirm.py` hook that returns `permissionDecision: "ask"` for every `git commit` command, regardless of what Warden decides. You'll see something like:

```
Hook PreToolUse:Bash requires confirmation for this command:
[warden] All commands are safe
```

Warden evaluated the command as safe, but the other hook forced a confirmation prompt.

**How to fix:** Uninstall or disable the conflicting plugin. For example:

```
/plugin uninstall github-dev
```

**How to diagnose:** If you see Warden's `[warden] All commands are safe` message alongside a permission prompt, another hook is the cause. Check your installed plugins for PreToolUse hooks:

```
/plugin list
```

Then inspect each plugin's `hooks/hooks.json` for PreToolUse entries targeting `Bash`.

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
