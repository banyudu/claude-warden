import { parseCommand } from './parser';
import { evaluate } from './evaluator';
import { loadConfig } from './rules';
import { formatSystemMessage } from './suggest';
import { sendNotification } from './notify';
import type { HookInput, HookOutput } from './types';

async function main() {
  let raw = '';
  for await (const chunk of process.stdin) {
    raw += chunk;
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

  // Auto-allow when running with --dangerously-skip-permissions
  if (input.permission_mode === 'dangerously-skip-permissions') {
    process.exit(0);
  }

  const command = input.tool_input?.command;
  if (!command || typeof command !== 'string') {
    process.exit(0);
  }

  const config = loadConfig(input.cwd);
  const parsed = parseCommand(command);
  const result = evaluate(parsed, config);

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
