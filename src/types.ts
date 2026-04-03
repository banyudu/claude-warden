export interface ParsedCommand {
  command: string;
  originalCommand: string;
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
  /** When true, this rule completely replaces lower-layer rules instead of merging with them. */
  override?: boolean;
}

export interface ConfigLayer {
  alwaysAllow: string[];
  alwaysDeny: string[];
  rules: CommandRule[];
}

export interface TrustedTarget {
  name: string;
  allowAll?: boolean;
  overrides?: ConfigLayer;
}

// Remote contexts — extends TrustedTarget with a discriminator
export type RemoteContext = 'ssh' | 'docker' | 'kubectl' | 'sprite' | 'fly';

export interface TrustedRemote extends TrustedTarget {
  context: RemoteContext;
}

// Data targets — discriminated union
export type TargetPolicy = PathPolicy | DatabasePolicy | EndpointPolicy;

interface TargetPolicyBase {
  commands?: string[];
  decision: Decision;
  reason?: string;
  allowAll?: boolean;
}

export interface PathPolicy extends TargetPolicyBase {
  type: 'path';
  path: string;
  recursive?: boolean;
}

export interface DatabasePolicy extends TargetPolicyBase {
  type: 'database';
  host: string;
  port?: number;
  database?: string;
}

export interface EndpointPolicy extends TargetPolicyBase {
  type: 'endpoint';
  pattern: string;
}

export interface WardenConfig {
  layers: ConfigLayer[];
  trustedRemotes?: TrustedRemote[];
  targetPolicies?: TargetPolicy[];
  trustedContextOverrides?: ConfigLayer;
  defaultDecision: Decision;
  askOnSubshell: boolean;
  notifyOnAsk: boolean;
  notifyOnDeny: boolean;
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
  permission_mode:
    | 'default'
    | 'plan'
    | 'acceptEdits'
    | 'auto'
    | 'dontAsk'
    | 'bypassPermissions';
}

export interface HookOutput {
  hookSpecificOutput?: {
    hookEventName: string;
    permissionDecision: Decision;
    permissionDecisionReason: string;
  };
  systemMessage?: string;
}
