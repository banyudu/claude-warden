import { describe, expect, it } from 'vitest';
import { evaluateSkill } from '../skill-evaluator';
import { DEFAULT_CONFIG } from '../defaults';
import type { WardenConfig, SkillRulesConfig } from '../types';

function configWith(skillRules: SkillRulesConfig): WardenConfig {
  return { ...DEFAULT_CONFIG, skillRules };
}

describe('evaluateSkill', () => {
  describe('default rules', () => {
    it('allows read-only review skills', () => {
      expect(evaluateSkill('review', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('security-review', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('code-review:code-review', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('pr-review-toolkit:review-pr', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('allows read-only slack skills', () => {
      expect(evaluateSkill('slack:find-discussions', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:summarize-channel', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:channel-digest', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:standup', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:draft-announcement', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:slack-messaging', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('slack:slack-search', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('allows read-only guidance/usage skills', () => {
      expect(evaluateSkill('keybindings-help', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('claude-api', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('azure-tools:azure-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('gcloud-tools:gcloud-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('linear-tools:linear-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('tavily-tools:tavily-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('mongodb-tools:mongodb-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('supabase-tools:supabase-usage', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('playwright-tools:playwright-testing', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('allows read-only plugin dev guidance skills', () => {
      expect(evaluateSkill('plugin-dev:agent-development', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:mcp-integration', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:skill-development', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:plugin-settings', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:command-development', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:plugin-structure', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('plugin-dev:hook-development', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('allows read-only search/summarization skills', () => {
      expect(evaluateSkill('promptfolio-summarize', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('promptfolio-search-skills', undefined, DEFAULT_CONFIG).decision).toBe('allow');
      expect(evaluateSkill('promptfolio-search-people', undefined, DEFAULT_CONFIG).decision).toBe('allow');
    });

    it('asks for write skills by default', () => {
      expect(evaluateSkill('commit', undefined, DEFAULT_CONFIG).decision).toBe('ask');
      expect(evaluateSkill('simplify', undefined, DEFAULT_CONFIG).decision).toBe('ask');
      expect(evaluateSkill('init', undefined, DEFAULT_CONFIG).decision).toBe('ask');
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
        layers: [{ alwaysAllow: ['example-plugin:*'], alwaysDeny: [], rules: [] }],
      });
      expect(evaluateSkill('example-plugin:commit', undefined, config).decision).toBe('allow');
      expect(evaluateSkill('example-plugin:worktree', undefined, config).decision).toBe('allow');
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
          rules: [{ skill: 'example-plugin:*', default: 'allow' }],
        }],
      });
      expect(evaluateSkill('example-plugin:commit', undefined, config).decision).toBe('allow');
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
      const result = evaluateSkill('review', undefined, DEFAULT_CONFIG);
      expect(result.details).toHaveLength(1);
      expect(result.details[0].command).toBe('review');
      expect(result.details[0].matchedRule).toBe('alwaysAllow');
    });

    it('includes args in details when provided', () => {
      const result = evaluateSkill('unknown', '-m "test"', DEFAULT_CONFIG);
      expect(result.details[0].args).toEqual(['-m "test"']);
    });

    it('has empty args array when no args', () => {
      const result = evaluateSkill('review', undefined, DEFAULT_CONFIG);
      expect(result.details[0].args).toEqual([]);
    });
  });
});
