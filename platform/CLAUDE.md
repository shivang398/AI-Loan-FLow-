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
# Use the bundled Maven 3.9.6 — system mvn (3.8.x) will be rejected by the enforcer
export MVN=~/Desktop/Auditor/maven/apache-maven-3.9.6/bin/mvn

# From platform/ directory — common-lib must be installed first on a clean checkout
$MVN -pl common-lib install -DskipTests -q

# Then run any service (use new merged names)
cd loan-core-service && $MVN spring-boot:run
```

Each service reads env vars. Minimum required for every service:
```
DB_PASSWORD=<postgres password>
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
JWT_SECRET=<any-256-bit-hex>
```

Additional per-service vars (empty string is accepted as default):
- `communications-service`: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `MAIL_USERNAME`, `MAIL_PASSWORD`
- `analytics-reporting-service`: `SMTP_USER`, `SMTP_PASSWORD`
- All services: `CORS_ALLOWED_ORIGIN` (defaults to `http://localhost:3000`)

### Building (without running)

```bash
export MVN=~/Desktop/Auditor/maven/apache-maven-3.9.6/bin/mvn

# Single service + its dependencies
$MVN -pl common-lib,auth-service -am package -DskipTests

# All services
$MVN clean package -DskipTests
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
# From platform/ — builds any merged service via build arg
docker build --build-arg SERVICE_NAME=loan-core-service -t loan-core-service:dev .
```

---

## Architecture

### Service map (merged — 13 → 6 services)

| Service | Port | Database | Merged from | Key responsibility |
|---|---|---|---|---|
| auth-service | 8081 | platform_auth | *(unchanged)* | JWT issue, BCrypt, user roles |
| sales-ops-service | 8082 | platform_sales_ops | connector + commission + sm-routing | CONNECTOR/RM CRUD, FOIR calc, payout slabs, SM assignment |
| customer-document-service | 8083 | platform_customer_docs | customer + document | Lead creation, KYC, S3 document upload |
| loan-core-service | 8084 | platform_loan_core | loan + eligibility + policy | Loan lifecycle, FOIR/BSA analysis, lender policy docs |
| communications-service | 8087 | platform_communications | messaging + notification | WhatsApp, STOMP chat, team meeting WS, email/in-app notifications |
| analytics-reporting-service | 8093 | platform_analytics_reporting | analytics + reporting | KPI snapshots, trend data, MIS Excel/PDF exports |

Each service owns its own Postgres database. No cross-database joins. Flyway migrations run on startup; all services use `ddl-auto: none` with `baseline-on-migrate: true`.

### Java package layout inside merged services

Each merged service contains multiple sub-packages from the original services. The single `@SpringBootApplication` entry point is in the service's own top-level package and uses `@ComponentScan` to wire them all together:

| Service | Entry class | Sub-packages scanned |
|---|---|---|
| loan-core-service | `com.financial.loancore.LoanCoreApplication` | `loan`, `eligibility`, `policy`, `loancore`, `common` |
| customer-document-service | `com.financial.customerdoc.CustomerDocumentApplication` | `customer`, `document`, `customerdoc`, `common` |
| communications-service | `com.financial.communications.CommunicationsApplication` | `messaging`, `notification`, `communications`, `common` |
| analytics-reporting-service | `com.financial.analyticsreporting.AnalyticsReportingApplication` | `analytics`, `reporting`, `analyticsreporting`, `common` |
| sales-ops-service | `com.financial.salesops.SalesOpsApplication` | `connector`, `commission`, `routing`, `salesops`, `common` |

Each merged service has **one** `SecurityConfig` in its top-level config package (e.g. `com.financial.loancore.config.SecurityConfig`). Never add a second `@Bean SecurityFilterChain` — it will conflict.

### common-lib

Shared JAR (`com.financial:common-lib:1.0.0-SNAPSHOT`) included by every service. Key classes:

- `JwtAuthenticationFilter` — `OncePerRequestFilter`; reads `Authorization: Bearer` header **or** `?token=` query param (used for raw WebSocket upgrades). Populates `SecurityContextHolder`.
- `JwtTokenProvider` — sign/validate JWTs; roles encoded as a single comma-separated claim.
- `SecurityEventLogger` — `@EventListener` for `AuthorizationDeniedEvent`/`AuthorizationGrantedEvent`; logs to `SECURITY_AUDIT` logger (A09).
- `GlobalEvent<T>` — envelope for all RabbitMQ messages (eventId, eventType, sourceService, traceId, payload).
- `ApiResponse<T>` — standard HTTP response wrapper (success/error, requestId).
- `GlobalExceptionHandler` — `@ControllerAdvice` returning `ApiResponse` on validation errors; sanitizes all error messages so DB details never reach the client.

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

Public endpoints (no JWT required): `POST /auth/login`, `POST /auth/refresh`, `POST /auth/register/partner`, `GET/POST /webhooks/**`, `/actuator/health`, `POST /eligibility/submissions`, `POST /customers`, `POST /documents/public/upload`, `GET /connectors/internal/**`.

Rate limiting: auth-service login and `/auth/register/partner` are limited to 5 and 3 req/min/IP respectively via `AuthRateLimitFilter`.

### OWASP Top 10 coverage

