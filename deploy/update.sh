#!/usr/bin/env bash
# Rolling update script for EC2 deployments.
# Pulls latest code, rebuilds images (or pulls from ECR if IMAGE_TAG is set), and restarts.
# Run on EC2 as: bash /opt/realmoney/deploy/update.sh
set -euo pipefail

INSTALL_DIR="/opt/realmoney"
COMPOSE_FILE="$INSTALL_DIR/platform/docker-compose.prod.yml"

cd "$INSTALL_DIR"

echo "==> Pulling latest code"
git pull --ff-only

cd "$INSTALL_DIR/platform"

if [ -n "${ECR_REGISTRY:-}" ] && [ -n "${APP_VERSION:-}" ]; then
  echo "==> Pulling images from ECR (tag: $APP_VERSION)"
  aws ecr get-login-password --region "${AWS_REGION:-ap-south-1}" \
    | docker login --username AWS --password-stdin "$ECR_REGISTRY"

  docker compose -f "$COMPOSE_FILE" pull backend frontend
else
  echo "==> Building images locally (ECR_REGISTRY or APP_VERSION not set)"
  docker compose -f "$COMPOSE_FILE" build --parallel backend frontend
fi

echo "==> Restarting containers"
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo "==> Waiting for backend health check"
for i in $(seq 1 12); do
  sleep 5
  status=$(docker compose -f "$COMPOSE_FILE" ps --format json backend 2>/dev/null \
    | jq -r '.[0].Health // "unknown"' 2>/dev/null || echo "unknown")
  echo "   Backend health: $status (attempt $i/12)"
  if [ "$status" = "healthy" ]; then
    break
  fi
  if [ "$i" -eq 12 ]; then
    echo "ERROR: Backend did not become healthy after 60 s"
    docker compose -f "$COMPOSE_FILE" logs --tail=50 backend
    exit 1
  fi
done

echo "==> Cleaning up old images"
docker image prune -f --filter "until=24h"

echo ""
echo "Update complete. Platform is healthy."
docker compose -f "$COMPOSE_FILE" ps
