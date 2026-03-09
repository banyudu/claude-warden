---
description: Allow a warden-blocked or flagged command by updating warden config
user_invocable: true
---

This command supports two modes:

## Mode 1: With arguments (e.g., `/warden:allow npx clawhub`)

Parse the argument to extract the command and optional sub-command:
- If a single word (e.g., `/warden:allow npx`): allow the entire command.
- If multiple words (e.g., `/warden:allow npx clawhub`): the first word is the command, the second is the sub-command. Ask the user which option they prefer:

  **Option A — Allow all `<command>`**: Adds a rule with `default: allow` for the entire command.
  ```yaml
  rules:
    - command: "<command>"
      default: allow
  ```

  **Option B — Allow only `<command> <subcommand>`**: Adds an argPattern rule that only allows the specific sub-command while keeping the default as `ask`.
  ```yaml
  rules:
    - command: "<command>"
      default: ask
      argPatterns:
        - match:
            anyArgMatches: ['^<subcommand>$']
          decision: allow
          description: Allow <command> <subcommand>
  ```

After the user picks an option, proceed to apply the YAML snippet (see "Applying the config" below).

## Mode 2: No arguments (e.g., `/warden:allow`)

Look at the most recent warden block or flagged message in the conversation. It should contain either:
- A YAML snippet showing how to allow the blocked/flagged command, or
- Option A / Option B suggestions for allowing the command

If the message shows both options (Option A for the full command, Option B for a specific sub-command), ask the user which they prefer. Otherwise, use the snippet provided.

## Applying the config

Apply the chosen YAML snippet to the appropriate warden config file:

- **Project-level** (recommended for project-specific commands): `.claude/warden.yaml`
- **User-level** (for commands you want to allow everywhere): `~/.claude/warden.yaml`

If the config file doesn't exist yet, create it with just the snippet content. If it already exists, merge the snippet into the existing config:
- For `alwaysAllow`: append to the existing array, avoiding duplicates.
- For `rules`: if a rule for the same command already exists, merge `argPatterns` into it (append new patterns, avoid duplicates by checking the `anyArgMatches` value). If no rule exists for the command, add the new rule entry.

Ask the user which scope (project or user) they prefer if it's not obvious from context.
