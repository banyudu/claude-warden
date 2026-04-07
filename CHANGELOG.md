# Changelog

## [2.4.0] - 2026-04-07

### Features
- Add GitHub Copilot CLI support and generic CLI support

### Bug Fixes
- Sync `.claude-plugin/marketplace.json` version and auto-update it during release

### Other Changes
- Extract plugin version syncing into `scripts/sync-plugin-version.cjs`
- Add plugin update instructions to README
## [2.3.0] - 2026-03-16

### Features
- Add ImageMagick commands to default safelist (magick, convert, identify, mogrify, composite, montage, compare, conjure, stream)

### Bug Fixes
- fix(ci): add npm publish steps to auto-release workflow (829389a)

## [2.2.0] - 2026-03-15

### Features
- Support WARDEN_YOLO env var for non-interactive sessions (bd16d76)
- Update publish command to exclude git checks (af2a56f)
- Add vitest config to exclude worktree test files from test runs
- Update `/release` skill to auto-decide version bump (patch/minor) based on commit types, never auto-select major

## [2.0.0] - 2026-03-09

### Breaking Changes
- Rename plugin to warden, rename warden-allow to allow (bb5cec9)

### Features
- Add Codex execpolicy rules exporter (ca27d83)
- Add session-scoped YOLO mode for temporary auto-allow with configurable duration (b7c8d11)
- New `/warden:yolo` slash command to activate/deactivate YOLO mode
- YOLO hint shown on ask decisions for discoverability
- Always-deny commands remain blocked even in YOLO mode for safety

## [1.9.0] - 2026-03-08

### Features
- Warn when argPatterns reference another command name, detecting common misconfiguration (b8a0380)
- Add clearer examples in reference config for allowing python, node, etc.

### Other Changes
- ci: use npm trusted publishing (OIDC) instead of NPM_TOKEN (fb57e2c)
- ci: add npm publish workflow on GitHub release (cf17c14)

## [1.8.1] - 2026-03-07

