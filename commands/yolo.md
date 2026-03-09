---
description: Enable or disable YOLO mode (auto-allow all commands) for the current session
user_invocable: true
---

This command manages YOLO mode, which temporarily auto-allows all commands that warden would normally prompt for.

## Usage

Parse the argument to determine the action:

### Activate YOLO mode

- `/claude-warden:yolo session` — YOLO for the full session (no expiry)
- `/claude-warden:yolo 5m` — YOLO for 5 minutes
- `/claude-warden:yolo 15m` — YOLO for 15 minutes
- `/claude-warden:yolo 30m` — YOLO for 30 minutes
- `/claude-warden:yolo <N>m` — YOLO for N minutes (any number)

### Deactivate YOLO mode

- `/claude-warden:yolo off` — Turn off YOLO mode immediately

### No arguments

- `/claude-warden:yolo` — Show the user the available options and ask them to choose:
  1. Full session — no expiry, lasts until session ends or manually turned off
  2. 5 minutes
  3. 15 minutes
  4. 30 minutes
  5. Custom duration (ask for number of minutes)

## Implementation

YOLO mode is activated/deactivated via special echo commands that the warden hook intercepts. The hook has access to the session ID, so YOLO mode is automatically scoped to the current session.

### Activate

Run the appropriate echo command via the Bash tool:

- Full session: `echo __WARDEN_YOLO_ACTIVATE__:session`
- Time-limited: `echo __WARDEN_YOLO_ACTIVATE__:<N>m` (e.g., `echo __WARDEN_YOLO_ACTIVATE__:5m`)

### Deactivate

Run: `echo __WARDEN_YOLO_DEACTIVATE__`

### Check status

Run: `echo __WARDEN_YOLO_STATUS__`

## Important

- These echo commands are intercepted by the warden hook — their output in the terminal is not meaningful. The hook's permission decision reason will contain the confirmation message.
- Always-deny commands (sudo, shutdown, etc.) are **still blocked** even in YOLO mode for safety.
- YOLO state files are automatically cleaned up when they expire.
- YOLO mode only affects the current session — other sessions are not impacted.

## After activation

Confirm to the user:
- YOLO mode is now active
- Duration / expiry time (or "full session" if no expiry)
- How to turn it off: `/claude-warden:yolo off`
- Safety reminder: always-deny commands are still blocked
