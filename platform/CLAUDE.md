# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What this is

A hierarchical multi-bank credit distribution platform. Loan connectors (DSAs) originate leads, relationship managers (RMs) manage connectors, and the platform routes applications through eligibility, policy matching, and SM assignment before disbursement.

---

## Commands

### Infrastructure (required before any service starts)

```bash
cd platform
docker compose up -d          # starts Postgres 15, RabbitMQ 3, Redis 7, LocalStack S3
docker compose ps             # verify all healthy (~30s)
```

### Running a backend service (dev mode)

```bash
# From platform/ directory — common-lib must be installed first on a clean checkout
mvn -pl common-lib install -DskipTests -q

# Then run any service
cd auth-service && mvn spring-boot:run
```

Each service reads env vars. Minimum required for every service:
```
DB_PASSWORD=<postgres password>
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
JWT_SECRET=<any-256-bit-hex>
```

Additional per-service vars (empty string is accepted as default):
- `messaging-service`: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`
- `notification-service`, `reporting-service`: `MAIL_USERNAME`, `MAIL_PASSWORD`

### Building (without running)

```bash
# Single service + its dependencies
mvn -pl common-lib,auth-service -am package -DskipTests

# All services
mvn clean package -DskipTests
```

### Frontend

```bash
cd platform/frontend
npm install --legacy-peer-deps
npm run dev        # dev server on :3000, proxies /api/* to backend services
npm run build      # production build (tsc + vite)
npm run lint       # eslint
```

### Docker (production build of a service)

```bash
# From platform/ — builds any service via build arg
docker build --build-arg SERVICE_NAME=loan-service -t loan-service:dev .
```

---

## Architecture

### Service map

| Service | Port | Databases | Key responsibility |
|---|---|---|---|
| auth-service | 8081 | platform_auth | JWT issue, BCrypt, user roles |
| connector-service | 8082 | platform_connector | CONNECTOR/RM CRUD, FOIR calc |
| customer-service | 8083 | platform_customer | Lead creation, KYC |
| loan-service | 8084 | platform_loan | Loan application lifecycle |
| eligibility-service | 8085 | platform_eligibility | FOIR/BSA analysis, rule engine |
| policy-service | 8086 | platform_policy | Lender policy docs |
| messaging-service | 8087 | platform_messaging | WhatsApp, STOMP chat, team meeting WS |
| document-service | 8090 | platform_document | S3 upload/download |
| notification-service | 8091 | platform_notification | Email/in-app notifications |
| commission-service | 8092 | platform_commission | Payout slabs, transaction ledger |
| reporting-service | 8093 | platform_reporting | MIS Excel/PDF exports |
| analytics-service | 8094 | platform_analytics | KPI snapshots, trend data |
| sm-routing-service | 8095 | platform_routing | Auto-assigns Sales Managers (event-driven only, no frontend) |

Each service owns its own Postgres schema. No cross-schema joins. Flyway migrations run on startup; all services use `ddl-auto: validate`.

### common-lib

Shared JAR (`com.financial:common-lib:1.0.0-SNAPSHOT`) included by every service. Key classes:

- `JwtAuthenticationFilter` — `OncePerRequestFilter`; reads `Authorization: Bearer` header **or** `?token=` query param (used for raw WebSocket upgrades). Populates `SecurityContextHolder`.
- `JwtTokenProvider` — sign/validate JWTs; roles encoded as a single comma-separated claim.
- `GlobalEvent<T>` — envelope for all RabbitMQ messages (eventId, eventType, sourceService, traceId, payload).
- `ApiResponse<T>` — standard HTTP response wrapper (success/error, requestId).
- `GlobalExceptionHandler` — `@ControllerAdvice` returning `ApiResponse` on validation errors.

### Authentication & roles

Stateless JWT, 8-hour expiry by default (`JWT_EXPIRY_MS`). Roles are plain authorities (no `ROLE_` prefix) except ADMIN which may appear as either.

| Role | Access |
|---|---|
| `ADMIN` | Everything including actuator, analytics write, user management |
| `PARTNER_MANAGER` | Connector onboarding, payout slab management |
| `RM` | Regional dashboard, connector tracking |
| `TEAM_LEADER` | Team-level views |
| `CONNECTOR` | Own dashboard, lead submission |
| `OPERATIONS` | WhatsApp console, ops dashboard |

Public endpoints (no JWT required): `POST /auth/login`, `POST /auth/refresh`, `POST /auth/register/partner`, `GET/POST /webhooks/whatsapp`, `/actuator/health`.

Rate limiting: auth-service login and `/auth/register/partner` are limited to 5 and 3 req/min/IP respectively via `AuthRateLimitFilter`.

### RabbitMQ event bus

All services share a single topic exchange: `platform.exchange`. Event routing keys and their consumer:

| Routing key | Publisher | Consumer(s) |
|---|---|---|
| `auth.user.created` | auth-service | connector-service |
| `customer.created` | customer-service | loan-service |
| `loan.file.created` | loan-service | (notification-service) |
| `loan.status.updated` | loan-service | notification-service, sm-routing-service |
| `routing.sm.assigned` | sm-routing-service | *(no consumer — future work)* |

messaging-service uses its own `messaging.exchange` (direct) with two queues:
- `whatsapp.send.queue` — outbound messages → `WhatsAppMessageConsumer`
- `whatsapp.webhook.queue` — inbound from Facebook → `WhatsAppWebhookConsumer`

### WebSocket architecture

Two separate WebSocket endpoints on messaging-service (:8087):

1. **`/ws-messaging`** — STOMP over SockJS. `permitAll()` at HTTP security level; authentication enforced by `ChannelInterceptor` in `WebSocketConfig` that validates the JWT from the STOMP `CONNECT` frame's `Authorization` header. Do **not** add HTTP-level `authenticated()` here — SockJS makes multiple pre-STOMP HTTP requests that cannot carry JWT.

2. **`/ws/team-meeting`** — raw WebSocket (not STOMP). `authenticated()` at HTTP level. Client must pass `?token=<jwt>` as a query parameter; `JwtAuthenticationFilter` extracts it. Frontend currently runs in full simulation mode — this endpoint is wired but no client connects to it.

### Frontend structure

Vite dev proxy (`frontend/vite.config.ts`) routes `/api/<prefix>` to each service port — this is the canonical mapping; update it if ports change. There is no API gateway in local dev.

Key frontend packages: React 19, Ant Design 5, Redux Toolkit 2, React Router 7, Recharts 3, AG Grid 35, STOMP.js 7, SockJS-client 1.6.

Known gaps (hardcoded, no real API calls):
- `RegionalDashboard.tsx` — RM dashboard shows static placeholder data
- `TeamLeaderDashboard.tsx` — team leader view is fully static
- `useTeamMeetingWS.ts` — runs in simulation mode, never connects to backend

### CI/CD

`.github/workflows/deploy-aws.yml` builds each service inside Docker (no local Java needed in CI) and pushes to AWS ECR, then deploys to ECS via `aws/scripts/deploy.sh`. Infrastructure is managed via CloudFormation (`aws/cloudformation/infrastructure.yml`). Required GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `DB_PASSWORD`, `RABBITMQ_PASSWORD`, `JWT_SECRET`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `WHATSAPP_*`.

### Docker build

`platform/Dockerfile` is a single parameterised file for all backend services:
```
ARG SERVICE_NAME=loan-service
FROM eclipse-temurin:25-jdk-alpine AS builder   # Maven build
FROM eclipse-temurin:25-jre-alpine AS runtime   # slim runtime image
```
Build always copies the entire `platform/` directory so Maven can resolve inter-module dependencies (`common-lib` → target service).

---

## Key constraints to keep in mind

- **Java target is 25** (`pom.xml` `<java.version>25</java.version>`). Local dev runs on JDK 26 (compatible). Maven enforcer requires `[25,)`.
- **No `./mvnw`** in this repo. Use system `mvn` (3.8.7+ installed).
- **`ddl-auto: validate`** on all services — schema changes require a new Flyway migration file; you cannot just change an entity and restart.
- **`DB_PASSWORD`, `RABBITMQ_USER`, `RABBITMQ_PASS`** have no defaults — services will refuse to start without them.
- **Sensitive fields**: `@JsonIgnore` must be on `panNumber`/`aadhaarNumber` in any entity that goes into an API response. Check `Lead.java` and `CustomerKyc.java` as the pattern.
- **OWASP dependency check** runs as part of `mvn verify` and fails the build on CVEs with CVSS ≥ 7.