Every `SecurityConfig` enforces:
- **A01** — role-based `authorizeHttpRequests` on all endpoints
- **A02** — HSTS (`max-age=31536000; includeSubDomains`) on all services; BCrypt cost 12 in auth-service
- **A03** — `@Valid`/`@Validated` on all controller inputs; JPA parameterised queries only
- **A05** — `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'`, `Permissions-Policy`, `Referrer-Policy`; `server.error.include-stacktrace: never` in all yml files; CORS allowlist via `CORS_ALLOWED_ORIGIN` env var (default `localhost:3000`)
- **A07** — Rate limiting on auth; JWT validation in `JwtTokenProvider`; account lockout in auth-service
- **A08** — `ObjectMapper.deactivateDefaultTyping()` in all services; `FAIL_ON_UNKNOWN_PROPERTIES` disabled; `deactivateDefaultTyping()` prevents polymorphic deserialization attacks
- **A09** — `SecurityEventLogger` in common-lib logs all `ACCESS_DENIED` events to `SECURITY_AUDIT` log stream; auth-service has dedicated `SecurityAuditLog` for login/register events

### RabbitMQ event bus

All services share a single topic exchange: `platform.exchange`. Event routing keys and their consumer:

| Routing key | Publisher | Consumer(s) |
|---|---|---|
| `auth.user.created` | auth-service | sales-ops-service (connector sub-package) |
| `customer.created` | customer-document-service | loan-core-service |
| `loan.file.created` | loan-core-service | communications-service (notification sub-package) |
| `loan.status.updated` | loan-core-service | communications-service, sales-ops-service (routing sub-package) |
| `routing.sm.assigned` | sales-ops-service | *(no consumer — future work)* |

communications-service uses its own `messaging.exchange` (direct) with two queues:
- `whatsapp.send.queue` — outbound messages → `WhatsAppMessageConsumer`
- `whatsapp.webhook.queue` — inbound from Facebook → `WhatsAppWebhookConsumer`

### WebSocket architecture

Two separate WebSocket endpoints on communications-service (:8087):

1. **`/ws-messaging`** — STOMP over SockJS. `permitAll()` at HTTP security level; authentication enforced by `ChannelInterceptor` in `WebSocketConfig` that validates the JWT from the STOMP `CONNECT` frame's `Authorization` header. Do **not** add HTTP-level `authenticated()` here — SockJS makes multiple pre-STOMP HTTP requests that cannot carry JWT.

2. **`/ws/team-meeting`** — raw WebSocket (not STOMP). `permitAll()` at HTTP level. Client must pass `?token=<jwt>` as a query parameter; `JwtAuthenticationFilter` extracts it. Frontend currently runs in full simulation mode — this endpoint is wired but no client connects to it.

### Frontend structure

Vite dev proxy (`frontend/vite.config.ts`) routes `/api/<prefix>` to each service port — this is the canonical mapping; update it if ports change. There is no API gateway in local dev.

Key frontend packages: React 19, Ant Design 5, Redux Toolkit 2, React Router 7, Recharts 3, AG Grid 35, STOMP.js 7, SockJS-client 1.6.

Known gaps (hardcoded, no real API calls):
- `RegionalDashboard.tsx` — RM dashboard shows static placeholder data
- `TeamLeaderDashboard.tsx` — team leader view is fully static
- `useTeamMeetingWS.ts` — runs in simulation mode, never connects to backend

### CI/CD

`.github/workflows/deploy-aws.yml` builds each service inside Docker (no local Java needed in CI) and pushes to AWS ECR, then deploys to ECS via `aws/scripts/deploy.sh`. Infrastructure is managed via CloudFormation (`aws/cloudformation/infrastructure.yml`). Required GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `DB_PASSWORD`, `RABBITMQ_PASSWORD`, `JWT_SECRET`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `WHATSAPP_*`, `CORS_ALLOWED_ORIGIN`.

### Docker build

`platform/Dockerfile` is a single parameterised file for all backend services:
```
ARG SERVICE_NAME=loan-core-service
FROM eclipse-temurin:25-jdk-alpine AS builder   # Maven build
FROM eclipse-temurin:25-jre-alpine AS runtime   # slim runtime image
```
Build always copies the entire `platform/` directory so Maven can resolve inter-module dependencies (`common-lib` → target service).

---

## Key constraints to keep in mind

- **Java target is 25** (`pom.xml` `<java.version>25</java.version>`). Local dev **must** use JDK 25 — the enforcer now rejects JDK 26+. Maven enforcer requires `[3.9.0,4.0.0)`.
- **No `./mvnw`** in this repo. Do **not** use the system `mvn` (3.8.7 — fails the enforcer). Use the bundled Maven 3.9.6: `platform/maven/apache-maven-3.9.6/bin/mvn`.
- **`ddl-auto: none`** on all merged services — schema changes require a new Flyway migration file; you cannot just change an entity and restart.
- **`DB_PASSWORD`, `RABBITMQ_USER`, `RABBITMQ_PASS`** have no defaults — services will refuse to start without them.
- **Sensitive fields**: `@JsonIgnore` must be on `panNumber`/`aadhaarNumber` in any entity that goes into an API response. Check `Lead.java` and `CustomerKyc.java` as the pattern.
- **One SecurityConfig per service** — each merged service has exactly one `@Bean SecurityFilterChain` in its `*.config.SecurityConfig`. Never add another one in a sub-package — it will cause a bean conflict on startup.
- **Flyway migration numbering** — within each merged service, migrations are sequenced across all merged origins (e.g., sales-ops-service runs V1–V7 covering connector → commission → routing in order). New migrations must continue from the last V number.
- **OWASP dependency check** runs as part of `mvn verify` and fails the build on CVEs with CVSS ≥ 7.
