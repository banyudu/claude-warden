import { describe, it, expect } from 'vitest';
import { parseCommand } from '../parser';

describe('parseCommand', () => {
  it('parses a simple command', () => {
    const result = parseCommand('ls -la');
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('ls');
    expect(result.commands[0].args).toEqual(['-la']);
    expect(result.hasSubshell).toBe(false);
    expect(result.parseError).toBe(false);
  });

  it('parses piped commands', () => {
    const result = parseCommand('cat a.txt | grep foo | wc -l');
    expect(result.commands).toHaveLength(3);
    expect(result.commands[0].command).toBe('cat');
    expect(result.commands[1].command).toBe('grep');
    expect(result.commands[1].args).toEqual(['foo']);
    expect(result.commands[2].command).toBe('wc');
    expect(result.commands[2].args).toEqual(['-l']);
  });

  it('parses chained commands with &&', () => {
    const result = parseCommand('mkdir -p dir && cd dir && npm init -y');
    expect(result.commands).toHaveLength(3);
    expect(result.commands[0].command).toBe('mkdir');
    expect(result.commands[1].command).toBe('cd');
    expect(result.commands[2].command).toBe('npm');
    expect(result.commands[2].args).toEqual(['init', '-y']);
  });

  it('parses commands with ||', () => {
    const result = parseCommand('test -f file || touch file');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('test');
    expect(result.commands[1].command).toBe('touch');
  });

  it('parses commands with ;', () => {
    const result = parseCommand('echo hello; echo world');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('echo');
    expect(result.commands[0].args).toEqual(['hello']);
    expect(result.commands[1].command).toBe('echo');
    expect(result.commands[1].args).toEqual(['world']);
  });

  it('extracts env prefixes', () => {
    const result = parseCommand('NODE_ENV=production npx next build');
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('npx');
    expect(result.commands[0].args).toEqual(['next', 'build']);
    expect(result.commands[0].envPrefixes).toEqual(['NODE_ENV=production']);
  });

  it('handles multiple env prefixes', () => {
    const result = parseCommand('A=1 B=2 npm run test');
    expect(result.commands[0].envPrefixes).toEqual(['A=1', 'B=2']);
    expect(result.commands[0].command).toBe('npm');
  });

  it('handles quoted arguments', () => {
    const result = parseCommand('echo "hello world" | wc -c');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].args).toEqual(['hello world']);
  });

  it('handles single-quoted arguments with pipes inside', () => {
    const result = parseCommand("grep 'a|b' file.txt");
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('grep');
    expect(result.commands[0].args).toEqual(['a|b', 'file.txt']);
  });

  it('detects subshells with $()', () => {
    const result = parseCommand('echo $(whoami)');
    expect(result.hasSubshell).toBe(true);
    expect(result.subshellCommands).toEqual(['whoami']);
  });

  it('detects subshells with backticks', () => {
    const result = parseCommand('echo `date`');
    expect(result.hasSubshell).toBe(true);
    expect(result.subshellCommands).toEqual(['date']);
  });

  it('extracts subshellCommands from complex $() expansion', () => {
    const result = parseCommand('echo $(curl http://example.com)');
    expect(result.hasSubshell).toBe(true);
    expect(result.subshellCommands).toEqual(['curl http://example.com']);
  });

  it('extracts multiple subshellCommands', () => {
    const result = parseCommand('echo $(date) $(whoami)');
    expect(result.hasSubshell).toBe(true);
    expect(result.subshellCommands).toContain('date');
    expect(result.subshellCommands).toContain('whoami');
  });

  it('does not set subshellCommands for regular commands', () => {
    const result = parseCommand('ls -la');
    expect(result.subshellCommands).toEqual([]);
  });

  it('normalizes command paths to basename', () => {
    const result = parseCommand('/usr/bin/node --version');
    expect(result.commands[0].command).toBe('node');
  });

  it('handles empty input', () => {
    const result = parseCommand('');
    expect(result.commands).toHaveLength(0);
    expect(result.parseError).toBe(false);
  });

  it('handles whitespace-only input', () => {
    const result = parseCommand('   ');
    expect(result.commands).toHaveLength(0);
  });

  it('recursively parses sh -c commands', () => {
    const result = parseCommand('sh -c "cat file.txt | wc -l"');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('cat');
    expect(result.commands[1].command).toBe('wc');
  });

  it('recursively parses bash -c commands', () => {
    const result = parseCommand('bash -c "npm run build && npm test"');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('npm');
    expect(result.commands[1].command).toBe('npm');
  });

  it('handles heredocs by extracting base command', () => {
    const result = parseCommand('cat <<EOF\nhello\nEOF');
    expect(result.hasSubshell).toBe(false); // heredoc body is data, not a subshell
    expect(result.commands.length).toBeGreaterThanOrEqual(1);
    expect(result.commands[0].command).toBe('cat');
  });

  it('handles complex real-world command', () => {
    const result = parseCommand('NODE_OPTIONS="--max-old-space-size=4096" npx jest --coverage && echo done');
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('npx');
    expect(result.commands[0].args).toContain('jest');
    expect(result.commands[1].command).toBe('echo');
  });

  it('handles nested subshells', () => {
    const result = parseCommand('(echo hello; (echo nested))');
    expect(result.hasSubshell).toBe(true);
  });

  it('detects command substitution in double quotes', () => {
    const result = parseCommand('echo "today is $(date)"');
    expect(result.hasSubshell).toBe(true);
    expect(result.commands[0].command).toBe('echo');
  });

  it('handles mixed pipes and logical operators', () => {
    const result = parseCommand('cat file | sort && echo done || echo fail');
    expect(result.commands).toHaveLength(4);
    expect(result.commands[0].command).toBe('cat');
    expect(result.commands[1].command).toBe('sort');
    expect(result.commands[2].command).toBe('echo');
    expect(result.commands[3].command).toBe('echo');
  });

  it('returns parseError for invalid syntax', () => {
    const result = parseCommand('if then else fi ;;; <<<');
    expect(result.parseError).toBe(true);
  });

  it('handles $(cat <<EOF) as string interpolation, not subshell', () => {
    const result = parseCommand('gh pr create --title "test" --body "$(cat <<\'EOF\'\ntest body\nEOF\n)"');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('gh');
  });

  it('handles $(cat <<EOF) without quotes on marker', () => {
    const result = parseCommand('git commit -m "$(cat <<EOF\ncommit message\nEOF\n)"');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('git');
  });

  it('does not flag << inside quoted string args as heredoc', () => {
    // << inside a quoted argument should NOT trigger the heredoc first-line extraction path.
    // bash-parser correctly handles this as a CommandExpansion inside a Word.
    const result = parseCommand('git commit -m "fix: handle <<EOF pattern"');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('git');
    expect(result.commands[0].args).toContain('fix: handle <<EOF pattern');
  });

  it('handles $(cat <<EOF) inside quoted args without false heredoc detection', () => {
    // $(cat <<EOF) inside a quoted string is a CommandExpansion (hasSubshell=true),
    // but should NOT trigger the heredoc first-line extraction fallback.
    const result = parseCommand('git commit -m "fix: handle $(cat <<EOF) heredoc"');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(true); // has CommandExpansion
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('git');
  });

  it('does not flag bare heredocs as subshell — body is data, not code', () => {
    const result = parseCommand('cat <<EOF\nhello\nEOF');
    expect(result.hasSubshell).toBe(false);
    expect(result.commands.length).toBeGreaterThanOrEqual(1);
    expect(result.commands[0].command).toBe('cat');
  });

  it('handles heredoc with redirect (cat > file << EOF)', () => {
    const result = parseCommand("cat > /tmp/out.md << 'EOF'\nsome content\nEOF");
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(false);
    expect(result.commands.length).toBeGreaterThanOrEqual(1);
    expect(result.commands[0].command).toBe('cat');
  });

  it('handles heredoc with tee', () => {
    const result = parseCommand("tee /tmp/out.txt << 'EOF'\nhello world\nEOF");
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(false);
    expect(result.commands[0].command).toBe('tee');
  });

  // --- Path parentheses (e.g. Next.js route groups) ---

  it('handles unquoted parentheses in file paths', () => {
    const result = parseCommand('cd /path/to/project && git show HEAD -- apps/mobile/app/(app)/_layout.tsx | head -100');
    expect(result.parseError).toBe(false);
    expect(result.commands).toHaveLength(3);
    expect(result.commands[0].command).toBe('cd');
    expect(result.commands[1].command).toBe('git');
    expect(result.commands[2].command).toBe('head');
  });

  it('handles simple path with parentheses', () => {
    const result = parseCommand('ls apps/(app)');
    expect(result.parseError).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('ls');
  });

  it('handles multiple path-parens tokens', () => {
    const result = parseCommand('diff src/(auth)/page.tsx src/(public)/page.tsx');
    expect(result.parseError).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('diff');
  });

  it('preserves already-quoted paths with parentheses', () => {
    const result = parseCommand('git diff -- "src/(auth)/page.tsx"');
    expect(result.parseError).toBe(false);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('git');
  });

  it('does not affect $() command substitution', () => {
    const result = parseCommand('echo $(date)');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(true);
    expect(result.commands).toHaveLength(1);
    expect(result.commands[0].command).toBe('echo');
  });

  it('does not affect actual subshell syntax', () => {
    const result = parseCommand('echo hello && (cd /tmp && ls)');
    expect(result.parseError).toBe(false);
    expect(result.hasSubshell).toBe(true);
  });
});

