import type { Decision, CommandEvalDetail } from './types';

export function generateAllowSnippet(details: CommandEvalDetail[]): string {
  const lines: string[] = [];
  const alwaysAllowCmds: string[] = [];
  const ruleCmds: string[] = [];

  for (const d of details) {
    if (d.decision === 'allow') continue;

    if (d.matchedRule === 'alwaysDeny' || d.matchedRule === 'default') {
      if (!alwaysAllowCmds.includes(d.command)) {
        alwaysAllowCmds.push(d.command);
      }
    } else if (d.matchedRule?.endsWith(':default') || d.matchedRule?.endsWith(':argPattern')) {
      if (!ruleCmds.includes(d.command)) {
        ruleCmds.push(d.command);
      }
    }
  }

  if (alwaysAllowCmds.length > 0) {
    lines.push('alwaysAllow:');
    for (const cmd of alwaysAllowCmds) {
      lines.push(`  - "${cmd}"`);
    }
  }

  if (ruleCmds.length > 0) {
    lines.push('rules:');
    for (const cmd of ruleCmds) {
      lines.push(`  - command: "${cmd}"`);
      lines.push('    default: allow');
    }
  }

  return lines.join('\n');
}

export function formatSystemMessage(
  decision: 'deny' | 'ask',
  rawCommand: string,
  details: CommandEvalDetail[],
): string {
  const relevant = details.filter(d => d.decision !== 'allow');

  // Compact single-line format for ask decisions
  if (decision === 'ask') {
    const parts = relevant.map(d => `\`${d.command}\`: ${d.reason}`);
    return `[warden] ${parts.join(' | ')} — To auto-allow, see /warden-allow`;
  }

  // Verbose format for deny decisions
  const lines: string[] = ['[warden] Command blocked', ''];

  if (relevant.length > 0) {
    for (const d of relevant) {
      lines.push(`- \`${d.command}\`: ${d.reason}`);
    }
    lines.push('');
  }

  const snippet = generateAllowSnippet(details);
  if (snippet) {
    lines.push('To allow this in the future, add to your warden config:');
    lines.push('');
    lines.push('```yaml');
    lines.push(snippet);
    lines.push('```');
    lines.push('');
    lines.push('Config locations:');
    lines.push('- User-level (all projects): `~/.claude/warden.yaml`');
    lines.push('- Project-level (this project): `.claude/warden.yaml`');
    lines.push('');
    lines.push('Project config takes priority over user config.');
  }

  return lines.join('\n');
}
