---
description: Commit, push, and release a new version (npm publish + GitHub release)
user_invocable: true
---

Perform the full release workflow for claude-warden:

## Steps

1. **Check for changes**: Run `git status` and `git diff`. If there are uncommitted changes, commit them with an appropriate conventional commit message.

2. **Determine version bump**: Look at the commits since the last release tag to decide the bump type:
   - `fix:` commits → patch bump
   - `feat:` commits → minor bump
   - Breaking changes → major bump
   - If unsure, ask the user which version bump they want (patch/minor/major).

3. **Bump version**: Update `version` in `package.json` (and `.claude-plugin/plugin.json` if it has a version field). Do NOT run `npm version` — just edit the files directly.

4. **Build**: Run `pnpm run build` to produce `dist/index.cjs`.

5. **Commit version bump**: Stage all changes and commit with message `<new-version>` (e.g., `1.8.3`).

6. **Push**: Run `git push origin main`.

7. **Create GitHub release**: Run `gh release create v<new-version> --title "v<new-version>" --notes "<changelog>"`. Generate the changelog from commits since the last release tag.

8. **Publish to npm**: Run `pnpm publish --access public --no-git-checks`.

9. **Report**: Show the user the new version, GitHub release URL, and npm package URL.
