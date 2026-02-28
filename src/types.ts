export interface ParsedCommand {
  command: string;
  args: string[];
  envPrefixes: string[];
  raw: string;
}

export interface ParseResult {
  commands: ParsedCommand[];
  hasSubshell: boolean;
  subshellCommands: string[];
  parseError: boolean;
}

export type Decision = 'allow' | 'deny' | 'ask';

export interface MatchCondition {
  /** Regex patterns tested against the full argument string (joined with spaces) */
  argsMatch?: string[];
  /** Regex patterns tested against individual arguments */
  anyArgMatches?: string[];
  /** True if the command has no arguments */
  noArgs?: boolean;
  /** Argument count constraints */
  argCount?: { min?: number; max?: number };
  /** Negate the entire match */
  not?: boolean;
}

export interface ArgPattern {
  description?: string;
  decision: Decision;
  reason?: string;
  match: MatchCondition;
}

export interface CommandRule {
  command: string;
  default: Decision;
  argPatterns?: ArgPattern[];
}

export interface ConfigLayer {
  alwaysAllow: string[];
  alwaysDeny: string[];
  rules: CommandRule[];
}

export interface WardenConfig {
  layers: ConfigLayer[];
  trustedSSHHosts?: string[];
  trustedDockerContainers?: string[];
  trustedKubectlContexts?: string[];
  trustedSprites?: string[];
  trustedContextOverrides?: ConfigLayer;
  defaultDecision: Decision;
  askOnSubshell: boolean;
}

export interface EvalResult {
  decision: Decision;
  reason: string;
  details: CommandEvalDetail[];
}

export interface CommandEvalDetail {
  command: string;
  args: string[];
  decision: Decision;
  reason: string;
  matchedRule?: string;
}

export interface HookInput {
  session_id: string;
  hook_event_name: string;
  tool_name: string;
  tool_input: { command?: string; [key: string]: unknown };
  cwd: string;
  permission_mode: string;
}

export interface HookOutput {
  hookSpecificOutput?: {
    hookEventName: string;
    permissionDecision: Decision;
    permissionDecisionReason: string;
  };
  systemMessage?: string;
}