// Tests for regex fallback parser (see #30)
describe('regex fallback parser', () => {
  it('falls back to regex when bash-parser fails on $ in double-quoted args', () => {
    const result = parseCommand('gh api repos/org/repo/pulls/1/comments -f body="regex /^[A-Za-z_][A-Za-z0-9_]*$/" -F in_reply_to=123');
    expect(result.parseError).toBe(false);
    expect(result.commands.length).toBe(1);
    expect(result.commands[0].command).toBe('gh');
    expect(result.commands[0].args[0]).toBe('api');
  });

  it('does not use fallback for pipes (too complex)', () => {
    // A command that would fail bash-parser AND has pipes should still be parseError
    const result = parseCommand('echo "$invalid" | gh api foo');
    // If bash-parser handles it, great; if not, fallback should refuse pipes
    if (result.parseError) {
      expect(result.commands.length).toBe(0);
    }
  });

  it('handles env prefixes in fallback', () => {
    const result = parseCommand('FOO=bar gh api repos/org/repo/issues -f body="test $value"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
    expect(result.commands[0].envPrefixes).toContain('FOO=bar');
  });

  it('handles $ at end of double-quoted string', () => {
    const result = parseCommand('gh api repos/org/repo/issues -f body="price is 100$"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });

  it('handles multiple $ characters in args', () => {
    const result = parseCommand('gh api repos/org/repo/issues -f body="costs $5 or $10"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });

  it('normalizes full path commands in fallback', () => {
    const result = parseCommand('/usr/bin/gh api repos/org/repo/issues -f body="$test"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });

  it('preserves single-quoted args in fallback', () => {
    const result = parseCommand("gh api repos/org/repo/issues -f body='has $dollar signs'");
    // bash-parser may or may not handle this — if fallback is used, verify command
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });

  // TODO(#30): These cases currently fall back to regex but ideally bash-parser should handle them
  it('does not use fallback for && chains (too complex)', () => {
    const result = parseCommand('echo "$bad" && echo ok');
    if (result.parseError) {
      // Fallback correctly refuses chains
      expect(result.commands.length).toBe(0);
    }
  });

  it('does not use fallback for semicolons (too complex)', () => {
    const result = parseCommand('echo "$bad"; echo ok');
    if (result.parseError) {
      expect(result.commands.length).toBe(0);
    }
  });
});

describe('parser regressions', () => {
  it('parses grep regex anchors in double-quoted pipeline args (#46)', () => {
    const result = parseCommand('ls -la /tmp/ | grep -E "\\.sql$"');
    expect(result.parseError).toBe(false);
    expect(result.commands).toHaveLength(2);
    expect(result.commands[0].command).toBe('ls');
    expect(result.commands[1].command).toBe('grep');
    expect(result.commands[1].args).toEqual(['-E', '\\.sql$']);
  });
});

// TODO(#30): bash-parser misparses these — currently handled by regex fallback
describe('bash-parser known limitations (#30)', () => {
  it('$ followed by / in double quotes (regex anchors)', () => {
    const result = parseCommand('curl -X POST -d "pattern: /^foo$/" http://example.com');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('curl');
  });

  it('$ followed by ] in double quotes (character classes)', () => {
    const result = parseCommand('echo "match [a-z$]"');
    // bash-parser may handle this or fallback may catch it
    expect(result.parseError).toBe(false);
  });

  it('$ followed by ) in double quotes', () => {
    const result = parseCommand('gh issue create -f body="validate($)"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });

  it('multiline body with $ characters', () => {
    const result = parseCommand('gh api repos/org/repo/pulls/1/comments -f body="line1\nregex: /^[A-Z]$+/\nline3"');
    expect(result.parseError).toBe(false);
    expect(result.commands[0].command).toBe('gh');
  });
});
