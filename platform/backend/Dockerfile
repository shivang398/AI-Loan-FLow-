FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
# Copy prisma schemas so we can regenerate with the correct binaryTargets
COPY prisma ./prisma
# Regenerate Prisma clients inside the runner image so engine binaries
# match Alpine/OpenSSL 3.x (linux-musl-openssl-3.0.x) — avoids libssl.so.1.1 error
RUN npm run prisma:generate
COPY --from=builder /app/dist ./dist
# Place generated clients where compiled JS expects them (dist/generated/)
RUN mkdir -p dist/generated && cp -r src/generated/. dist/generated/

EXPOSE 8080
CMD ["node", "dist/server.js"]
