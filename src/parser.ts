import parse from 'bash-parser';
import { basename } from 'path';
import type { ParsedCommand, ParseResult } from './types';

interface AstNode {
  type: string;
  [key: string]: unknown;
}

interface WordNode extends AstNode {
  type: 'Word';
  text: string;
  expansion?: ExpansionNode[];
}

interface AssignmentNode extends AstNode {
  type: 'AssignmentWord';
  text: string;
}

interface ExpansionNode extends AstNode {
  type: 'CommandExpansion' | 'ParameterExpansion' | 'ArithmeticExpansion';
  command?: string;
}

interface CommandNode extends AstNode {
  type: 'Command';
  name?: WordNode;
  prefix?: (AssignmentNode | AstNode)[];
  suffix?: (WordNode | AstNode)[];
}

interface PipelineNode extends AstNode {
  type: 'Pipeline';
  commands: AstNode[];
}

interface LogicalExpressionNode extends AstNode {
  type: 'LogicalExpression';
  op: 'and' | 'or';
  left: AstNode;
  right: AstNode;
}

interface SubshellNode extends AstNode {
  type: 'Subshell';
  list: { type: 'CompoundList'; commands: AstNode[] };
}

interface ScriptNode extends AstNode {
  type: 'Script';
  commands: AstNode[];
}

interface WalkResult {
  commands: ParsedCommand[];
  hasSubshell: boolean;
  subshellCommands: string[];
}

