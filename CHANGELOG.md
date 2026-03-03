# Changelog

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
