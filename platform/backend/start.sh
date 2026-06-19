#!/bin/sh
set -e

echo "[Start] Pushing Prisma schemas to database..."
npx prisma db push --schema=prisma/auth/schema.prisma --accept-data-loss
npx prisma db push --schema=prisma/loan/schema.prisma --accept-data-loss
npx prisma db push --schema=prisma/customer/schema.prisma --accept-data-loss
npx prisma db push --schema=prisma/salesops/schema.prisma --accept-data-loss
npx prisma db push --schema=prisma/communications/schema.prisma --accept-data-loss
npx prisma db push --schema=prisma/analytics/schema.prisma --accept-data-loss
echo "[Start] Schema push complete. Starting server..."

exec node dist/server.js
