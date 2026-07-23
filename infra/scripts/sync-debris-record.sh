#!/usr/bin/env bash

set -euo pipefail

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repository_root="$(cd "$script_directory/../.." && pwd)"
content_path="${DEBRIS_RECORD_PATH:-$repository_root/content/debris-record}"
repository_url="${DEBRIS_RECORD_REPOSITORY:-git@github.com:wanglufei-567/DebrisRecord.git}"

if [[ -d "$content_path/.git" ]]; then
  git -C "$content_path" pull --ff-only
  exit 0
fi

if [[ -e "$content_path" ]]; then
  printf '内容路径已经存在但不是 Git 仓库: %s\n' "$content_path" >&2
  exit 1
fi

mkdir -p "$(dirname "$content_path")"
git clone "$repository_url" "$content_path"
