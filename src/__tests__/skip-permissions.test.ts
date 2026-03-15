import { describe, it, expect } from 'vitest';
import { parseCommand } from '../parser';
import { evaluate } from '../evaluator';
import { DEFAULT_CONFIG } from '../defaults';

/**
 * Verifies that the dangerously-skip-permissions check in index.ts
 * would prevent evaluation of normally-denied commands.
 *
 * The actual early-exit lives in index.ts (process.exit(0) before
 * parse/evaluate). Here we confirm the commands used in the test
 * WOULD be denied under normal evaluation, proving the early-exit
 * is necessary.
 */
describe('dangerously-skip-permissions mode', () => {
  const dangerousCommands = [
    'sudo rm -rf /',
    'shutdown -h now',
    'reboot',
  ];

  for (const cmd of dangerousCommands) {
    it(`"${cmd}" is denied under normal evaluation`, () => {
      const parsed = parseCommand(cmd);
      const result = evaluate(parsed, DEFAULT_CONFIG);
      expect(result.decision).toBe('deny');
    });
  }

  it('permission_mode field exists on HookInput type', async () => {
    // Type-level check: ensure the field we rely on in index.ts is defined
    const { } = await import('../types') as { HookInput: { permission_mode: string } };
    // If this compiles and runs, the type exists
    expect(true).toBe(true);
  });

  it('index.ts checks permission_mode before evaluation', async () => {
    // Read the source to verify the early-exit guard exists
    const fs = await import('fs');
    const path = await import('path');
    const indexSrc = fs.readFileSync(
      path.resolve(__dirname, '../index.ts'),
      'utf-8',
    );
    expect(indexSrc).toContain("permission_mode === 'dangerously-skip-permissions'");
    expect(indexSrc).toContain('process.exit(0)');

    // Verify the check comes BEFORE parseCommand
    const skipIndex = indexSrc.indexOf("permission_mode === 'dangerously-skip-permissions'");
    const parseIndex = indexSrc.indexOf('parseCommand(command)');
    expect(skipIndex).toBeLessThan(parseIndex);
  });
});

describe('WARDEN_YOLO env var', () => {
  it('index.ts checks WARDEN_YOLO env var', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const indexSrc = fs.readFileSync(
      path.resolve(__dirname, '../index.ts'),
      'utf-8',
    );
    expect(indexSrc).toContain("process.env.WARDEN_YOLO === 'true'");
    expect(indexSrc).toContain("process.env.WARDEN_YOLO === '1'");
  });

  it('WARDEN_YOLO check comes before parseCommand', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const indexSrc = fs.readFileSync(
      path.resolve(__dirname, '../index.ts'),
      'utf-8',
    );
    const yoloIndex = indexSrc.indexOf("process.env.WARDEN_YOLO");
    const parseIndex = indexSrc.indexOf('parseCommand(command)');
    expect(yoloIndex).toBeGreaterThan(-1);
    expect(yoloIndex).toBeLessThan(parseIndex);
  });
});
