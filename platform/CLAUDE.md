# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

## What this is

A hierarchical multi-bank credit distribution platform (MERN stack). Loan connectors (DSAs) originate leads, relationship managers (RMs) manage connectors, and the platform routes applications through eligibility, policy matching, and SM assignment before disbursement.

**Stack:** Node.js + Express + TypeScript + Prisma + MySQL + React + Vite

---

## Commands

### Infrastructure (required before backend starts)

```bash
cd platform
docker compose up -d          # starts MySQL 8, RabbitMQ 3, Redis 7, LocalStack S3
docker compose ps             # verify all healthy (~30s)
```

### Backend

```bash
cd platform/backend
cp .env.example .env          # fill in secrets
npm install
npm run prisma:generate       # generate all 6 Prisma clients (run once after checkout)
npm run dev                   # dev server on :8080 (tsx watch, hot-reload)
npm run build && npm start    # production
```

#### Prisma migrations (Option B — Prisma Migrate)

```bash
# Apply migrations to a specific database
npm run prisma:migrate:auth
npm run prisma:migrate:loan
npm run prisma:migrate:customer
npm run prisma:migrate:salesops
npm run prisma:migrate:comms
npm run prisma:migrate:analytics

# Or push schema directly (dev shortcut — skips migration history)
npx prisma db push --schema=prisma/auth/schema.prisma
```

### Frontend

```bash
cd platform/frontend
npm install --legacy-peer-deps
npm run dev        # dev server on :3000, proxies /api/* to backend :8080
npm run build      # production build (tsc + vite)
npm run lint
```

### Docker (full production stack)

```bash
cd platform
docker compose -f docker-compose.yml -f docker-compose.services.yml up -d
```

---

## Architecture

### Service layout

| Layer | Technology | Port |
|---|---|---|
| Frontend | React 19 + Vite + Ant Design + Redux Toolkit | 3000 (dev) |
| Backend | Node.js + Express + TypeScript | 8080 |
| Database | MySQL 8 — 6 separate schemas | 3307 |
| Cache | Redis 7 (JWT revocation) | 6381 |
| Message broker | RabbitMQ 3 (topic exchange: `platform.exchange`) | 5673 |
| File storage | S3 / LocalStack | 4566 |

### Backend folder structure

```
platform/backend/
  prisma/
    auth/schema.prisma          → platform_auth DB
    loan/schema.prisma          → platform_loan_core DB
    customer/schema.prisma      → platform_customer_docs DB
    salesops/schema.prisma      → platform_sales_ops DB
    communications/schema.prisma → platform_communications DB
    analytics/schema.prisma     → platform_analytics_reporting DB
  src/
    config/          ← prisma.ts (6 clients), redis.ts, rabbitmq.ts, s3.ts
    middleware/      ← auth.middleware.ts (JWT+revocation), role.middleware.ts, error.middleware.ts
    routes/          ← one file per service domain
    services/        ← business logic, one file per service domain
    types/           ← express.d.ts (req.user augmentation)
    utils/           ← response.ts (ApiResponse helper)
    app.ts           ← Express app, route mounting
    server.ts        ← HTTP server + Socket.IO + bootstrap
```

### Route → database mapping

| Route prefix | Prisma client | MySQL database |
|---|---|---|
| `/auth/*` | `authDb` | `platform_auth` |
| `/loans/*` | `loanDb` | `platform_loan_core` |
| `/customers/*` | `customerDb` | `platform_customer_docs` |
| `/connector/*`, `/commission/*`, `/routing/*`, `/foir/*` | `salesOpsDb` | `platform_sales_ops` |
| `/messaging/*` | `commsDb` | `platform_communications` |
| `/reporting/*`, `/analytics/*` | `analyticsDb` | `platform_analytics_reporting` |

### Authentication & roles

Stateless JWT. Secret from `JWT_SECRET` env var (min 32 chars). Roles encoded as comma-separated claim `roles`.

| Role | Access |
|---|---|
| `ADMIN` | Everything |
| `PARTNER_MANAGER` | Connector onboarding, payout slabs |
| `RM` | Regional dashboard, connector tracking |
| `TEAM_LEADER` | Team-level views |
| `CONNECTOR` | Own dashboard, lead submission |
| `OPERATIONS` | WhatsApp console, ops dashboard |

Public endpoints (no JWT): `POST /auth/login`, `POST /auth/refresh`, `POST /auth/register/partner`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `GET/POST /messaging/whatsapp/webhook`, `GET /health`.

### JWT revocation

Revoked tokens (on logout) are stored in Redis with TTL matching the token's remaining lifetime. The `authenticate` middleware checks Redis on every request.

### WebSocket (Socket.IO)

Served on the same port as HTTP (`/socket.io`). Clients join rooms:
- `conv:<conversationId>` — for messaging conversations
- `room:<roomKey>` — for team meeting chat

### RabbitMQ

Exchange: `platform.exchange` (topic, durable). Asserted on startup in `connectRabbitMQ()`.

Key routing keys published:
- `loan.created` — on new loan application
- `loan.status.updated` — on status change
- `messaging.new_message` — on new conversation message
- `messaging.whatsapp_webhook` — on incoming WhatsApp webhook

---

## Key constraints

- **No cross-database joins.** Each Prisma client connects to exactly one database. References between domains (e.g. connector's `user_id` → `platform_auth.users.id`) are plain columns with no FK enforcement.
- **`JWT_SECRET` must be set** — server refuses to start without it.
- **`AUTH_DATABASE_URL` through `ANALYTICS_DATABASE_URL`** — all 6 must be set.
- **Prisma generate must run** before `npm run dev` or `npm run build` on a clean checkout.
- **`express-async-errors`** is imported at the top of `app.ts` — do not remove it; it patches Express to forward unhandled async errors to the error handler.
- **Socket.IO cors** is set from `CORS_ORIGIN` env var (default `*` in dev). Lock it down in production.
