import { describe, it, expect } from 'vitest';
import { execFileSync } from 'child_process';
import { resolve } from 'path';
import type { HookInput, HookOutput } from '../types';

// Pins wire-level compatibility between the Claude Code hook binary
// (dist/index.cjs) and Codex's PreToolUse protocol. Only Codex-specific
// concerns live here — general allow/deny/pipeline behavior is covered
// by the evaluator and parser unit tests.
// See: https://developers.openai.com/codex/hooks

const HOOK_BIN = resolve(__dirname, '../../dist/index.cjs');

type CodexPayload = Omit<HookInput, 'permission_mode'> & {
  transcript_path: string | null;
  model: string;
  turn_id: string;
  tool_use_id: string;
};

function runHook(
  overrides: Partial<CodexPayload> & Pick<CodexPayload, 'tool_name' | 'tool_input'>,
): { stdout: string; stderr: string; exitCode: number } {
  const payload: CodexPayload = {
    session_id: 'codex-session-1',
    transcript_path: null,
    cwd: process.cwd(),
    hook_event_name: 'PreToolUse',
    model: 'gpt-5',
    turn_id: 'turn-123',
    tool_use_id: 'tool-use-456',
    ...overrides,
  };

  try {
    const stdout = execFileSync(process.execPath, [HOOK_BIN], {
      input: JSON.stringify(payload),
      encoding: 'utf-8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { stdout, stderr: '', exitCode: 0 };
  } catch (err: any) {
    return {
      stdout: err.stdout ?? '',
      stderr: err.stderr ?? '',
      exitCode: err.status ?? 1,
    };
  }
}

function parseOutput(stdout: string): Required<Pick<HookOutput, 'hookSpecificOutput'>> {
  return JSON.parse(stdout);
}

describe('Codex PreToolUse hook compatibility', () => {
  it('allows safe commands and returns nested hookSpecificOutput', () => {
    const { stdout, exitCode } = runHook({
      tool_name: 'Bash',
      tool_input: { command: 'ls -la' },
    });
    expect(exitCode).toBe(0);
    const output = parseOutput(stdout);
    expect(output.hookSpecificOutput.hookEventName).toBe('PreToolUse');
    expect(output.hookSpecificOutput.permissionDecision).toBe('allow');
    expect(output.hookSpecificOutput.permissionDecisionReason).toContain('[warden]');
  });

  it('denies dangerous commands with exit code 2 and stderr reason', () => {
    const { stdout, stderr, exitCode } = runHook({
      tool_name: 'Bash',
      tool_input: { command: 'shutdown -h now' },
    });
    expect(exitCode).toBe(2);
    const output = parseOutput(stdout);
    expect(output.hookSpecificOutput.permissionDecision).toBe('deny');
    expect(stderr).toContain('[warden] Blocked');
  });

  it('ignores non-Bash tool_name values', () => {
    const { stdout, exitCode } = runHook({
      tool_name: 'Write',
      tool_input: { command: 'anything' },
    });
    expect(exitCode).toBe(0);
    expect(stdout).toBe('');
  });

  it('tolerates Codex-specific fields (turn_id, tool_use_id, model)', () => {
    const { stdout, exitCode } = runHook({
      tool_name: 'Bash',
      tool_input: { command: 'echo hello' },
      turn_id: 'turn-abc-xyz',
      tool_use_id: 'tool-use-deadbeef',
      model: 'gpt-5-codex',
    });
    expect(exitCode).toBe(0);
    const output = parseOutput(stdout);
    expect(output.hookSpecificOutput.permissionDecision).toBe('allow');
  });
});
