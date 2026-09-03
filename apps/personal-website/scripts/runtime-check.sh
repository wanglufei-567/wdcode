#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"

IMAGE_NAME="wdcode/personal-web:runtime-check"
CONTAINER_NAME="wdcode-personal-runtime-check"
TARGET_PLATFORM="${RUNTIME_CHECK_PLATFORM:-linux/amd64}"
CONTENT_DIR="${DEBRIS_RECORD_PATH:-$REPO_ROOT/content/debris-record}"

cleanup() {
  if docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
    docker stop "$CONTAINER_NAME" >/dev/null
    docker container rm "$CONTAINER_NAME" >/dev/null
  fi

  if docker image inspect "$IMAGE_NAME" >/dev/null 2>&1; then
    docker image rm "$IMAGE_NAME" >/dev/null
  fi
}

require_healthy_container() {
  local health_status=""

  for _ in {1..30}; do
    health_status="$(docker inspect --format '{{.State.Health.Status}}' "$CONTAINER_NAME")"

    if [[ "$health_status" == "healthy" ]]; then
      return
    fi

    if [[ "$health_status" == "unhealthy" ]]; then
      docker logs "$CONTAINER_NAME"
      return 1
    fi

    sleep 1
  done

  docker logs "$CONTAINER_NAME"
  echo "Runtime check timed out while waiting for a healthy container" >&2
  return 1
}

docker info >/dev/null

if [[ ! -d "$CONTENT_DIR/.git" ]]; then
  echo "DebrisRecord checkout not found: $CONTENT_DIR" >&2
  exit 1
fi

cleanup
trap cleanup EXIT

docker compose \
  --env-file "$REPO_ROOT/infra/.env.example" \
  -f "$REPO_ROOT/infra/compose/compose.production.yml" \
  config --quiet

docker run --rm \
  --volume "$REPO_ROOT/infra/caddy/Caddyfile:/etc/caddy/Caddyfile:ro" \
  caddy:2.11.4-alpine \
  caddy validate --config /etc/caddy/Caddyfile

docker build \
  --platform "$TARGET_PLATFORM" \
  --file "$APP_DIR/Dockerfile" \
  --tag "$IMAGE_NAME" \
  "$REPO_ROOT"

docker run \
  --detach \
  --name "$CONTAINER_NAME" \
  --volume "$CONTENT_DIR:/srv/notes:ro" \
  "$IMAGE_NAME" >/dev/null

require_healthy_container

docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/notes
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/notes/regression/deep-link.md
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/works
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/works/sql-editor
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/works/flowlyte
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/works/content-agent
docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/note-content/

if docker exec "$CONTAINER_NAME" wget --quiet --spider http://127.0.0.1/note-content/.git/config 2>/dev/null; then
  echo "Hidden note path is unexpectedly accessible" >&2
  exit 1
fi

mount_is_writable="$(
  docker inspect \
    --format '{{range .Mounts}}{{if eq .Destination "/srv/notes"}}{{.RW}}{{end}}{{end}}' \
    "$CONTAINER_NAME"
)"

if [[ "$mount_is_writable" != "false" ]]; then
  echo "DebrisRecord mount is not read-only" >&2
  exit 1
fi

echo "Runtime check passed"