### Bug Fixes
- Add regex fallback parser when bash-parser fails on special characters in arguments (e.g. `$` in double-quoted strings that aren't actual expansions). Previously these commands would trigger `ask` due to parse errors; now the command name and args are extracted via fallback so rules can still apply.

## [1.8.0] - 2026-03-07

### Features
- Handle xargs safeguards using resolved subcommand (e2cbfa9)
- Allow users to extend default rules instead of shadowing them (b08977c)
- Add pnpx as a package runner rule (b7ac6a6)
- Add networksetup, scutil, and networkQuality to default rules for macOS network diagnostics
- Update dependencies and version constraints (d93ce5b)

### Bug Fixes
- SSH remoteArgs.join loses quoting for paths with spaces (e0354d6)
- rsync/scp should respect trusted host overrides and allowAll (225a4e2)
- Add stdin size limit in index.ts (92ab2b4)
- Add recursion depth limit for nested subshell evaluation (1597b3c)
- Move bash-parser and yaml to dependencies (099e1dd)

### Other Changes
- Warn when config files fail to parse (76db659)
- Validate defaultDecision and rule decision values from config (3898c04)
- Wrap regex compilation in try/catch to prevent ReDoS (22fc97a)
- Add missing test coverage for security hardening (c558512)
- Update GitHub Pages to reflect recent feature changes (00d8550)
- Add .worktrees to .gitignore (f158e83)

## [1.7.0] - 2026-03-04

### Features
- Harden dangerous commands in alwaysAllow with conditional rules (1c01919)
  - Move `xargs`, `tee`, `sed`, `awk`, `find`, `openssl` from `alwaysAllow` to conditional rules
  - `find`: asks on `-exec`, `-execdir`, `-delete`, `-ok`, `-okdir`
  - `sed`: asks on `-i` / `--in-place`
  - `awk`: asks on `system()`, `|getline`, `print >`
  - `xargs`: default ask, allows only bare `xargs` (no args)
  - `tee`: asks when writing to system directories (`/etc`, `/usr`, `/var`, etc.)
  - `openssl`: asks on `enc`, `rsautl`, `pkeyutl`, `smime`, `cms`
  - Closes #6

## [1.6.0] - 2026-03-04

### Features
- Add eval/source/. rules for shell command safety (6285de6)
  - Deny `eval` (arbitrary string execution can't be statically analyzed)
  - Allow `source`/`.` for common safe files (.bashrc, .zshrc, .profile, nvm.sh, .env, .envrc)
  - Deny `source`/`.` with no arguments
  - Ask for all other source/. targets
  - Closes #5

### Bug Fixes
- Correct issue reference in changelog (#4, not #1) (1134351)

## [1.5.3] - 2026-03-03

### Bug Fixes
- Handle unquoted parentheses in file paths, e.g. Next.js route groups like `(app)` (8a25a61)
  - bash-parser treats `(` `)` as shell metacharacters, causing parse failures for paths like `apps/(app)/_layout.tsx`
  - Added preprocessing step that auto-quotes path-like tokens containing parentheses
  - Preserves `$()` command substitution and actual subshell syntax
  - Closes #4

## [1.5.2] - 2026-03-03

### Features
- Support full-path whitelist in command matching (aabf2c0)
  - Allow `alwaysAllow`, `alwaysDeny`, and `rules` to specify full paths (e.g., `/home/user/bin/my-script.sh`)
  - Full-path entries match only the exact command path; basename matching preserved for entries without slashes
  - Supports `~` expansion for home directory paths
  - Closes #3
- Update dependencies to latest versions (49a5d87)

### Bug Fixes
- Specify pnpm version in CI workflow (f0e7594)

### Other Changes
- Add CI workflow (0f424d8)
- Add badges to README (11e9592)

## [1.5.1] - 2026-03-02

### Bug Fixes
- Respect --dangerously-skip-permissions flag (43245de)
  - Auto-allow all commands when Claude Code runs with `--dangerously-skip-permissions`
  - Closes #2

## [1.5.0] - 2026-03-02

### Features
- Send OS notifications on ask/deny decisions (43565f7)
  - macOS: terminal-notifier with click-to-activate terminal, osascript fallback
  - Linux: notify-send
  - Configurable via `notifyOnAsk` and `notifyOnDeny` config flags (both default to `true`)
  - Terminal detection: iTerm2, Terminal.app, Alacritty, WezTerm

## [1.4.0] - 2026-03-02

### Features
- Expand default command coverage with ~80 new commands (e7f3fe7)
  - System/hardware info: lscpu, lsblk, lsusb, lspci, lsmod, dmesg, sysctl, sw_vers, etc.
  - Compression/archive: tar, gzip, zip, unzip, 7z, xz, bzip2, etc.
  - Clipboard: pbcopy, pbpaste, xclip, xsel, wl-copy, wl-paste
  - Binary analysis: strings, nm, objdump, readelf, ldd, otool
  - macOS utilities: mdfind, mdls, xcode-select, xcrun, xcodebuild
  - Cloud CLIs with read-only subcommand detection: gcloud, az, aws
  - Database CLIs: psql, mysql, sqlite3, redis-cli, mongosh
  - Enhanced kubectl with read-only subcommand allow patterns
  - Scripting languages, editors, helm, gpg, process management, and more
- Add wipefs and shred to alwaysDeny

## [1.3.1] - 2026-03-02

### Features
- Add network diagnostic commands (nslookup, dig, host, ping, traceroute, mtr, netstat, ss, ifconfig, ip, nmap) to alwaysAllow defaults

## [1.3.0] - 2026-02-27

### Features
- Add per-target trusted context overrides with allowAll support

### Bug Fixes
- Use fully qualified /claude-warden:warden-allow slash command name

### Other Changes
- Rebuild dist
