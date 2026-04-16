import type { WardenConfig, EvalResult, CommandEvalDetail, SkillRule } from './types';
import { globToRegex } from './glob';
import { safeRegexTest } from './evaluator';

function skillMatchesName(skillName: string, pattern: string): boolean {
  return globToRegex(pattern).test(skillName);
}

export function evaluateSkill(skillName: string, args: string | undefined, config: WardenConfig): EvalResult {
  const detail = evaluateSkillDetail(skillName, args, config);
  return {
    decision: detail.decision,
    reason: detail.reason,
    details: [detail],
  };
}

function evaluateSkillDetail(skillName: string, args: string | undefined, config: WardenConfig): CommandEvalDetail {
  const { skillRules } = config;

  // 1. Check alwaysDeny → alwaysAllow per layer
  for (const layer of skillRules.layers) {
    if (layer.alwaysDeny.some(p => skillMatchesName(skillName, p))) {
      return {
        command: skillName,
        args: args ? [args] : [],
        decision: 'deny',
        reason: `Skill "${skillName}" is blocked`,
        matchedRule: 'alwaysDeny',
      };
    }
    if (layer.alwaysAllow.some(p => skillMatchesName(skillName, p))) {
      return {
        command: skillName,
        args: args ? [args] : [],
        decision: 'allow',
        reason: `Skill "${skillName}" is safe`,
        matchedRule: 'alwaysAllow',
      };
    }
  }

  // 2. Collect merged rules across layers
  const mergedRule = collectMergedSkillRule(skillName, skillRules.layers.map(l => l.rules));
  if (mergedRule) {
    return evaluateSkillRule(skillName, args, mergedRule);
  }

  // 3. Default
  return {
    command: skillName,
    args: args ? [args] : [],
    decision: skillRules.defaultDecision,
    reason: `No rule for skill "${skillName}"`,
    matchedRule: 'default',
  };
}

function collectMergedSkillRule(skillName: string, layerRules: SkillRule[][]): SkillRule | null {
  const matching: SkillRule[] = [];

  for (const rules of layerRules) {
    const rule = rules.find(r => skillMatchesName(skillName, r.skill));
    if (rule) {
      matching.push(rule);
      if (rule.override) break;
    }
  }

  if (matching.length === 0) return null;
  if (matching.length === 1) return matching[0];

  const mergedPatterns: SkillRule['argPatterns'] = [];
  for (const rule of matching) {
    if (rule.argPatterns) {
      mergedPatterns.push(...rule.argPatterns);
    }
  }

  return {
    skill: matching[0].skill,
    default: matching[0].default,
    argPatterns: mergedPatterns,
  };
}

function evaluateSkillRule(skillName: string, args: string | undefined, rule: SkillRule): CommandEvalDetail {
  const argsArray = args ? [args] : [];
  const argsJoined = args || '';

  for (const pattern of rule.argPatterns || []) {
    const m = pattern.match;
    let matched = true;

    if (m.noArgs !== undefined) {
      matched = matched && (m.noArgs === (!args));
    }

    if (m.argsMatch && matched) {
      matched = m.argsMatch.some(re => safeRegexTest(re, argsJoined));
    }

    if (m.anyArgMatches && matched) {
      matched = argsArray.some(arg => m.anyArgMatches!.some(re => safeRegexTest(re, arg)));
    }

    if (m.not) matched = !matched;

    if (matched) {
      return {
        command: skillName,
        args: argsArray,
        decision: pattern.decision,
        reason: pattern.reason || pattern.description || `Matched pattern for skill "${skillName}"`,
        matchedRule: `${skillName}:argPattern`,
      };
    }
  }

  return {
    command: skillName,
    args: argsArray,
    decision: rule.default,
    reason: `Default for skill "${skillName}"`,
    matchedRule: `${skillName}:default`,
  };
}
