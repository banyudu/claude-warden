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

export function generateFullAllowSnippet(command: string): string {
  const lines = [
    'rules:',
    `  - command: "${command}"`,
    '    default: allow',
  ];
  return lines.join('\n');
}

export function generateSubcommandSnippet(command: string, subcommand: string): string {
  const lines = [
    'rules:',
    `  - command: "${command}"`,
    '    default: ask',
    '    argPatterns:',
    '      - match:',
    `          anyArgMatches: ['^${escapeRegex(subcommand)}$']`,
    '        decision: allow',
    `        description: Allow ${command} ${subcommand}`,
  ];
  return lines.join('\n');
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function formatSystemMessage(
  decision: 'deny' | 'ask',
  rawCommand: string,
  details: CommandEvalDetail[],
): string {
  const relevant = details.filter(d => d.decision !== 'allow');

  // Compact format for ask decisions
  if (decision === 'ask') {
    const parts = relevant.map(d => `\`${d.command}\`: ${d.reason}`);
    const header = `[warden] ${parts.join(' | ')}`;

    // Check if any flagged command has args that could be a sub-command
    const subcommandHints = relevant
      .filter(d => d.args.length > 0)
      .map(d => {
        const sub = d.args[0];
        return `  Option A: Allow all \`${d.command}\` → \`/claude-warden:warden-allow ${d.command}\`\n  Option B: Allow only \`${d.command} ${sub}\` → \`/claude-warden:warden-allow ${d.command} ${sub}\``;
      });

    const yoloHint = 'Tip: `/claude-warden:yolo` to temporarily allow all commands';

    if (subcommandHints.length > 0) {
      return `${header}\n${subcommandHints.join('\n')}\nSee /claude-warden:warden-allow\n${yoloHint}`;
    }

    return `${header} — To auto-allow, see /claude-warden:warden-allow\n${yoloHint}`;
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
