import { describe, it, expect } from 'vitest';
import { generateAllowSnippet, generateFullAllowSnippet, generateSubcommandSnippet, formatSystemMessage } from '../suggest';
import type { CommandEvalDetail } from '../types';

describe('generateAllowSnippet', () => {
  it('generates alwaysAllow for alwaysDeny match', () => {
    const details: CommandEvalDetail[] = [
      { command: 'sudo', args: ['apt', 'install'], decision: 'deny', reason: '"sudo" is blocked', matchedRule: 'alwaysDeny' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toContain('alwaysAllow:');
    expect(snippet).toContain('"sudo"');
  });

  it('generates alwaysAllow for default match', () => {
    const details: CommandEvalDetail[] = [
      { command: 'my-tool', args: [], decision: 'ask', reason: 'No rule for "my-tool"', matchedRule: 'default' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toContain('alwaysAllow:');
    expect(snippet).toContain('"my-tool"');
  });

  it('generates rules for argPattern match', () => {
    const details: CommandEvalDetail[] = [
      { command: 'npm', args: ['publish'], decision: 'ask', reason: 'Registry modification', matchedRule: 'npm:argPattern' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toContain('rules:');
    expect(snippet).toContain('"npm"');
    expect(snippet).toContain('default: allow');
  });

  it('generates rules for command default match', () => {
    const details: CommandEvalDetail[] = [
      { command: 'docker', args: ['run', 'ubuntu'], decision: 'ask', reason: 'Docker state-changing operation', matchedRule: 'docker:default' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toContain('rules:');
    expect(snippet).toContain('"docker"');
  });

  it('skips allow decisions', () => {
    const details: CommandEvalDetail[] = [
      { command: 'cat', args: ['file'], decision: 'allow', reason: '"cat" is safe', matchedRule: 'alwaysAllow' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toBe('');
  });

  it('handles mixed decisions', () => {
    const details: CommandEvalDetail[] = [
      { command: 'cat', args: ['file'], decision: 'allow', reason: '"cat" is safe', matchedRule: 'alwaysAllow' },
      { command: 'my-tool', args: [], decision: 'ask', reason: 'No rule', matchedRule: 'default' },
      { command: 'npm', args: ['publish'], decision: 'ask', reason: 'Registry modification', matchedRule: 'npm:argPattern' },
    ];
    const snippet = generateAllowSnippet(details);
    expect(snippet).toContain('alwaysAllow:');
    expect(snippet).toContain('"my-tool"');
    expect(snippet).toContain('rules:');
    expect(snippet).toContain('"npm"');
    expect(snippet).not.toContain('"cat"');
  });

  it('deduplicates commands', () => {
    const details: CommandEvalDetail[] = [
      { command: 'my-tool', args: ['a'], decision: 'ask', reason: 'No rule', matchedRule: 'default' },
      { command: 'my-tool', args: ['b'], decision: 'ask', reason: 'No rule', matchedRule: 'default' },
    ];
    const snippet = generateAllowSnippet(details);
    const matches = snippet.match(/"my-tool"/g);
    expect(matches).toHaveLength(1);
  });
});

describe('generateFullAllowSnippet', () => {
  it('generates a rule with default: allow', () => {
    const snippet = generateFullAllowSnippet('npx');
    expect(snippet).toContain('rules:');
    expect(snippet).toContain('command: "npx"');
    expect(snippet).toContain('default: allow');
  });
});

describe('generateSubcommandSnippet', () => {
  it('generates argPattern rule for sub-command', () => {
    const snippet = generateSubcommandSnippet('npx', 'clawhub');
    expect(snippet).toContain('command: "npx"');
    expect(snippet).toContain('default: ask');
    expect(snippet).toContain("anyArgMatches: ['^clawhub$']");
    expect(snippet).toContain('decision: allow');
    expect(snippet).toContain('description: Allow npx clawhub');
  });

  it('escapes regex special characters in sub-command', () => {
    const snippet = generateSubcommandSnippet('npm', 'some.pkg');
    expect(snippet).toContain("anyArgMatches: ['^some\\.pkg$']");
  });
});

describe('formatSystemMessage', () => {
  it('includes header for deny', () => {
    const msg = formatSystemMessage('deny', 'sudo apt install', [
      { command: 'sudo', args: ['apt', 'install'], decision: 'deny', reason: '"sudo" is blocked', matchedRule: 'alwaysDeny' },
    ]);
    expect(msg).toContain('[warden] Command blocked');
  });

  it('uses compact format for ask with sub-command hints when args present', () => {
    const msg = formatSystemMessage('ask', 'node script.js', [
      { command: 'node', args: ['script.js'], decision: 'ask', reason: 'Default for "node"', matchedRule: 'node:default' },
    ]);
    expect(msg).toContain('[warden]');
    expect(msg).toContain('`node`: Default for "node"');
    expect(msg).toContain('Option A: Allow all `node`');
    expect(msg).toContain('Option B: Allow only `node script.js`');
    expect(msg).toContain('/warden:allow');
    expect(msg).not.toContain('```yaml');
  });

  it('uses simple compact format for ask without args', () => {
    const msg = formatSystemMessage('ask', 'my-tool', [
      { command: 'my-tool', args: [], decision: 'ask', reason: 'No rule', matchedRule: 'default' },
    ]);
    expect(msg).toContain('[warden]');
    expect(msg).toContain('— To auto-allow, see /warden:allow');
    expect(msg).not.toContain('Option A');
  });

  it('includes per-command reasons', () => {
    const msg = formatSystemMessage('deny', 'sudo rm -rf /', [
      { command: 'sudo', args: ['rm', '-rf', '/'], decision: 'deny', reason: '"sudo" is blocked', matchedRule: 'alwaysDeny' },
    ]);
    expect(msg).toContain('`sudo`');
    expect(msg).toContain('"sudo" is blocked');
  });

  it('includes YAML snippet for deny', () => {
    const msg = formatSystemMessage('deny', 'sudo rm', [
      { command: 'sudo', args: ['rm'], decision: 'deny', reason: '"sudo" is blocked', matchedRule: 'alwaysDeny' },
    ]);
    expect(msg).toContain('```yaml');
    expect(msg).toContain('alwaysAllow:');
    expect(msg).toContain('"sudo"');
  });

  it('mentions both config locations for deny', () => {
    const msg = formatSystemMessage('deny', 'sudo rm', [
      { command: 'sudo', args: ['rm'], decision: 'deny', reason: '"sudo" is blocked', matchedRule: 'alwaysDeny' },
    ]);
    expect(msg).toContain('~/.claude/warden.yaml');
    expect(msg).toContain('.claude/warden.yaml');
  });

  it('ask format with args shows sub-command options', () => {
    const msg = formatSystemMessage('ask', 'npx clawhub inspect', [
      { command: 'npx', args: ['clawhub', 'inspect'], decision: 'ask', reason: 'Default for "npx"', matchedRule: 'npx:default' },
    ]);
    expect(msg).toContain('Option A: Allow all `npx` → `/warden:allow npx`');
    expect(msg).toContain('Option B: Allow only `npx clawhub` → `/warden:allow npx clawhub`');
    expect(msg).not.toContain('```yaml');
  });

  it('ask format joins multiple flagged commands with sub-command hints', () => {
    const msg = formatSystemMessage('ask', 'node script.js | unknown-tool', [
      { command: 'node', args: ['script.js'], decision: 'ask', reason: 'Default for "node"', matchedRule: 'node:default' },
      { command: 'unknown-tool', args: [], decision: 'ask', reason: 'No rule for "unknown-tool"', matchedRule: 'default' },
    ]);
    expect(msg).toContain('`node`: Default for "node"');
    expect(msg).toContain('`unknown-tool`: No rule for "unknown-tool"');
    expect(msg).toContain('Option A: Allow all `node`');
    expect(msg).toContain('Option B: Allow only `node script.js`');
    expect(msg).toContain('/warden:allow');
  });
});
