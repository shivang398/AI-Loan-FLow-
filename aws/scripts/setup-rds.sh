#!/usr/bin/env bash
# setup-rds.sh — Creates the 15 application databases in RDS PostgreSQL.
#
# Run this ONCE after the CloudFormation stack is created, before deploying
# the application services for the first time.
#
# Usage:
#   DB_HOST=<rds-endpoint> DB_PASSWORD=<password> ./setup-rds.sh
#
# Or run via a temporary ECS task (see AWS_DEPLOY.md for full instructions).

set -euo pipefail

DB_HOST="${DB_HOST:?DB_HOST is required}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:?DB_PASSWORD is required}"

export PGPASSWORD="$DB_PASSWORD"

log() { echo "[setup-rds] $*"; }

DATABASES=(
  platform_auth
  platform_connector
  platform_customer
  platform_loan
  platform_eligibility
  platform_policy
  platform_routing
  platform_rm_tracking
  platform_query
  platform_document
  platform_notification
  platform_commission
  platform_reporting
  platform_analytics
  platform_messaging
)

log "Connecting to $DB_HOST:$DB_PORT as $DB_USER"

for db in "${DATABASES[@]}"; do
  # Check if database already exists
  exists=$(psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d postgres \
    -tAc "SELECT 1 FROM pg_database WHERE datname='${db}'" 2>/dev/null || echo "")

  if [[ "$exists" == "1" ]]; then
    log "Database '$db' already exists — skipping"
  else
    log "Creating database '$db'..."
    psql \
      -h "$DB_HOST" \
      -p "$DB_PORT" \
      -U "$DB_USER" \
      -d postgres \
      -c "CREATE DATABASE ${db};"
    log "Created '$db'"
  fi
done

log ""
log "=== Database setup complete ==="
log "Databases created:"
for db in "${DATABASES[@]}"; do
  log "  - $db"
done
