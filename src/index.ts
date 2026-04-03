import { parseCommand } from './parser';
import { evaluate } from './evaluator';
import { loadConfig } from './rules';
import { formatSystemMessage } from './suggest';
import { sendNotification } from './notify';
import { getYoloState, activateYolo, deactivateYolo, parseYoloCommand } from './yolo';
import type { HookInput, HookOutput } from './types';

const MAX_STDIN_SIZE = 1024 * 1024; // 1MB

async function main() {
  let raw = '';
  for await (const chunk of process.stdin) {
    raw += chunk;
    if (raw.length > MAX_STDIN_SIZE) {
      const output = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: '[warden] Input exceeds size limit',
        },
      };
      process.stdout.write(JSON.stringify(output));
      process.exit(0);
    }
  }

  let input: HookInput;
  try {
    input = JSON.parse(raw);
  } catch {
    // Can't parse input — don't interfere
    process.exit(0);
  }

  if (input.tool_name !== 'Bash') {
    process.exit(0);
  }

  // Claude Code sends the internal enum value, not the CLI flag name.
  if (input.permission_mode === 'bypassPermissions') {
    process.exit(0);
  }

  // Auto-allow when WARDEN_YOLO env var is set
  if (process.env.WARDEN_YOLO === 'true' || process.env.WARDEN_YOLO === '1') {
    process.exit(0);
  }

  const command = input.tool_input?.command;
  if (!command || typeof command !== 'string') {
    process.exit(0);
  }

  // Handle YOLO activation/deactivation commands
  const yoloCmd = parseYoloCommand(command);
  if (yoloCmd) {
    let msg: string;
    if (yoloCmd.action === 'activate') {
      const state = activateYolo(input.session_id, yoloCmd.durationMinutes);
      const expiryInfo = state.expiresAt
        ? `expires at ${new Date(state.expiresAt).toLocaleTimeString()}`
        : 'full session, no expiry';
      msg = `[warden] YOLO mode activated (${expiryInfo}). Always-deny commands are still blocked. Use \`echo __WARDEN_YOLO_DEACTIVATE__\` to turn off.`;
    } else if (yoloCmd.action === 'deactivate') {
      deactivateYolo(input.session_id);
      msg = '[warden] YOLO mode deactivated. Normal rule evaluation resumed.';
    } else {
      const state = getYoloState(input.session_id);
      if (state) {
        const expiryInfo = state.expiresAt
          ? `expires at ${new Date(state.expiresAt).toLocaleTimeString()}`
          : 'full session';
        msg = `[warden] YOLO mode is active (${expiryInfo})`;
      } else {
        msg = '[warden] YOLO mode is not active';
      }
    }
    const output: HookOutput = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'allow',
        permissionDecisionReason: msg,
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  const config = loadConfig(input.cwd);

  // Check YOLO mode
  const yoloState = getYoloState(input.session_id);
  if (yoloState) {
    const parsed = parseCommand(command);
    const result = evaluate(parsed, config, input.cwd);

    // In YOLO mode, only block alwaysDeny commands (unless bypassDeny is set)
    if (result.decision === 'deny' && !yoloState.bypassDeny) {
      // Fall through to normal deny handling below
    } else {
      const expiryInfo = yoloState.expiresAt
        ? `expires ${new Date(yoloState.expiresAt).toLocaleTimeString()}`
        : 'full session';
      const output: HookOutput = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'allow',
          permissionDecisionReason: `[warden] YOLO mode active (${expiryInfo})`,
        },
      };
      process.stdout.write(JSON.stringify(output));
      process.exit(0);
    }
  }

  const parsed = parseCommand(command);
  const result = evaluate(parsed, config, input.cwd);

  if (result.decision === 'allow') {
    const output: HookOutput = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'allow',
        permissionDecisionReason: `[warden] ${result.reason}`,
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.exit(0);
  }

  if (result.decision === 'deny') {
    if (config.notifyOnDeny) {
      const truncated = command.length > 80 ? command.slice(0, 77) + '...' : command;
      sendNotification('Claude Warden', `Blocked: ${truncated}`, config);
    }
    const msg = formatSystemMessage('deny', command, result.details);
    const output: HookOutput = {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: msg,
      },
    };
    process.stdout.write(JSON.stringify(output));
    process.stderr.write(`[warden] Blocked: ${result.reason}\n`);
    process.exit(2);
  }

  // decision === 'ask' — provide feedback via systemMessage
  if (config.notifyOnAsk) {
    const truncated = command.length > 80 ? command.slice(0, 77) + '...' : command;
    sendNotification('Claude Warden', `Permission needed: ${truncated}`, config);
  }
  const msg = formatSystemMessage('ask', command, result.details);
  const output: HookOutput = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: msg,
    },
  };
  process.stdout.write(JSON.stringify(output));
  process.exit(0);
}

main().catch(() => process.exit(0));
