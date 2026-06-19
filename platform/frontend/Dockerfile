# Platform Frontend - React + Vite served via Nginx with reverse proxy to backend services
# Runs in Railway with dynamic backend service URLs

# --- Build Stage ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy frontend source
COPY . .

# Build optimized production bundle
RUN npm run build

# --- Runtime Stage ───────────────────────────────────────────────────────────
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Install envsubst (for runtime env var substitution in nginx.conf)
RUN apk add --no-cache gettext

# Copy Nginx config template
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copy docker entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built frontend from builder
COPY --from=builder /app/dist .

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/index.html || exit 1

EXPOSE 8080 8443

ENTRYPOINT ["/docker-entrypoint.sh"]
