import { describe, it, expect } from 'vitest';
import { evaluate } from '../evaluator';
import { parseCommand } from '../parser';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, ConfigLayer } from '../types';

function emptyLayer(overrides: Partial<ConfigLayer> = {}): ConfigLayer {
  return { alwaysAllow: [], alwaysDeny: [], rules: [], ...overrides };
}

function evalWith(cmd: string, overrides: Partial<WardenConfig>) {
  const config: WardenConfig = { ...structuredClone(DEFAULT_CONFIG), ...overrides };
  return evaluate(parseCommand(cmd), config);
}

describe('rule merging across layers', () => {
  it('user rule extends default rule by default', () => {
    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'ask',
        argPatterns: [{
          match: { anyArgMatches: ['^clawhub$'] },
          decision: 'allow',
          description: 'user pattern',
        }],
      }],
    });

    const result = evalWith('npx clawhub', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(result.decision).toBe('allow');

    // Default npx patterns should still work (e.g. vitest is allowed by default)
    const result2 = evalWith('npx vitest', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(result2.decision).toBe('allow');
  });

  it('user default field overrides lower-layer default', () => {
    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'deny',
        argPatterns: [{
          match: { anyArgMatches: ['^clawhub$'] },
          decision: 'allow',
        }],
      }],
    });

    // clawhub matches user pattern → allow
    const r1 = evalWith('npx clawhub', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(r1.decision).toBe('allow');

    // unknown-tool doesn't match any pattern → user's default: deny
    const r2 = evalWith('npx unknown-tool-xyz', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(r2.decision).toBe('deny');
  });

  it('override: true stops merging — shadows lower layers', () => {
    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        override: true,
        default: 'deny',
        argPatterns: [{
          match: { anyArgMatches: ['^clawhub$'] },
          decision: 'allow',
        }],
      }],
    });

    // clawhub → allow (user pattern)
    const r1 = evalWith('npx clawhub', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(r1.decision).toBe('allow');

    // vitest would normally be allowed by default rules, but override stops merging
    const r2 = evalWith('npx vitest', {
      layers: [userLayer, ...DEFAULT_CONFIG.layers],
    });
    expect(r2.decision).toBe('deny');
  });

  it('3-layer merge: workspace + user + default', () => {
    const workspaceLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'ask',
        argPatterns: [{
          match: { anyArgMatches: ['^ws-tool$'] },
          decision: 'allow',
          description: 'workspace pattern',
        }],
      }],
    });

    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'ask',
        argPatterns: [{
          match: { anyArgMatches: ['^user-tool$'] },
          decision: 'allow',
          description: 'user pattern',
        }],
      }],
    });

    const layers = [workspaceLayer, userLayer, ...DEFAULT_CONFIG.layers];

    // workspace pattern
    expect(evalWith('npx ws-tool', { layers }).decision).toBe('allow');
    // user pattern
    expect(evalWith('npx user-tool', { layers }).decision).toBe('allow');
    // default pattern (e.g. vitest)
    expect(evalWith('npx vitest', { layers }).decision).toBe('allow');
  });

  it('3-layer merge: workspace override stops at workspace', () => {
    const workspaceLayer = emptyLayer({
      rules: [{
        command: 'npx',
        override: true,
        default: 'deny',
        argPatterns: [{
          match: { anyArgMatches: ['^ws-only$'] },
          decision: 'allow',
        }],
      }],
    });

    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'ask',
        argPatterns: [{
          match: { anyArgMatches: ['^user-tool$'] },
          decision: 'allow',
        }],
      }],
    });

    const layers = [workspaceLayer, userLayer, ...DEFAULT_CONFIG.layers];

    expect(evalWith('npx ws-only', { layers }).decision).toBe('allow');
    // user-tool and vitest are blocked because workspace has override: true
    expect(evalWith('npx user-tool', { layers }).decision).toBe('deny');
    expect(evalWith('npx vitest', { layers }).decision).toBe('deny');
  });

  it('no regression: single-layer rules still work identically', () => {
    // Just using DEFAULT_CONFIG — no user layers
    const r1 = evaluate(parseCommand('npx vitest'), DEFAULT_CONFIG);
    expect(r1.decision).toBe('allow');

    const r2 = evaluate(parseCommand('npx unknown-xyz'), DEFAULT_CONFIG);
    expect(r2.decision).toBe('ask');

    const r3 = evaluate(parseCommand('git status'), DEFAULT_CONFIG);
    expect(r3.decision).toBe('allow');
  });

  it('user rule for command not in defaults works standalone', () => {
    const userLayer = emptyLayer({
      rules: [{
        command: 'my-custom-tool',
        default: 'deny',
        argPatterns: [{
          match: { anyArgMatches: ['^safe-arg$'] },
          decision: 'allow',
        }],
      }],
    });

    const layers = [userLayer, ...DEFAULT_CONFIG.layers];

    expect(evalWith('my-custom-tool safe-arg', { layers }).decision).toBe('allow');
    expect(evalWith('my-custom-tool danger', { layers }).decision).toBe('deny');
  });

  it('user layer without argPatterns still merges with default patterns', () => {
    const userLayer = emptyLayer({
      rules: [{
        command: 'npx',
        default: 'deny',
        // No argPatterns — just overriding the default decision
      }],
    });

    const layers = [userLayer, ...DEFAULT_CONFIG.layers];

    // vitest still allowed via default layer's patterns
    expect(evalWith('npx vitest', { layers }).decision).toBe('allow');
    // But unmatched commands now get user's default: deny
    expect(evalWith('npx unknown-xyz', { layers }).decision).toBe('deny');
  });
});
