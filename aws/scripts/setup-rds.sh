#!/usr/bin/env bash
# setup-rds.sh — Creates the 6 application databases in RDS MySQL 8.0.
#
# Run this ONCE after the CloudFormation stack is created, before deploying
# the application services for the first time.
#
# Usage:
#   DB_HOST=<rds-endpoint> DB_PASSWORD=<password> ./setup-rds.sh
#
# Or run via a temporary ECS task (see AWS_DEPLOY.md for full instructions).
#
# Bug 14 fixed: was using psql (PostgreSQL client) — replaced with mysql
# Bug 15 fixed: was creating 15 pre-merger databases — now creates 6 actual ones

set -euo pipefail

DB_HOST="${DB_HOST:?DB_HOST is required}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-platform}"
DB_PASSWORD="${DB_PASSWORD:?DB_PASSWORD is required}"

log() { echo "[setup-rds] $*"; }

# These match the database names embedded in each service's JDBC URL
DATABASES=(
  platform_auth
  platform_sales_ops
  platform_customer_docs
  platform_loan_core
  platform_communications
  platform_analytics_reporting
)

log "Connecting to $DB_HOST:$DB_PORT as $DB_USER"

# Verify connectivity before iterating
mysql \
  -h "$DB_HOST" \
  -P "$DB_PORT" \
  -u "$DB_USER" \
  "-p${DB_PASSWORD}" \
  -e "SELECT 1;" > /dev/null 2>&1 || { log "ERROR: Cannot connect to $DB_HOST:$DB_PORT"; exit 1; }

log "Connection OK"

for db in "${DATABASES[@]}"; do
  exists=$(mysql \
    -h "$DB_HOST" \
    -P "$DB_PORT" \
    -u "$DB_USER" \
    "-p${DB_PASSWORD}" \
    --batch --silent \
    -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='${db}';" \
    2>/dev/null || echo "")

  if [[ "$exists" == "$db" ]]; then
    log "Database '$db' already exists — skipping"
  else
    log "Creating database '$db'..."
    mysql \
      -h "$DB_HOST" \
      -P "$DB_PORT" \
      -u "$DB_USER" \
      "-p${DB_PASSWORD}" \
      -e "CREATE DATABASE IF NOT EXISTS \`${db}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    log "Created '$db'"
  fi
done

log ""
log "=== Database setup complete ==="
log "Databases present:"
for db in "${DATABASES[@]}"; do
  log "  - $db"
done
