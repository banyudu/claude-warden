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

function convertCommand(node: CommandNode): ParsedCommand | null {
  if (!node.name) return null;

  const command = node.name.text.includes('/')
    ? basename(node.name.text)
    : node.name.text;

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

  return { command, args, envPrefixes, raw };
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
export function parseCommand(input: string): ParseResult {
  if (!input || !input.trim()) {
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: false };
  }

  // Detect heredocs before parsing — bash-parser misparses heredoc body as commands.
  // Pre-strip heredoc content and only parse the command portion.
  const hasHeredoc = HEREDOC_REGEX.test(input);
  if (hasHeredoc) {
    // Extract just the first line (the actual command before the heredoc)
    const firstLine = input.split('\n')[0];
    const cmdPart = firstLine.replace(/<<-?\s*['"]?\w+['"]?.*$/, '').trim();
    if (!cmdPart) {
      return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
    }
    try {
      const ast = parse(cmdPart) as ScriptNode;
      const result: WalkResult = { commands: [], hasSubshell: false, subshellCommands: [] };
      for (const cmd of ast.commands) {
        walkNode(cmd, result);
      }
      // Heredocs are complex — flag as hasSubshell so evaluator can decide
      return { commands: result.commands, hasSubshell: true, subshellCommands: result.subshellCommands, parseError: false };
    } catch {
      return { commands: [], hasSubshell: true, subshellCommands: [], parseError: true };
    }
  }

  try {
    const ast = parse(input) as ScriptNode;
    const result: WalkResult = { commands: [], hasSubshell: false, subshellCommands: [] };

    for (const cmd of ast.commands) {
      walkNode(cmd, result);
    }

    return { commands: result.commands, hasSubshell: result.hasSubshell, subshellCommands: result.subshellCommands, parseError: false };
  } catch {
    // Parse failure — return parseError so evaluator returns 'ask'
    return { commands: [], hasSubshell: false, subshellCommands: [], parseError: true };
  }
}
