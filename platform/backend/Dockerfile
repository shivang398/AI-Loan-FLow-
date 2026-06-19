FROM node:20-alpine AS builder
WORKDIR /app
# Install OpenSSL so Prisma can detect the system version (Alpine ships OpenSSL 3.x)
# Without this, Prisma warns "failed to detect libssl" and defaults to openssl-1.1.x
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Install OpenSSL 3.x so the Prisma query engine (linux-musl-openssl-3.0.x) can
# find libssl.so.3 at runtime — the engine binary links against it dynamically
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci --omit=dev
# Copy prisma schemas and regenerate inside this image so engine binaries
# are built for this exact Alpine/OpenSSL 3.x environment
COPY prisma ./prisma
RUN npm run prisma:generate
COPY --from=builder /app/dist ./dist
# Place generated clients where compiled JS expects them (dist/generated/)
RUN mkdir -p dist/generated && cp -r src/generated/. dist/generated/
COPY start.sh ./start.sh
RUN chmod +x start.sh

EXPOSE 8080
CMD ["sh", "start.sh"]
