# Changelog

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
