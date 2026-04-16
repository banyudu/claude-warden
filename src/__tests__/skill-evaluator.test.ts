import { describe, expect, it } from 'vitest';
import { evaluateSkill } from '../skill-evaluator';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, SkillRulesConfig } from '../types';

function configWith(skillRules: SkillRulesConfig): WardenConfig {
  return { ...DEFAULT_CONFIG, skillRules };
}

describe('evaluateSkill', () => {
  describe('default rules', () => {
    it('allows built-in safe skills', () => {
      expect(evaluateSkill('commit', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('review', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('simplify', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('init', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('asks for unknown skills', () => {
      const result = evaluateSkill('deploy', undefined, DEFAULT_CONFIG);
      expect(result.decision).toBe('ask');
      expect(result.reason).toContain('No rule for skill');
    });
  });

  describe('alwaysDeny', () => {
    it('blocks skills in alwaysDeny', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{ alwaysAllow: [], alwaysDeny: ['deploy'], rules: [] }],
      });
      const result = evaluateSkill('deploy', undefined, config);
      expect(result.decision).toBe('deny');
      expect(result.reason).toContain('blocked');
    });

    it('alwaysDeny takes priority over alwaysAllow in the same layer', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{ alwaysAllow: ['deploy'], alwaysDeny: ['deploy'], rules: [] }],
      });
      expect(evaluateSkill('deploy', undefined, config).decision).toBe('deny');
    });
  });

  describe('alwaysAllow', () => {
    it('allows skills in alwaysAllow', () => {
      const config = configWith({
        defaultDecision: 'deny',
        layers: [{ alwaysAllow: ['my-skill'], alwaysDeny: [], rules: [] }],
      });
      expect(evaluateSkill('my-skill', undefined, config).decision).toBe('allow');
    });
  });

  describe('glob patterns', () => {
    it('matches glob patterns in alwaysAllow', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{ alwaysAllow: ['bd:*'], alwaysDeny: [], rules: [] }],
      });
      expect(evaluateSkill('bd:commit', undefined, config).decision).toBe('allow');
      expect(evaluateSkill('bd:worktree', undefined, config).decision).toBe('allow');
      expect(evaluateSkill('other:thing', undefined, config).decision).toBe('ask');
    });

    it('matches glob patterns in alwaysDeny', () => {
      const config = configWith({
        defaultDecision: 'allow',
        layers: [{ alwaysAllow: [], alwaysDeny: ['deploy:*'], rules: [] }],
      });
      expect(evaluateSkill('deploy:prod', undefined, config).decision).toBe('deny');
    });

    it('matches glob patterns in rules', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{
          alwaysAllow: [],
          alwaysDeny: [],
          rules: [{ skill: 'bd:*', default: 'allow' }],
        }],
      });
      expect(evaluateSkill('bd:commit', undefined, config).decision).toBe('allow');
    });
  });

  describe('argPatterns', () => {
    it('matches argsMatch patterns', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{
          alwaysAllow: [],
          alwaysDeny: [],
          rules: [{
            skill: 'release',
            default: 'ask',
            argPatterns: [{
              match: { argsMatch: ['--dry-run'] },
              decision: 'allow',
              reason: 'Dry-run is safe',
            }],
          }],
        }],
      });
      expect(evaluateSkill('release', '--dry-run', config).decision).toBe('allow');
      expect(evaluateSkill('release', '--force', config).decision).toBe('ask');
      expect(evaluateSkill('release', undefined, config).decision).toBe('ask');
    });

    it('matches noArgs pattern', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [{
          alwaysAllow: [],
          alwaysDeny: [],
          rules: [{
            skill: 'deploy',
            default: 'ask',
            argPatterns: [{
              match: { noArgs: true },
              decision: 'deny',
              reason: 'Deploy requires arguments',
            }],
          }],
        }],
      });
      expect(evaluateSkill('deploy', undefined, config).decision).toBe('deny');
      expect(evaluateSkill('deploy', '--target staging', config).decision).toBe('ask');
    });
  });

  describe('layer priority', () => {
    it('workspace layer takes priority over user layer', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [
          { alwaysAllow: ['deploy'], alwaysDeny: [], rules: [] },      // workspace
          { alwaysAllow: [], alwaysDeny: ['deploy'], rules: [] },      // user
        ],
      });
      // workspace allows it before user denies it
      expect(evaluateSkill('deploy', undefined, config).decision).toBe('allow');
    });

    it('higher-priority deny blocks lower-priority allow', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [
          { alwaysAllow: [], alwaysDeny: ['deploy'], rules: [] },      // workspace
          { alwaysAllow: ['deploy'], alwaysDeny: [], rules: [] },      // user
        ],
      });
      expect(evaluateSkill('deploy', undefined, config).decision).toBe('deny');
    });
  });

  describe('rule merging', () => {
    it('merges argPatterns across layers', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [
          {
            alwaysAllow: [], alwaysDeny: [],
            rules: [{
              skill: 'release',
              default: 'ask',
              argPatterns: [{ match: { argsMatch: ['--dry-run'] }, decision: 'allow' }],
            }],
          },
          {
            alwaysAllow: [], alwaysDeny: [],
            rules: [{
              skill: 'release',
              default: 'deny',
              argPatterns: [{ match: { argsMatch: ['--force'] }, decision: 'deny', reason: 'Force is dangerous' }],
            }],
          },
        ],
      });
      // First layer's default wins
      expect(evaluateSkill('release', '--dry-run', config).decision).toBe('allow');
      expect(evaluateSkill('release', '--force', config).decision).toBe('deny');
      expect(evaluateSkill('release', '--other', config).decision).toBe('ask');
    });

    it('override stops merging from lower layers', () => {
      const config = configWith({
        defaultDecision: 'ask',
        layers: [
          {
            alwaysAllow: [], alwaysDeny: [],
            rules: [{
              skill: 'release',
              default: 'allow',
              override: true,
            }],
          },
          {
            alwaysAllow: [], alwaysDeny: [],
            rules: [{
              skill: 'release',
              default: 'deny',
              argPatterns: [{ match: { argsMatch: ['.*'] }, decision: 'deny' }],
            }],
          },
        ],
      });
      // Override stops lower layer, uses first layer's default
      expect(evaluateSkill('release', '--anything', config).decision).toBe('allow');
    });
  });

  describe('defaultDecision', () => {
    it('uses custom defaultDecision', () => {
      const config = configWith({
        defaultDecision: 'allow',
        layers: [{ alwaysAllow: [], alwaysDeny: [], rules: [] }],
      });
      expect(evaluateSkill('unknown-skill', undefined, config).decision).toBe('allow');
    });

    it('uses deny as defaultDecision', () => {
      const config = configWith({
        defaultDecision: 'deny',
        layers: [{ alwaysAllow: [], alwaysDeny: [], rules: [] }],
      });
      expect(evaluateSkill('unknown-skill', undefined, config).decision).toBe('deny');
    });
  });

  describe('details', () => {
    it('includes skill name in details', () => {
      const result = evaluateSkill('commit', undefined, DEFAULT_CONFIG);
      expect(result.details).toHaveLength(1);
      expect(result.details[0].command).toBe('commit');
      expect(result.details[0].matchedRule).toBe('alwaysAllow');
    });

    it('includes args in details when provided', () => {
      const result = evaluateSkill('unknown', '-m "test"', DEFAULT_CONFIG);
      expect(result.details[0].args).toEqual(['-m "test"']);
    });

    it('has empty args array when no args', () => {
      const result = evaluateSkill('commit', undefined, DEFAULT_CONFIG);
      expect(result.details[0].args).toEqual([]);
    });
  });
});
