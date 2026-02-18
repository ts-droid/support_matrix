#!/usr/bin/env bash
set -euo pipefail

branch="$(git rev-parse --abbrev-ref HEAD)"
message="${1:-Auto commit $(date '+%Y-%m-%d %H:%M:%S')}"

if [[ -z "$(git status --porcelain)" ]]; then
  echo "No changes to commit."
  exit 0
fi

git add -A
git commit -m "$message"
git push origin "$branch"

echo "Committed and pushed to $branch"
