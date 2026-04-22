import { wardenEvalWithConfig } from './core';
import { loadConfig } from './rules';
import { evaluateSkill } from './skill-evaluator';
import { formatSystemMessage } from './suggest';
import { sendNotification } from './notify';
import { getYoloState, activateYolo, deactivateYolo, parseYoloCommand } from './yolo';
import { buildDefaultSessionGuidance, DEFAULT_TEMP_SCRIPT_DIR } from './defaults';
import type { HookInput, HookOutput, EvalResult, WardenConfig, Decision } from './types';

// Note: rules.ts defaults to quiet mode, which is what we want in a
// hook. Any stderr output would be surfaced by Claude Code as a
// "hook error" line even with exit code 0. Only real denies (exit 2)
// should reach stderr.

const MAX_STDIN_SIZE = 1024 * 1024; // 1MB

function emitDecision(decision: Decision, reason: string, stderrMessage?: string): never {
  const output: HookOutput = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: decision,
      permissionDecisionReason: reason,
    },
  };
  process.stdout.write(JSON.stringify(output));
  if (decision === 'deny') {
    process.stderr.write(`${stderrMessage ?? reason}\n`);
    process.exit(2);
  }
  process.exit(0);
}

function handleSessionStart(config: WardenConfig): never {
  if (config.sessionGuidance === false) process.exit(0);
  const text = config.sessionGuidance
    ?? buildDefaultSessionGuidance(config.tempScriptDir ?? DEFAULT_TEMP_SCRIPT_DIR);
  const output: HookOutput = {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: text,
    },
  };
  process.stdout.write(JSON.stringify(output));
  process.exit(0);
}

function handleYoloMode(sessionId: string, result: EvalResult): void {
  const yoloState = getYoloState(sessionId);
  if (!yoloState) return;
  if (result.decision === 'deny' && !yoloState.bypassDeny) return;
  const expiryInfo = yoloState.expiresAt
    ? `expires ${new Date(yoloState.expiresAt).toLocaleTimeString()}`
    : 'full session';
  emitDecision('allow', `[warden] YOLO mode active (${expiryInfo})`);
}

async function main() {
  let raw = '';
  for await (const chunk of process.stdin) {
    raw += chunk;
    if (raw.length > MAX_STDIN_SIZE) {
      emitDecision('ask', '[warden] Input exceeds size limit');
    }
  }

  let input: HookInput;
  try {
    input = JSON.parse(raw);
  } catch {
    // Can't parse input — don't interfere
    process.exit(0);
  }

  if (input.hook_event_name === 'SessionStart') {
    const config = loadConfig(input.cwd);
    handleSessionStart(config);
  }

  if (input.tool_name !== 'Bash' && input.tool_name !== 'Skill') {
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

  // Handle Skill tool
  if (input.tool_name === 'Skill') {
    const skillName = input.tool_input?.skill;
    if (!skillName || typeof skillName !== 'string') process.exit(0);
    const args = typeof input.tool_input?.args === 'string' ? input.tool_input.args : undefined;

    const config = loadConfig(input.cwd);
    const result = evaluateSkill(skillName, args, config);

    handleYoloMode(input.session_id, result);
    emitResult(result, `skill:${skillName}`, config);
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
    emitDecision('allow', msg);
  }

  const config = loadConfig(input.cwd);
  const result = wardenEvalWithConfig(command, config, input.cwd);

  handleYoloMode(input.session_id, result);
  emitResult(result, command, config);
}

function emitResult(result: EvalResult, label: string, config: WardenConfig): never {
  if (result.decision === 'allow') {
    emitDecision('allow', `[warden] ${result.reason}`);
  }

  if (result.decision === 'deny') {
    if (config.notifyOnDeny) {
      const truncated = label.length > 80 ? label.slice(0, 77) + '...' : label;
      sendNotification('Claude Warden', `Blocked: ${truncated}`, config);
    }
    const msg = formatSystemMessage('deny', label, result.details);
    emitDecision('deny', msg, `[warden] Blocked: ${result.reason}`);
  }

  // decision === 'ask'
  if (config.notifyOnAsk) {
    const truncated = label.length > 80 ? label.slice(0, 77) + '...' : label;
    sendNotification('Claude Warden', `Permission needed: ${truncated}`, config);
  }
  const msg = formatSystemMessage('ask', label, result.details);
  emitDecision('ask', msg);
}

main().catch(() => process.exit(0));
