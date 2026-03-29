#!/bin/bash
set -e

# Usage: ./scripts/build.sh <project-name> [local-repo-path]
# Example: ./scripts/build.sh agents-sandbox /home/fanrui/code/agents-sandbox
# Example: ./scripts/build.sh agents-sandbox   (clones from github.com/1996fanrui/<project-name>)
#
# Convention: the target project must have docs/theme.json at the root of its docs directory.

PROJECT=${1:?Usage: ./scripts/build.sh <project-name> [local-repo-path]}
LOCAL_REPO=${2:-}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Isolate docs source per project so multiple projects can run simultaneously
DOCS_SRC="$ROOT_DIR/.docs-src/${PROJECT}"
rm -rf "$DOCS_SRC"
mkdir -p "$DOCS_SRC"

# Symlink .vitepress into docs source
ln -sf "$ROOT_DIR/.vitepress" "$DOCS_SRC/.vitepress"

if [ -n "$LOCAL_REPO" ]; then
  echo "Using local docs from: $LOCAL_REPO"
else
  REPO="https://github.com/1996fanrui/${PROJECT}.git"
  LOCAL_REPO="$DOCS_SRC/repo"
  git clone --depth 1 "$REPO" "$LOCAL_REPO"
  echo "Using remote docs from: $REPO"
fi

THEME_JSON="$LOCAL_REPO/docs/theme.json"
if [ ! -f "$THEME_JSON" ]; then
  echo "Error: docs/theme.json not found in project repo: $THEME_JSON"
  exit 1
fi

# Copy theme config so vitepress config can read it at .docs-src/<project>/theme.json
cp "$THEME_JSON" "$DOCS_SRC/theme.json"

DOCS_DIR=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$THEME_JSON','utf8')).docsDir)")
cp "$LOCAL_REPO/$DOCS_DIR"/*.md "$DOCS_SRC/"

# Copy first doc as index.md so homepage shows first doc directly
FIRST_DOC=$(node -e "const c=JSON.parse(require('fs').readFileSync('$THEME_JSON','utf8'));const l=c.sidebar?.[0]?.items?.[0]?.link||'';console.log(l.replace(/^\//,''))")
if [ -f "$DOCS_SRC/${FIRST_DOC}.md" ]; then
  cp "$DOCS_SRC/${FIRST_DOC}.md" "$DOCS_SRC/index.md"
fi

# Clean up cloned repo if we did a remote clone
if [ "$LOCAL_REPO" = "$DOCS_SRC/repo" ]; then
  rm -rf "$LOCAL_REPO"
fi

# Build
echo "Building docs for: $PROJECT"
cd "$ROOT_DIR"
PROJECT=$PROJECT npx vitepress build ".docs-src/${PROJECT}"

echo ""
echo "Build complete! Output in: .docs-src/${PROJECT}/.vitepress/dist"
echo "Preview with: PROJECT=$PROJECT npx vitepress preview \".docs-src/${PROJECT}\""
