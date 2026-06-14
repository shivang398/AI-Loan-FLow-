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
COPY --from=builder /app/dist ./dist
# Prisma-generated clients output to src/generated; tsc compiles references to dist/generated
COPY --from=builder /app/src/generated ./dist/generated
COPY prisma ./prisma

EXPOSE 8080
CMD ["node", "dist/server.js"]
