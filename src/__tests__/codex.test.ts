import { describe, expect, it } from 'vitest';
import { buildCodexRuleRecords, generateCodexRules } from '../codex';
import type { WardenConfig } from '../types';

function baseConfig(layers: WardenConfig['layers']): WardenConfig {
  return {
    layers,
    defaultDecision: 'ask',
    askOnSubshell: true,
    notifyOnAsk: false,
    notifyOnDeny: true,
    skillRules: { defaultDecision: 'ask', layers: [{ alwaysAllow: [], alwaysDeny: [], rules: [] }] },
  };
}

describe('buildCodexRuleRecords', () => {
  it('maps allow/ask/deny to effective command decisions', () => {
    const config = baseConfig([
      {
        alwaysAllow: ['git'],
        alwaysDeny: ['sudo'],
        rules: [{ command: 'npm', default: 'ask' }],
      },
    ]);

    const records = buildCodexRuleRecords(config);
    expect(records).toContainEqual(expect.objectContaining({ command: 'git', decision: 'allow' }));
    expect(records).toContainEqual(expect.objectContaining({ command: 'sudo', decision: 'deny' }));
    expect(records).toContainEqual(expect.objectContaining({ command: 'npm', decision: 'ask' }));
  });

  it('respects warden layer precedence (higher layer first)', () => {
    const config = baseConfig([
      { alwaysAllow: ['echo'], alwaysDeny: [], rules: [] },
      { alwaysAllow: [], alwaysDeny: ['echo'], rules: [] },
    ]);

    const records = buildCodexRuleRecords(config);
    expect(records).toContainEqual(expect.objectContaining({ command: 'echo', decision: 'allow' }));
  });
});

describe('generateCodexRules', () => {
  it('emits valid prefix_rule decisions for codex', () => {
    const config = baseConfig([
      {
        alwaysAllow: ['git'],
        alwaysDeny: ['sudo'],
        rules: [{ command: 'npm', default: 'ask' }],
      },
    ]);

    const output = generateCodexRules(config);
    expect(output).toContain('prefix_rule(pattern = ["git"], decision = "allow"');
    expect(output).toContain('prefix_rule(pattern = ["sudo"], decision = "forbidden"');
    expect(output).toContain('prefix_rule(pattern = ["npm"], decision = "prompt"');
  });
});
