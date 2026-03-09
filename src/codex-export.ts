import { mkdirSync, writeFileSync } from 'fs';
import { dirname, isAbsolute, join, resolve } from 'path';
import { generateCodexRules } from './codex';
import { loadConfig } from './rules';

interface CliOptions {
  cwd: string;
  outPath: string | null;
}

function parseArgs(argv: string[]): CliOptions {
  let cwd = process.cwd();
  let outPath: string | null = null;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--cwd' && argv[i + 1]) {
      cwd = resolve(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === '--out' && argv[i + 1]) {
      outPath = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--stdout') {
      outPath = '-';
      continue;
    }
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }

  return { cwd, outPath };
}

function printHelp(): void {
  process.stdout.write(
    [
      'Usage: node dist/codex-export.cjs [--cwd <dir>] [--out <path> | --stdout]',
      '',
      'Defaults:',
      '  --cwd: current directory',
      '  --out: <cwd>/.codex/rules/warden.rules',
      '',
    ].join('\n'),
  );
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  const config = loadConfig(options.cwd);
  const rules = generateCodexRules(config);

  const target = options.outPath ?? join(options.cwd, '.codex', 'rules', 'warden.rules');
  if (target === '-') {
    process.stdout.write(rules);
    return;
  }

  const resolvedTarget = isAbsolute(target) ? target : resolve(options.cwd, target);
  mkdirSync(dirname(resolvedTarget), { recursive: true });
  writeFileSync(resolvedTarget, rules, 'utf-8');
  process.stderr.write(`[warden] Wrote Codex rules to ${resolvedTarget}\n`);
}

main();
