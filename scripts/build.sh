#!/bin/bash
set -e

# Usage: ./scripts/build.sh <project-name> [local-repo-path]
# Example: ./scripts/build.sh zero-qa
# Example: ./scripts/build.sh zero-qa /home/fanrui/code/zero-qa

PROJECT=${1:?Usage: ./scripts/build.sh <project-name> [local-repo-path]}
LOCAL_REPO=${2:-}
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_CONFIG="$ROOT_DIR/projects/${PROJECT}.json"

if [ ! -f "$PROJECT_CONFIG" ]; then
  echo "Error: Project config not found: $PROJECT_CONFIG"
  exit 1
fi

DOCS_DIR=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$PROJECT_CONFIG','utf8')).docsDir)")

# Isolate docs source per project so multiple projects can run simultaneously
# (e.g. previewing all sites at once after a theme change)
DOCS_SRC="$ROOT_DIR/.docs-src/${PROJECT}"
rm -rf "$DOCS_SRC"
mkdir -p "$DOCS_SRC"

# Symlink .vitepress into docs source
ln -sf "$ROOT_DIR/.vitepress" "$DOCS_SRC/.vitepress"

if [ -n "$LOCAL_REPO" ]; then
  cp "$LOCAL_REPO/$DOCS_DIR"/*.md "$DOCS_SRC/"
  echo "Using local docs from: $LOCAL_REPO/$DOCS_DIR"
else
  REPO=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$PROJECT_CONFIG','utf8')).repo)")
  TEMP_DIR="$ROOT_DIR/.docs-src/${PROJECT}/repo"
  git clone --depth 1 "$REPO" "$TEMP_DIR"
  cp "$TEMP_DIR/$DOCS_DIR"/*.md "$DOCS_SRC/"
  rm -rf "$TEMP_DIR"
  echo "Using remote docs from: $REPO"
fi

# Copy first doc as index.md so homepage shows first doc directly
FIRST_DOC=$(node -e "const c=JSON.parse(require('fs').readFileSync('$PROJECT_CONFIG','utf8'));const l=c.sidebar?.[0]?.items?.[0]?.link||'';console.log(l.replace(/^\//,''))")
if [ -f "$DOCS_SRC/${FIRST_DOC}.md" ]; then
  cp "$DOCS_SRC/${FIRST_DOC}.md" "$DOCS_SRC/index.md"
fi

# Build
echo "Building docs for: $PROJECT"
cd "$ROOT_DIR"
PROJECT=$PROJECT npx vitepress build ".docs-src/${PROJECT}"

echo ""
echo "Build complete! Output in: .docs-src/${PROJECT}/.vitepress/dist"
echo "Preview with: PROJECT=$PROJECT npx vitepress preview \".docs-src/${PROJECT}\""
