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
  });

  it('detects subshells with backticks', () => {
    const result = parseCommand('echo `date`');
    expect(result.hasSubshell).toBe(true);
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
    // bash-parser handles heredocs natively — no longer needs hasSubshell hack
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
});