const HEREDOC_REGEX = /<<-?\s*['"]?\w+['"]?/;

/**
 * Replace $(cat <<MARKER...MARKER) patterns with a placeholder string.
 * This handles the common idiom of passing multi-line text via heredoc,
 * which is just string interpolation — not arbitrary command execution.
 */
function preprocessCatHeredocs(input: string): string {
  // Match $(cat <<[-]?['"]?MARKER['"]?\n...MARKER\n) patterns
  const regex = /\$\(cat\s+<<-?\s*['"]?(\w+)['"]?\n([\s\S]*?)\n\1\s*\)/g;
  return input.replace(regex, '__HEREDOC_TEXT__');
}

/**
 * Quote unquoted parentheses in path-like tokens so bash-parser doesn't
 * choke on them. Targets patterns like `foo/(bar)/baz` where parens are
 * clearly part of a file path (e.g. Next.js route groups).
 *
 * Strategy: find unquoted tokens that contain `/` adjacent to `(` or `)`,
 * and wrap the entire token in double quotes.
 */
function preprocessPathParentheses(input: string): string {
  // Split into segments respecting quotes — we only touch unquoted parts
  const result: string[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    // Preserve quoted strings as-is
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < input.length && input[j] !== quote) {
        if (input[j] === '\\' && quote === '"') j++; // skip escaped char in double quotes
        j++;
      }
      result.push(input.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // Preserve $(...) as-is (command substitution)
    if (ch === '$' && i + 1 < input.length && input[i + 1] === '(') {
      let depth = 1;
      let j = i + 2;
      while (j < input.length && depth > 0) {
        if (input[j] === '(') depth++;
        else if (input[j] === ')') depth--;
        if (depth > 0) j++;
      }
      result.push(input.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    // Collect an unquoted token (non-whitespace, non-shell-operator segment)
    if (ch !== ' ' && ch !== '\t' && ch !== '\n') {
      let j = i;
      while (j < input.length && !' \t\n'.includes(input[j]) && input[j] !== '"' && input[j] !== "'" && !(input[j] === '$' && j + 1 < input.length && input[j + 1] === '(')) {
        j++;
      }
      const token = input.slice(i, j);
      // Quote if it looks like a path with parentheses: contains / and ( or )
      if (token.includes('/') && /[()]/.test(token) && !/^[<>|;&]/.test(token)) {
        result.push('"' + token + '"');
      } else {
        result.push(token);
      }
      i = j;
      continue;
    }
    result.push(ch);
    i++;
  }
  return result.join('');
}

function convertCommand(node: CommandNode): ParsedCommand | null {
  if (!node.name) return null;

  const originalCommand = node.name.text;
  const command = originalCommand.includes('/')
    ? basename(originalCommand)
    : originalCommand;

  const envPrefixes: string[] = [];
  if (node.prefix) {
    for (const p of node.prefix) {
      if (p.type === 'AssignmentWord') {
        envPrefixes.push((p as AssignmentNode).text);
      }
    }
  }

  const args: string[] = [];
  if (node.suffix) {
    for (const s of node.suffix) {
      if (s.type === 'Word') {
        args.push((s as WordNode).text);
      }
      // Skip redirect operators (type: 'dless', etc.)
    }
  }

  // Reconstruct raw from parts
  const rawParts = [
    ...envPrefixes,
    node.name.text,
    ...args,
  ];
  const raw = rawParts.join(' ');

  return { command, originalCommand, args, envPrefixes, raw };
}

function collectCommandExpansions(node: AstNode): string[] {
  const commands: string[] = [];

  if (node.type === 'Command') {
    const cmd = node as CommandNode;
    if (cmd.suffix) {
      for (const s of cmd.suffix) {
        if (s.type === 'Word' && (s as WordNode).expansion) {
          for (const exp of (s as WordNode).expansion!) {
            if (exp.type === 'CommandExpansion' && exp.command) {
              commands.push(exp.command);
            }
          }
        }
      }
    }
    if (cmd.name?.expansion) {
      for (const exp of cmd.name.expansion) {
        if (exp.type === 'CommandExpansion' && exp.command) {
          commands.push(exp.command);
        }
      }
    }
  }

  return commands;
}

function walkNode(node: AstNode, result: WalkResult): void {
  switch (node.type) {
    case 'Command': {
      const cmd = node as CommandNode;

      // Check for command substitutions
      const expansions = collectCommandExpansions(node);
      if (expansions.length > 0) {
        result.hasSubshell = true;
        result.subshellCommands.push(...expansions);
      }

      const parsed = convertCommand(cmd);
      if (!parsed) break;

      // Handle sh/bash/zsh -c "..." — recursively parse inner command
      if (
        (parsed.command === 'sh' || parsed.command === 'bash' || parsed.command === 'zsh') &&
        parsed.args.length >= 2 &&
        parsed.args[0] === '-c'
      ) {
        const innerResult = parseCommand(parsed.args[1]);
        if (innerResult.parseError) {
          result.commands.push(parsed); // fallback to the raw sh -c command
        } else {
          result.commands.push(...innerResult.commands);
          if (innerResult.hasSubshell) {
            result.hasSubshell = true;
          }
          result.subshellCommands.push(...innerResult.subshellCommands);
        }
      } else {
        result.commands.push(parsed);
      }
      break;
    }

    case 'Pipeline': {
      const pipeline = node as PipelineNode;
      for (const cmd of pipeline.commands) {
        walkNode(cmd, result);
      }
      break;
    }

    case 'LogicalExpression': {
      const logical = node as LogicalExpressionNode;
      walkNode(logical.left, result);
      walkNode(logical.right, result);
      break;
    }

    case 'Subshell': {
      result.hasSubshell = true;
      const subshell = node as SubshellNode;
      if (subshell.list?.commands) {
        for (const cmd of subshell.list.commands) {
          walkNode(cmd, result);
        }
      }
      break;
    }

    // Complex constructs — flag as subshell for safety
    case 'If':
    case 'For':
    case 'While':
    case 'Until':
    case 'Case':
    case 'Function':
      result.hasSubshell = true;
      break;

    default:
      break;
  }
}

/**
 * Parse a full shell command string into individual commands.
 */
/**
 * Check if a Command node contains a heredoc redirect (suffix with type 'dless').
 */
function hasHeredocRedirect(node: CommandNode): boolean {
  if (!node.suffix) return false;
  return node.suffix.some(s => s.type === 'dless' || s.type === 'dlessdash');
}

/**
 * Parse a full shell command string into individual commands.
 */
/**
 * Check if any top-level Command node in the AST has a heredoc redirect.
 * Skips expansion/commandAST children — heredocs inside $() are handled
 * correctly by bash-parser and don't cause misparse of body lines.
 */
function astHasHeredoc(ast: ScriptNode): boolean {
  function check(node: AstNode): boolean {
    if (node.type === 'Command') {
      if (hasHeredocRedirect(node as CommandNode)) return true;
    }
    // Recurse into child nodes, but skip commandAST inside expansions
    for (const [key, value] of Object.entries(node)) {
      if (key === 'commandAST' || key === 'expansion') continue;
      if (Array.isArray(value)) {
        for (const child of value) {
          if (child && typeof child === 'object' && 'type' in child && check(child as AstNode)) return true;
        }
      } else if (value && typeof value === 'object' && 'type' in (value as object)) {
        if (check(value as AstNode)) return true;
      }
    }
    return false;
  }
  for (const cmd of ast.commands) {
    if (check(cmd)) return true;
  }
  return false;
}

export function parseCommand(input: string): ParseResult {
  if (!input || !input.trim()) {
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: false };
  }

  // Preprocess $(cat <<MARKER...MARKER) patterns — these are just multi-line
  // string interpolation, not arbitrary subshells. Replace with placeholder text
  // so the parser sees clean commands (e.g. `gh pr create --body "__HEREDOC_TEXT__"`).
  input = preprocessCatHeredocs(input);

  // Quote unquoted parentheses in path-like tokens (e.g. Next.js route groups)
  input = preprocessPathParentheses(input);

  try {
    const ast = parse(input) as ScriptNode;
    const result: WalkResult = { commands: [], hasSubshell: false, subshellCommands: [] };

    // Check if the AST contains actual heredoc redirects (dless/dlessdash).
    // bash-parser misparses heredoc body lines as separate commands, so we
    // need to fall back to first-line extraction for real heredocs.
    if (astHasHeredoc(ast)) {
      const firstLine = input.split('\n')[0];
      const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, '').trim();
      if (!cmdPart) {
        return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
      }
      try {
        const cmdAst = parse(cmdPart) as ScriptNode;
        for (const cmd of cmdAst.commands) {
          walkNode(cmd, result);
        }
        // Heredoc body is stdin data, not code — only flag hasSubshell if the
        // command itself contains subshells (e.g. command substitutions on the first line).
        return { commands: result.commands, hasSubshell: result.hasSubshell, subshellCommands: result.subshellCommands, parseError: false };
      } catch {
        return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
      }
    }

    // No heredoc nodes — normal AST walking, no false positive
    for (const cmd of ast.commands) {
      walkNode(cmd, result);
    }

    return { commands: result.commands, hasSubshell: result.hasSubshell, subshellCommands: result.subshellCommands, parseError: false };
  } catch {
    // Parse failure — use regex fallback for heredoc detection
    if (HEREDOC_REGEX.test(input)) {
      const firstLine = input.split('\n')[0];
      const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, '').trim();
      if (!cmdPart) {
        return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
      }
      try {
        const ast = parse(cmdPart) as ScriptNode;
        const result: WalkResult = { commands: [], hasSubshell: false, subshellCommands: [] };
        for (const cmd of ast.commands) {
          walkNode(cmd, result);
        }
        return { commands: result.commands, hasSubshell: result.hasSubshell, subshellCommands: result.subshellCommands, parseError: false };
      } catch {
        return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
      }
    }
    // General parse failure — try regex fallback to extract at least the command name
    // so the evaluator can still apply rules (e.g. gh is default allow).
    // This handles cases where bash-parser chokes on special characters in arguments
    // (like $ in double-quoted strings that aren't actual expansions).
    // TODO(#30): Improve fallback — consider pre-processing $ patterns or using a more robust parser.
    const fallback = regexFallbackParse(input);
    if (fallback) {
      return { commands: [fallback], hasSubshell: false, subshellCommands: [], parseError: false };
    }
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
  }
}

/**
 * Regex-based fallback parser for when bash-parser fails.
 * Extracts the command name and arguments from simple single commands.
 * Only handles straightforward cases — returns null for pipes, chains, etc.
 *
 * TODO(#30): This is a basic fallback with known limitations:
 * - Does not handle pipes, chains (&&, ||), or semicolons
 * - Naive argument tokenization — doesn't handle all shell quoting edge cases
 * - Does not detect subshells or command substitutions
 */
function regexFallbackParse(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Don't attempt fallback for pipes, chains, or semicolons (too complex)
  // Check outside of quotes
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === '\\' && inDouble) { i++; continue; }
    if (ch === "'" && !inDouble) { inSingle = !inSingle; continue; }
    if (ch === '"' && !inSingle) { inDouble = !inDouble; continue; }
    if (!inSingle && !inDouble && (ch === '|' || ch === ';' || (ch === '&' && trimmed[i + 1] === '&'))) {
      return null; // Too complex for fallback
    }
  }

  // Skip env prefixes (VAR=value)
  const envPrefixes: string[] = [];
  let rest = trimmed;
  while (/^[A-Za-z_][A-Za-z0-9_]*=/.test(rest)) {
    const match = rest.match(/^([A-Za-z_][A-Za-z0-9_]*=\S*)\s*/);
    if (!match) break;
    envPrefixes.push(match[1]);
    rest = rest.slice(match[0].length);
  }

  if (!rest) return null;

  // Extract command (first token)
  const cmdMatch = rest.match(/^(\S+)/);
  if (!cmdMatch) return null;

  const originalCommand = cmdMatch[1];
  const command = originalCommand.includes('/') ? basename(originalCommand) : originalCommand;
  const argsStr = rest.slice(cmdMatch[0].length).trim();

  // Tokenize args respecting quotes
  const args: string[] = [];
  let current = '';
  let qSingle = false;
  let qDouble = false;
  for (let i = 0; i < argsStr.length; i++) {
    const ch = argsStr[i];
    if (ch === '\\' && qDouble && i + 1 < argsStr.length) {
      current += argsStr[++i];
      continue;
    }
    if (ch === "'" && !qDouble) { qSingle = !qSingle; continue; }
    if (ch === '"' && !qSingle) { qDouble = !qDouble; continue; }
    if (!qSingle && !qDouble && /\s/.test(ch)) {
      if (current) { args.push(current); current = ''; }
      continue;
    }
    current += ch;
  }
  if (current) args.push(current);

  return { command, originalCommand, args, envPrefixes, raw: trimmed };
}
