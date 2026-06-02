#!/bin/bash
set -euo pipefail

BLOG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-${BLOG_DIR}/../leetcode-patterns}"
TARGET_DIR="${TARGET_DIR:-${BLOG_DIR}/static/leetcode-patterns}"
NODE_BIN="${NODE_BIN:-$HOME/.nvm/versions/node/v24.11.1/bin}"

if [[ ! -d "$APP_DIR" ]]; then
  echo "Missing LeetCode Patterns app at $APP_DIR"
  exit 1
fi

PATH="$NODE_BIN:$PATH" \
  NEXT_PUBLIC_BASE_PATH=/leetcode-patterns \
  NEXT_PUBLIC_SITE_URL=https://justinmathew.com/leetcode-patterns \
  npm --prefix "$APP_DIR" run build
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
cp -a "$APP_DIR/out/." "$TARGET_DIR/"

echo "Copied LeetCode Patterns static export to $TARGET_DIR"
