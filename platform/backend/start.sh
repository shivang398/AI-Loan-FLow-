#!/bin/sh

echo "[Start] Attempting to sync Prisma schemas (non-fatal)..."
npx prisma db push --schema=prisma/auth/schema.prisma --accept-data-loss     || echo "[Warn] auth schema push failed — tables may already exist"
npx prisma db push --schema=prisma/loan/schema.prisma --accept-data-loss     || echo "[Warn] loan schema push failed"
npx prisma db push --schema=prisma/customer/schema.prisma --accept-data-loss  || echo "[Warn] customer schema push failed"
npx prisma db push --schema=prisma/salesops/schema.prisma --accept-data-loss  || echo "[Warn] salesops schema push failed"
npx prisma db push --schema=prisma/communications/schema.prisma --accept-data-loss || echo "[Warn] comms schema push failed"
npx prisma db push --schema=prisma/analytics/schema.prisma --accept-data-loss || echo "[Warn] analytics schema push failed"
echo "[Start] Schema sync done. Starting server..."

exec node dist/server.js
