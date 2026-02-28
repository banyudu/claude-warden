#!/usr/bin/env bash
set -euo pipefail

BUMP="${1:-patch}"

case "$BUMP" in
  patch|minor|major) ;;
  *) echo "Usage: $0 [patch|minor|major] (default: patch)" && exit 1 ;;
esac

pnpm version "$BUMP" --no-git-tag-version
VERSION=$(jq -r .version package.json)

pnpm run sync-plugin-version
pnpm run build
pnpm run test

git add -A
git commit -m "$VERSION"
git tag "v$VERSION"
git push
git push --tags
pnpm publish --no-git-checks

echo "Released v$VERSION"
