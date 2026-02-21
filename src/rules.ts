import { readFileSync, existsSync } from 'fs';
import { parse as parseYaml } from 'yaml';
import { homedir } from 'os';
import { join } from 'path';
import type { WardenConfig } from './types';
import { DEFAULT_CONFIG } from './defaults';

const USER_CONFIG_PATHS = [
  join(homedir(), '.claude', 'warden.yaml'),
  join(homedir(), '.claude', 'warden.json'),
];

const PROJECT_CONFIG_NAMES = [
  '.claude/warden.yaml',
  '.claude/warden.json',
];

export function loadConfig(cwd?: string): WardenConfig {
  const config = structuredClone(DEFAULT_CONFIG);

  // Load user-level config
  for (const configPath of USER_CONFIG_PATHS) {
    if (tryMergeConfigFile(config, configPath)) break;
  }

  // Load project-level config (overrides user-level)
  if (cwd) {
    for (const name of PROJECT_CONFIG_NAMES) {
      if (tryMergeConfigFile(config, join(cwd, name))) break;
    }
  }

  return config;
}

function tryMergeConfigFile(config: WardenConfig, filePath: string): boolean {
  if (!existsSync(filePath)) return false;

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = filePath.endsWith('.yaml') || filePath.endsWith('.yml')
      ? parseYaml(raw)
      : JSON.parse(raw);

    if (parsed && typeof parsed === 'object') {
      mergeConfig(config, parsed);
      return true;
    }
  } catch {
    // Skip invalid config files silently
  }
  return false;
}

function mergeConfig(base: WardenConfig, override: Partial<WardenConfig>): void {
  if (override.alwaysAllow) {
    base.alwaysAllow = [...(base.alwaysAllow || []), ...override.alwaysAllow];
  }
  if (override.alwaysDeny) {
    base.alwaysDeny = [...(base.alwaysDeny || []), ...override.alwaysDeny];
  }
  if (override.globalDeny) {
    base.globalDeny = [...(base.globalDeny || []), ...override.globalDeny];
  }
  if (override.trustedSSHHosts) {
    base.trustedSSHHosts = [...(base.trustedSSHHosts || []), ...override.trustedSSHHosts];
  }
  if (override.trustedDockerContainers) {
    base.trustedDockerContainers = [...(base.trustedDockerContainers || []), ...override.trustedDockerContainers];
  }
  if (override.trustedKubectlContexts) {
    base.trustedKubectlContexts = [...(base.trustedKubectlContexts || []), ...override.trustedKubectlContexts];
  }
  if (override.trustedSprites) {
    base.trustedSprites = [...(base.trustedSprites || []), ...override.trustedSprites];
  }
  if (override.defaultDecision) {
    base.defaultDecision = override.defaultDecision;
  }
  if (override.askOnSubshell !== undefined) {
    base.askOnSubshell = override.askOnSubshell;
  }

  // User rules override defaults by command name
  if (override.rules) {
    for (const userRule of override.rules) {
      const idx = base.rules.findIndex(r => r.command === userRule.command);
      if (idx >= 0) {
        base.rules[idx] = userRule;
      } else {
        base.rules.push(userRule);
      }
    }
  }
}
