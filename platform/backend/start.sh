#!/bin/sh
# Container entry point: sync the six Prisma schemas to their databases, then start the API.
#
# Data safety: `prisma db push` refuses changes that would delete data (dropped tables/columns) unless
# ALLOW_SCHEMA_DATA_LOSS=true. Leave it unset normally; set it for one deploy only when a release
# intentionally removes data (e.g. the Nov 2026 release drops the old cibil_checks table), then unset it.
#
# A failed sync does not stop the API (a database blip must not take the site down), but it is logged as
# "[Schema] ERROR" — check for that line after every deploy.

if [ "$ALLOW_SCHEMA_DATA_LOSS" = "true" ]; then
  DATA_LOSS_FLAG="--accept-data-loss"
  echo "[Schema] ALLOW_SCHEMA_DATA_LOSS=true — destructive schema changes WILL be applied"
else
  DATA_LOSS_FLAG=""
fi

failed=""
for schema in auth loan customer salesops communications analytics; do
  echo "[Schema] syncing $schema"
  if ! npx prisma db push --skip-generate --schema="prisma/$schema/schema.prisma" $DATA_LOSS_FLAG; then
    echo "[Schema] ERROR: $schema schema sync failed — see the message above"
    failed="$failed $schema"
  fi
done

if [ -n "$failed" ]; then
  echo "[Schema] ERROR: schema sync failed for:$failed — the API is starting, but features using these schemas may fail"
else
  echo "[Schema] all schemas in sync"
fi

exec node dist/server.js
