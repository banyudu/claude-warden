---
description: Release a new version with changelog and GitHub release. Accepts optional argument: patch, minor, or major.
user_invocable: true
---

# Release Skill

When invoked, perform a versioned release of claude-warden with changelog updates and a GitHub release.

## Constraints

- **Shell tooling**: don't use `grep` or `find -name` in Bash — the repo's own `enforce_rg_over_grep.py` PreToolUse hook blocks them. Use `rg` (ripgrep), `rg --files -g <pattern>`, or the Grep/Glob tools. Avoid the strings `grep` / `find -name` even in commit messages, since the hook matches on the command string.
- **`main` is protected**: direct `git push origin main` is rejected. Every change (including the version bump) must land via a release branch + PR.
- **Publishing is CI-driven**: the `auto-release.yml` workflow creates the tag, GitHub release, and npm publish once a `chore: release v<version>` commit lands on `main`. Do **not** run `pnpm publish` / `npm publish` locally, and don't create the GitHub release by hand — that races with CI and can leave the package half-published.

## Steps

### 1. Sync with remote

Before anything else, pull the latest changes from the remote main branch:

```
git pull --rebase
```

This ensures the changelog and version bump account for all merged changes, not just local commits.

### 2. Determine version bump

If the user provided an argument (`patch`, `minor`, or `major`), use that.

If no argument is provided, auto-decide based on commits since the last tag:
- If any commit has a `feat:` or `feat(` prefix → **minor**
- Otherwise → **patch**
- **NEVER auto-select `major`** — major version bumps must always be explicitly requested by the user

### 3. Generate changelog entry

Compare the current HEAD against the last git tag to find all commits since the last release:

```
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

Group commits by type based on conventional commit prefixes:
- **Features** — `feat:` commits
- **Bug Fixes** — `fix:` commits
- **Other Changes** — everything else (`chore:`, `refactor:`, `docs:`, etc.)

Skip empty sections. Format each entry as `- <commit message> (<short hash>)`.

### 4. Update CHANGELOG.md

Read the existing `CHANGELOG.md` (create it if missing). Insert the new version entry at the top, right after the `# Changelog` header. Use this format:

```markdown
## [<new-version>] - <YYYY-MM-DD>

### Features
- commit message (abc1234)

### Bug Fixes
- commit message (def5678)

### Other Changes
- commit message (ghi9012)
```

### 5. Build and test

1. `pnpm version <bump> --no-git-tag-version` — bump version
2. `pnpm run sync-plugin-version` — sync plugin.json version
3. `pnpm run build` — build
4. `pnpm run test` — run tests

### 6. Create release PR

Since `main` has branch protection, push via a release branch:

1. `git checkout -b release/v<version>`
2. Stage changes: `git add package.json .claude-plugin/plugin.json CHANGELOG.md dist/` plus any new files (e.g. `vitest.config.ts`). Use `git add -f` for gitignored paths like `.claude/`.
3. Commit with message: `chore: release v<version>` — this exact format triggers the auto-release CI workflow.
4. Push: `git push -u origin release/v<version>`
5. Create PR: `gh pr create --title "chore: release v<version>" --body "<changelog>" --base main`

**After the PR is merged**, CI automatically:
- Creates the git tag `v<version>`
- Creates the GitHub release with changelog notes
- Publishes to npm via the existing publish workflow

### 7. Report

Tell the user the PR is created. Once merged, the release will be published automatically.

After merge, you can optionally watch the release workflows:

```
gh run list --workflow=auto-release.yml --limit 1
gh run list --workflow=publish.yml --limit 1
```

If `publish.yml` fails, consult `CLAUDE.md` → "Publish workflow gotchas" (trusted-publisher OIDC needs `npx -y npm@11.5.1 publish`; re-running requires `gh release delete vX.Y.Z --yes --cleanup-tag`).
