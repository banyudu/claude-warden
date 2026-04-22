import { describe, it, expect, afterEach } from 'vitest';
import { execFileSync } from 'child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { resolve, join } from 'path';
import { loadConfig } from '../rules';
import { DEFAULT_SESSION_GUIDANCE } from '../defaults';

const HOOK_BIN = resolve(__dirname, '../../dist/index.cjs');

function makeWorkspace(yaml?: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'warden-session-'));
  if (yaml !== undefined) {
    mkdirSync(join(dir, '.claude'), { recursive: true });
    writeFileSync(join(dir, '.claude', 'warden.yaml'), yaml);
  }
  return dir;
}

function runHook(
  payload: object,
  opts: { cwd: string; home: string },
): { stdout: string; exitCode: number } {
  try {
    const stdout = execFileSync(process.execPath, [HOOK_BIN], {
      input: JSON.stringify(payload),
      encoding: 'utf-8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: opts.cwd,
      env: { ...process.env, HOME: opts.home, USERPROFILE: opts.home },
    });
    return { stdout, exitCode: 0 };
  } catch (err: any) {
    return { stdout: err.stdout ?? '', exitCode: err.status ?? 1 };
  }
}

describe('sessionGuidance config loading', () => {
  let workspace: string | null = null;

  afterEach(() => {
    if (workspace) rmSync(workspace, { recursive: true, force: true });
    workspace = null;
  });

  it('accepts a string override', () => {
    workspace = makeWorkspace('sessionGuidance: "custom guidance"\n');
    expect(loadConfig(workspace).sessionGuidance).toBe('custom guidance');
  });

  it('accepts `false` to disable', () => {
    workspace = makeWorkspace('sessionGuidance: false\n');
    expect(loadConfig(workspace).sessionGuidance).toBe(false);
  });

  it('ignores invalid types (number) and leaves it undefined', () => {
    workspace = makeWorkspace('sessionGuidance: 42\n');
    expect(loadConfig(workspace).sessionGuidance).toBeUndefined();
  });

  it('accepts a custom tempScriptDir', () => {
    workspace = makeWorkspace('tempScriptDir: .warden-scratch\n');
    expect(loadConfig(workspace).tempScriptDir).toBe('.warden-scratch');
  });

  it('ignores empty or invalid tempScriptDir', () => {
    workspace = makeWorkspace('tempScriptDir: ""\n');
    expect(loadConfig(workspace).tempScriptDir).toBeUndefined();
  });
});

describe('SessionStart hook binary', () => {
  let home: string | null = null;
  let workspace: string | null = null;

  afterEach(() => {
    if (home) rmSync(home, { recursive: true, force: true });
    if (workspace) rmSync(workspace, { recursive: true, force: true });
    home = null;
    workspace = null;
  });

  it('emits the built-in default guidance when no config is set', () => {
    home = makeWorkspace();
    workspace = makeWorkspace();
    const { stdout, exitCode } = runHook(
      {
        session_id: 'test-1',
        hook_event_name: 'SessionStart',
        source: 'startup',
        cwd: workspace,
      },
      { cwd: workspace, home },
    );
    expect(exitCode).toBe(0);
    const output = JSON.parse(stdout);
    expect(output.hookSpecificOutput.hookEventName).toBe('SessionStart');
    expect(output.hookSpecificOutput.additionalContext).toBe(DEFAULT_SESSION_GUIDANCE);
    expect(output.hookSpecificOutput.additionalContext).toContain('/tmp/');
  });

  it('interpolates custom tempScriptDir into the default guidance', () => {
    home = makeWorkspace();
    workspace = makeWorkspace('tempScriptDir: .warden-scratch\n');
    const { stdout, exitCode } = runHook(
      {
        session_id: 'test-tmp',
        hook_event_name: 'SessionStart',
        source: 'startup',
        cwd: workspace,
      },
      { cwd: workspace, home },
    );
    expect(exitCode).toBe(0);
    const output = JSON.parse(stdout);
    expect(output.hookSpecificOutput.additionalContext).toContain('.warden-scratch/');
    expect(output.hookSpecificOutput.additionalContext).not.toContain('/tmp/');
  });

  it('emits user-provided guidance when config sets a string', () => {
    home = makeWorkspace();
    workspace = makeWorkspace('sessionGuidance: "use jq please"\n');
    const { stdout, exitCode } = runHook(
      {
        session_id: 'test-2',
        hook_event_name: 'SessionStart',
        source: 'startup',
        cwd: workspace,
      },
      { cwd: workspace, home },
    );
    expect(exitCode).toBe(0);
    const output = JSON.parse(stdout);
    expect(output.hookSpecificOutput.additionalContext).toBe('use jq please');
  });

  it('emits no output when sessionGuidance is false', () => {
    home = makeWorkspace();
    workspace = makeWorkspace('sessionGuidance: false\n');
    const { stdout, exitCode } = runHook(
      {
        session_id: 'test-3',
        hook_event_name: 'SessionStart',
        source: 'startup',
        cwd: workspace,
      },
      { cwd: workspace, home },
    );
    expect(exitCode).toBe(0);
    expect(stdout).toBe('');
  });

});
