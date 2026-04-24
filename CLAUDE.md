# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Claude Warden is a Claude Code plugin that provides smart command safety filtering. It intercepts Bash tool calls via a PreToolUse hook, parses shell commands into individual parts (handling pipes, chains, env prefixes), evaluates each against configurable safety rules, and returns allow/deny/ask decisions — eliminating unnecessary permission prompts while blocking dangerous commands.

## Commands

- `pnpm run build` — Build with tsup (outputs `dist/index.cjs`)
- `pnpm run test` — Run all tests with vitest
- `pnpm run test -- src/__tests__/parser.test.ts` — Run a single test file
- `pnpm run test:watch` — Vitest in watch mode
- `pnpm run typecheck` — TypeScript type checking
- `pnpm run dev` — Watch mode build
- `pnpm run eval` — Run the built hook locally (reads hook JSON from stdin)

## Architecture

**Hook entry point**: `src/index.ts` reads JSON from stdin (Claude Code hook protocol), runs the parse→evaluate pipeline, and outputs the permission decision via stdout JSON or exit code 2 (deny).

**Pipeline**: `index.ts` → `parser.ts` → `evaluator.ts` (with config from `rules.ts` + `defaults.ts`)

- `src/parser.ts` — State-machine shell command splitter. Splits on `|`, `&&`, `||`, `;` while respecting quotes. Extracts env prefixes, normalizes command paths to basename. Recursively parses `sh -c`/`bash -c` arguments. Detects subshells and heredocs.
- `src/evaluator.ts` — Decision engine. Hierarchy: global deny patterns → alwaysDeny → alwaysAllow → command-specific rules with argument pattern matching → default decision. For pipelines/chains, combines per-command results (any deny → deny, any ask → ask, all allow → allow).
- `src/defaults.ts` — Built-in rules for ~100 common dev commands. Three tiers: always-allow (cat, ls, grep...), always-deny (sudo, shutdown...), conditional (node, npx, git, docker... with argument-aware patterns).
- `src/rules.ts` — Loads and merges config from `~/.claude/warden.yaml` (user) and `.claude/warden.yaml` (project). User rules override defaults by command name. Config also supports `trustedSSHHosts`, `trustedDockerContainers`, `trustedKubectlContexts`, and `trustedSprites` for context-aware filtering.
- `src/types.ts` — All TypeScript interfaces.

## Hook Protocol

The hook communicates with Claude Code via the PreToolUse hook protocol:
- **Input**: JSON on stdin with `tool_name`, `tool_input.command`, `cwd`, etc.
- **Allow**: stdout JSON with `permissionDecision: "allow"`
- **Ask**: stdout JSON with `permissionDecision: "ask"` (falls through to user prompt)
- **Deny**: exit code 2 with reason on stderr

## Releasing

npm publish runs **locally** — CI only creates the GitHub tag + release. OIDC trusted publishing from CI kept failing with 404s on the registry PUT, so we dropped it.

1. Bump version on a `release/vX.Y.Z` branch, update CHANGELOG.md, open PR.
2. Merge PR to `main` with a merge commit (main is protected — no direct pushes, squash disabled). The commit message must start with `chore: release v<version>`.
3. `auto-release.yml` picks up the release commit on main, tags it, and creates the GitHub release from the CHANGELOG entry.
4. Locally: `git checkout vX.Y.Z && pnpm install --frozen-lockfile && npm publish --access public`. The `prepublishOnly` script syncs plugin version, builds, and tests before publishing.

## Plugin Structure

- `.claude-plugin/plugin.json` — Plugin metadata
- `hooks/hooks.json` — PreToolUse hook registration targeting "Bash" matcher
- `config/warden.default.yaml` — Reference config for users to copy and customize
