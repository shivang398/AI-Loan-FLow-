# Real Money Platform — Application Reference

The single reference for how this application works: what it is, who uses it, how the pieces fit,
every API endpoint, the databases, configuration, local development, testing and deployment.
Last full review and end-to-end test: **10 Nov 2026**.

> Paths below are relative to the repository root (`AI-Loan-FLow-`). The app lives in `platform/`.
> `platform/CLAUDE.md` holds day-to-day dev commands; this file is the complete picture.

---

## 1. What the application is

**Real Money** is a **Corporate DSA (Direct Selling Agent)** based in Jaipur. It does **not lend money**:
it sources personal-loan customers for 50+ RBI-regulated banks and NBFCs, compares offers, handles
paperwork, and is paid commission by the lender on disbursal. Education loans go through the partner
brand **Saral Vidya** (lender: Poonawala Fincorp) and business loans through **Real Finserv**.

The platform has three faces:

| Face | Who | What they do |
|---|---|---|
| **Public website** (`/`) | Borrowers, prospective partners | Read about the service, check a loan offer, apply (5-step form + KYC uploads), apply as a channel partner |
| **WhatsApp bot** | Borrowers | Same loan journey over WhatsApp; leads land in the same CRM |
| **Staff & partner portal** (`/login`) | Admin, RM, Operations, Connector | Work the lead queue, review documents, manage partners/payouts, WhatsApp inbox & broadcasts, reports |

---

## 2. Repository layout

```
AI-Loan-FLow-/
├── reference/CLAUDE.md          ← this file
├── deploy/                      ← EC2 setup + rolling update scripts (setup-ec2.sh, update.sh)
├── aws/                         ← CloudFormation + RDS/deploy helper scripts
├── AWS_DEPLOY.md                ← original AWS deployment notes
└── platform/
    ├── CLAUDE.md                ← dev commands (install, run, migrate)
    ├── docker-compose.yml       ← LOCAL infra: MySQL 8, Redis 7, RabbitMQ 3, LocalStack S3
    ├── docker-compose.prod.yml  ← PRODUCTION: backend + frontend containers (RDS + real S3)
    ├── localstack-init/         ← creates the S3 bucket automatically when LocalStack starts
    ├── init-mysql-databases.sh  ← creates the 6 databases on first MySQL start
    ├── backend/                 ← Node 20 + Express + TypeScript + Prisma (single service, port 8080)
    │   ├── prisma/<schema>/schema.prisma   ← 6 schemas, one MySQL database each
    │   ├── scripts/             ← one-off SQL: pre-deploy.sql, merge-roles.sql
    │   ├── start.sh             ← container entry: prisma db push ×6, then node dist/server.js
    │   └── src/
    │       ├── app.ts           ← Express app, route mounting, rate limiters, raw-body capture
    │       ├── server.ts        ← HTTP + Socket.IO bootstrap, resumes WhatsApp campaigns
    │       ├── config/          ← prisma.ts (6 clients), redis, rabbitmq, s3, whatsapp, interakt
    │       ├── middleware/      ← auth (JWT + Redis revocation), role guard, error handler
    │       ├── routes/          ← one router per domain (see §8)
    │       ├── services/        ← business logic per domain
    │       └── generated/       ← Prisma clients (generated; do not edit)
    └── frontend/                ← React 19 + Vite + Ant Design + Redux Toolkit (dev port 3000)
        ├── nginx.conf.template  ← prod: serves SPA, proxies /api → backend (strips /api)
        └── src/
            ├── App.tsx          ← all routes, combined "hub" pages, legacy redirects
            ├── layouts/DashboardLayout.tsx ← portal shell + role-based sidebar (one nav list)
            ├── pages/           ← LandingPage, LoginPage, CareersPage, password reset
            ├── features/<area>/ ← screens per domain (operations, rm, connector, admin, landing…)
            ├── shared/          ← apiClient (axios, /api base), TabbedPage, constants, formatters
            └── store/           ← Redux: auth (roles, ROLE_HOME), teamMeeting
```

---

## 3. Stack, ports and services

| Layer | Technology | Local | Production |
|---|---|---|---|
| Frontend | React 19, Vite 5, Ant Design 5, Redux Toolkit, framer-motion | `npm run dev` → :3000 (proxies `/api` to :8080) | nginx container on :80/:443, `/api/*` → backend |
| Backend | Node 20, Express, TypeScript, Prisma 5, Socket.IO | `npm run dev` → :8080 | container `backend:8080` |
| Database | MySQL 8 — **6 separate databases** | Docker :3307 | AWS RDS |
| Cache | Redis 7 (JWT revocation) | Docker :6381 | container |
| Queue | RabbitMQ 3, topic exchange `platform.exchange` | Docker :5673 | container |
| Files | S3 (KYC docs, CVs, policies) | LocalStack :4566, bucket auto-created | AWS S3 |
| WhatsApp | Meta Cloud API **or** Interakt (`WHATSAPP_PROVIDER`) | dry-run (logs instead of sending) | live |

There is **no Tailwind** (removed); styling is inline styles + `index.css` tokens (staff portal: navy/gold,
2–4px radius) + `features/landing/theme.ts` (website palette).

---

## 4. Roles (4)

Roles were consolidated from 8 to 4 in Nov 2026 (`TEAM_LEADER→RM`, `PARTNER_MANAGER→ADMIN`,
`TELECALLER→OPERATIONS`, `CREDIT_BUREAU` removed). The canonical list is `UserRole` in
`frontend/src/store/slices/authSlice.ts` and `VALID_ROLES` in `backend/src/services/auth.service.ts`.

| Role | Lands on | Sidebar | Data it can see |
|---|---|---|---|
| **ADMIN** | `/dashboard` | Overview · User Management · Partners (Partner Hub, Payouts) · WhatsApp (Chats, Broadcasts, Templates) · Reports (MIS, Analytics) · Document Library · Career Applications · Policies · Team Meeting | Everything |
| **RM** (Relationship Manager) | `/rm/dashboard` | Regional Hub · Connector Tracker · Workflow Monitor · Policies · Team Meeting | All leads/customers, connectors, commissions, routing |
| **OPERATIONS** | `/ops/dashboard` | Ops Queue · Call Queue · WhatsApp · Policies · Team Meeting | All leads/customers, documents (review), calls, WhatsApp |
| **CONNECTOR** (channel partner, external) | `/connector/dashboard` | Overview · Loan Tools (Eligibility, Statement Analyser, EMI) · My Earnings · Policies · Team Meeting | **Only their own** records: own eligibility submissions, loans, earnings, profile. **No access** to the lead/customer CRM. |

Landing pages per role: `ROLE_HOME` in `authSlice.ts` (used by login and the 404 redirect).
Sidebar: one `navItems` list in `DashboardLayout.tsx`, each item lists its roles.

**Creating staff** (User Management → Add New Employee) is two calls: `POST /auth/register` (login) then
`POST /connectors` (staff/partner profile, `platformRole`). Staff phone numbers must be unique.

---

## 5. Key user journeys

### 5.1 Website loan application → CRM → employee (tested end to end)
1. Visitor fills the hero **"Check your loan offer"** card (employment, amount, income, mobile).
   It does not save anything; it hands the values to the main form (`features/landing/prefill.ts`) and scrolls to it.
2. **5-step application** (`CustomerRegistrationSection.tsx`): loan → personal (incl. PAN, Aadhaar, DOB 21–60) →
   address → employment → documents.
3. End of step 4: `POST /customers/leads` (public) creates the **Lead** (`status=NEW`, `source=WEBSITE`).
4. Step 5: four required KYC files (Aadhaar, PAN, 6-month bank statement, 3 salary slips), each uploaded on
   selection via `POST /documents/public/upload` → S3 + `documents` row owned by the lead.
5. **Operations** sees the lead at the top of **Ops Queue**; the drawer shows every field (personal, address,
   employment, finances) and the documents (view via presigned URL, Approve/Reject via `PUT /documents/:id/review`).
   Ops can change status, add notes, assign a caller (an OPERATIONS user), ask for info.

### 5.2 WhatsApp bot → CRM
`services/whatsappBot.service.ts` (journey) + `services/whatsapp.service.ts` (channel).
Menu: Apply · Check status · Talk to an expert. Apply asks name → employment → income → amount → pincode →
email → PAN → confirm, then creates a Lead with `source=WHATSAPP`. Keywords: `MENU`/`hi` restart, `STOP`/`START`
marketing opt-out. "Talk to an expert" switches the chat to **HUMAN** mode (bot silent); an agent replying from
the inbox also takes over; idle >24h returns to BOT. Inbound messages are idempotent by WhatsApp message id.

### 5.3 WhatsApp broadcasts ("boost")
Admin/Ops → WhatsApp → **Templates** (create; Meta reviews, or with Interakt register an already-approved name) →
**Broadcasts** (pick approved template, fill variables, `{name}` = recipient's first name, audience = CRM leads by
status/source/date or pasted numbers; opted-out and invalid numbers are skipped; max 10,000). Sends are paced;
delivery/read/failed receipts and replies/leads per campaign are tracked. Interrupted campaigns resume on boot.

### 5.4 Channel partners
Website **"Become a partner"** → Careers form with role pre-filled `Channel Partner` (reviewed by Admin).
Connectors use Loan Tools; an eligibility check they submit is stamped with their partner id
(`EligibilitySubmission.assignedConnectorId`) so only they (and staff) see it.

### 5.5 Other
Team Meeting (role chat rooms) · Policies library · MIS reports & analytics · Career applications (CV to S3) ·
Notifications.

---

## 6. Backend architecture notes

- **Single Express service** (`app.ts`). All paths below are backend paths; through nginx/Vite they are under `/api`.
- **Auth**: stateless JWT (`JWT_SECRET`), roles as a comma list in the token; logout revokes in Redis.
  Refresh re-reads roles from the DB. Login allows only `@realmoneygroups.in` / `@realfinserv.com` (frontend check).
- **Rate limits**: login 5 per 15 min per IP; most routers 200 req/min per IP; WhatsApp/Interakt webhooks are
  mounted **before** the limiter (delivery-receipt bursts).
- **Raw body** is kept (`req.rawBody`) for webhook HMAC checks: Meta `X-Hub-Signature-256` (`WHATSAPP_APP_SECRET`),
  Interakt `Interakt-Signature` (`INTERAKT_WEBHOOK_SECRET`). In production unsigned webhooks are rejected.
- **Startup config check** (`config/checkEnv.ts`): exits if `JWT_SECRET` (≥32) or any DB URL is missing; warns for
  missing `CORS_ORIGIN`/`AWS_S3_BUCKET`, a set `AWS_S3_ENDPOINT` in production, WhatsApp dry-run, missing webhook
  secrets, leftover `REPLACE_` placeholders, and `ALLOW_SCHEMA_DATA_LOSS` left on.
- **Health**: `GET /health` = liveness (container healthcheck). `GET /health/ready` = databases + Redis (200/503).
- **Client IP**: `TRUST_PROXY_HOPS` (code default 1 = frontend nginx). Production is **3**: Cloudflare → host Apache
  `httpd` (80/443, Cloudflare Origin Certificate) → frontend nginx (127.0.0.1:8443, appends to X-Forwarded-For) →
  backend. Cloudflare SSL mode must be **Full (strict)**: in Flexible mode Cloudflare hits Apache's port-80 site, which
  loops on `/` and serves an old WordPress install for other paths (seen 10 Nov 2026). Wrong value = every visitor shares
  one IP for rate limiting.
- **RabbitMQ is optional**: connection failure is a warning and publishing is best-effort (nothing consumes events today).
- **S3** (`config/s3.ts`): explicit keys if both set, else the EC2 IAM role; objects stored with SSE (AES256);
  document links expire in 5 minutes (CVs 15).
- **Public uploads**: max 10 MB, magic-byte checked, and only for a lead created in the last 48 hours.
- **Container**: backend runs as the non-root `node` user.
- **Errors** (`middleware/error.middleware.ts`): upload too large → 413; `err.status` 4xx messages reach the client; 5xx become
  "Internal server error". Prisma P2002 → **409** "A record with this <field> already exists", P2003 → 400, P2025 → 404.
- **WhatsApp provider switch** (`config/whatsapp.ts`): `meta` (interactive buttons, in-app template creation) or
  `interakt` (`config/interakt.ts`; templates managed in Interakt; options sent as numbered text and mapped back;
  +91 numbers only). Without credentials → dry-run logging.
- **Socket.IO** on the same port (`/socket.io`) emits inbox/campaign events. Team Meeting's client uses a raw
  WebSocket to `/ws/team-meeting`, which **no server currently handles** (see §13).

---

## 7. Databases (MySQL 8, 6 databases, one Prisma client each)

| Schema dir | Env var | Database | Models |
|---|---|---|---|
| `auth` | `AUTH_DATABASE_URL` | platform_auth | User, Role, UserRole, RefreshToken, AuditLog |
| `loan` | `LOAN_DATABASE_URL` | platform_loan_core | LoanApplication, ApplicationStatusHistory, EligibilityRule, EligibilitySubmission, BankPolicy, PolicyRule, PolicyDocument, AuditLog |
| `customer` | `CUSTOMER_DATABASE_URL` | platform_customer_docs | Customer, CustomerKyc, CustomerAddress, CustomerHistory, **Lead**, CallLog, Document, DocumentVersion, DocumentAccessLog |
| `salesops` | `SALESOPS_DATABASE_URL` | platform_sales_ops | Connector (staff & partner profiles, `platformRole`), HierarchyMapping, ConnectorStatusHistory, ConnectorPerformance, CommissionRule, CommissionTransaction, PayoutHistory, PayoutSlab, SalesManager, RoutingHistory, CareerApplication, FoirAssessment |
| `communications` | `COMMS_DATABASE_URL` | platform_communications | Conversation (WhatsApp: `botMode`, `leadId`, `lastInboundAt`), Message, WhatsappWebhookLog, WhatsappMessageTemplate, WhatsappBotSession, WhatsappCampaign, WhatsappCampaignRecipient, TeamMeetingRoom/Message, Notification… |
| `analytics` | `ANALYTICS_DATABASE_URL` | platform_analytics_reporting | AnalyticsSnapshot, AggregationLog, ReportJob, MisReport, EmailConfig |

- **No cross-database joins**; references across domains (e.g. `Lead.assignedTo` email, `Connector.userId`) are plain columns.
- **Schema sync**: `start.sh` runs `prisma db push` for all six on container start. Destructive changes (dropping
  tables/columns) are **refused** unless `ALLOW_SCHEMA_DATA_LOSS=true` (set it for one deploy only). A failed sync
  logs `[Schema] ERROR …` but the API still starts — always check for that line after a deploy (see §11).
- **Indexes** on hot tables: leads (createdAt, status, mobile, assignedTo, source), documents (ownerId, loanId),
  eligibility_submissions (assignedConnectorId, submittedAt), loan_applications (connectorId, customerId, status, createdAt).
- Credit-bureau table `cibil_checks` was **removed** (Nov 2026) and is dropped by the next push.
- One-off SQL in `backend/scripts/`: `pre-deploy.sql` (collation fix), `merge-roles.sql` (role consolidation). Both idempotent.

---

## 8. API reference (134 endpoints)

Paths are backend paths — prefix `/api` from the browser/nginx. "any logged-in user" = valid JWT, any role.
Generated from `backend/src/routes/*.ts` on 10 Nov 2026.


**`/analytics`** (analytics.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/analytics/summary` | ADMIN, RM, OPERATIONS |
| GET | `/analytics/dashboard` | ADMIN, RM, OPERATIONS |
| GET | `/analytics/snapshots` | ADMIN, RM, OPERATIONS |
| POST | `/analytics/snapshots` | ADMIN, RM |

**`/auth`** (auth.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/auth/register` | ADMIN |
| POST | `/auth/register/partner` | **public** |
| POST | `/auth/login` | **public** |
| POST | `/auth/refresh` | **public** |
| POST | `/auth/logout` | **public** |
| GET | `/auth/me` | any logged-in user |
| GET | `/auth/users/lookup` | ADMIN |
| PUT | `/auth/users/:id/status` | ADMIN |
| POST | `/auth/forgot-password` | **public** |
| POST | `/auth/reset-password` | **public** |

**`/calls`** (call.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/calls/log` | ADMIN, OPERATIONS |
| GET | `/calls/my-queue` | ADMIN, OPERATIONS |
| GET | `/calls/history/:leadId` | any logged-in user |
| GET | `/calls/stats` | ADMIN, RM, OPERATIONS |
| POST | `/calls/bulk-assign` | ADMIN, RM, OPERATIONS |

**`/careers`** (careers.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/careers/apply` | **public** |
| GET | `/careers` | ADMIN |
| GET | `/careers/:id/cv` | ADMIN |
| PATCH | `/careers/:id/status` | ADMIN |

**`/commissions`** (commission.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/commissions/slabs` | any logged-in user |
| POST | `/commissions/slabs` | ADMIN |
| GET | `/commissions/slabs/connector/:connectorId` | any logged-in user |
| PUT | `/commissions/slabs/:id` | ADMIN |
| GET | `/commissions/transactions` | ADMIN, RM |
| POST | `/commissions/transactions` | ADMIN, RM |
| GET | `/commissions/transactions/connector/:connectorId` | ADMIN, RM, CONNECTOR |
| PUT | `/commissions/transactions/:id/status` | ADMIN, RM |

**`/messaging`** (communications.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/messaging/team-meetings/rooms/:roomKey` | any logged-in user |
| GET | `/messaging/team-meetings/rooms/:roomKey/messages` | any logged-in user |
| POST | `/messaging/team-meetings/rooms/:roomKey/messages` | any logged-in user |

**`/connectors`** (connector.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/connectors/me` | any logged-in user |
| GET | `/connectors` | any logged-in user |
| POST | `/connectors/self-register` | any logged-in user |
| POST | `/connectors` | ADMIN |
| GET | `/connectors/:id/reportees` | any logged-in user |
| GET | `/connectors/:id/stats` | any logged-in user |
| GET | `/connectors/:id` | any logged-in user |
| PUT | `/connectors/:id` | ADMIN |
| PUT | `/connectors/:id/status` | ADMIN |
| POST | `/connectors/:id/assign-manager` | ADMIN |

**`/customers`** (customer.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/customers/leads` | **public** |
| POST | `/customers` | ADMIN, RM, OPERATIONS |
| GET | `/customers` | ADMIN, RM, OPERATIONS |
| GET | `/customers/leads` | ADMIN, RM, OPERATIONS |
| POST | `/customers/leads/reassign` | ADMIN, RM, OPERATIONS |
| GET | `/customers/leads/:id` | ADMIN, RM, OPERATIONS |
| PUT | `/customers/leads/:id` | ADMIN, RM, OPERATIONS |
| PUT | `/customers/leads/:id/notes` | ADMIN, OPERATIONS, RM |
| PUT | `/customers/leads/:id/status` | ADMIN, OPERATIONS, RM |
| GET | `/customers/:id` | ADMIN, RM, OPERATIONS |
| PUT | `/customers/:id` | ADMIN, RM, OPERATIONS |
| PUT | `/customers/:id/kyc` | ADMIN, OPERATIONS |
| POST | `/customers/:id/addresses` | ADMIN, RM, OPERATIONS |

**`/documents`** (document.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/documents/public/upload` | **public** |
| GET | `/documents/folder` | any logged-in user |
| POST | `/documents/upload` | any logged-in user |
| GET | `/documents` | any logged-in user |
| GET | `/documents/by-customer/:customerId` | any logged-in user |
| GET | `/documents/:id/presigned-url` | any logged-in user |
| GET | `/documents/:id` | any logged-in user |
| DELETE | `/documents/:id` | ADMIN, OPERATIONS |
| PUT | `/documents/:id/review` | ADMIN, OPERATIONS |

**`/eligibility`** (eligibility.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/eligibility/rules` | any logged-in user |
| POST | `/eligibility/submit` | any logged-in user |
| GET | `/eligibility/submissions` | ADMIN, RM, OPERATIONS, CONNECTOR |
| PUT | `/eligibility/submissions/:id/status` | ADMIN, RM, OPERATIONS |

**`/foir`** (foir.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/foir/calculate` | any logged-in user |
| GET | `/foir/assessments` | any logged-in user |

**`/loans`** (loan.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/loans` | any logged-in user |
| GET | `/loans` | any logged-in user |
| GET | `/loans/audit-logs` | ADMIN |
| GET | `/loans/:id/history` | any logged-in user |
| GET | `/loans/:id` | any logged-in user |
| PUT | `/loans/:id/status` | ADMIN, RM, OPERATIONS |

**`/notifications`** (notifications.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/notifications` | any logged-in user |
| GET | `/notifications/unread-count` | any logged-in user |
| PUT | `/notifications/read-all` | any logged-in user |
| PUT | `/notifications/:id/read` | any logged-in user |

**`/policies`** (policy.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/policies` | any logged-in user |
| POST | `/policies` | ADMIN |
| GET | `/policies/documents` | any logged-in user |
| POST | `/policies/documents` | ADMIN |
| POST | `/policies/documents/upload` | ADMIN |
| GET | `/policies/documents/:id/download` | any logged-in user |
| DELETE | `/policies/documents/:id` | ADMIN |

**`/reports`** (reports.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/reports/mis-uploads` | ADMIN, RM, OPERATIONS |
| POST | `/reports/mis-uploads` | ADMIN, RM |
| GET | `/reports/email-config` | ADMIN |
| PUT | `/reports/email-config` | ADMIN |
| GET | `/reports` | ADMIN, RM, OPERATIONS |
| POST | `/reports` | ADMIN, RM, OPERATIONS |
| POST | `/reports/send-test-email` | ADMIN |
| GET | `/reports/connector-summary/download` | ADMIN, RM |

**`/routing`** (routing.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/routing/managers` | ADMIN, RM |
| POST | `/routing/assign/:loanId` | ADMIN, RM |

**`/whatsapp`** (whatsapp.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/whatsapp/status` | ADMIN, OPERATIONS |
| GET | `/whatsapp/conversations` | ADMIN, OPERATIONS |
| GET | `/whatsapp/conversations/:id/messages` | ADMIN, OPERATIONS |
| POST | `/whatsapp/conversations/:id/messages` | ADMIN, OPERATIONS |
| PUT | `/whatsapp/conversations/:id/mode` | ADMIN, OPERATIONS |
| GET | `/whatsapp/templates` | ADMIN, OPERATIONS |
| POST | `/whatsapp/templates/sync` | ADMIN, OPERATIONS |
| POST | `/whatsapp/templates` | ADMIN, OPERATIONS |
| DELETE | `/whatsapp/templates/:id` | ADMIN, OPERATIONS |
| POST | `/whatsapp/campaigns/preview` | ADMIN, OPERATIONS |
| POST | `/whatsapp/campaigns` | ADMIN, OPERATIONS |
| GET | `/whatsapp/campaigns` | ADMIN, OPERATIONS |
| GET | `/whatsapp/campaigns/:id` | ADMIN, OPERATIONS |

**`/messaging/whatsapp/webhook`** (whatsapp.routes.ts)

| Method | Path | Access |
|---|---|---|
| GET | `/messaging/whatsapp/webhook` | **public** |
| POST | `/messaging/whatsapp/webhook` | **public** |

**`/messaging/whatsapp/interakt-webhook`** (whatsapp.routes.ts)

| Method | Path | Access |
|---|---|---|
| POST | `/messaging/whatsapp/interakt-webhook` | **public** |

---

## 9. Frontend notes

- **Routing** (`App.tsx`): role-guarded routes via `ProtectedRoute`. Related tools are combined into tabbed hub
  pages with `shared/components/TabbedPage.tsx` (tab in `?tab=`): `/whatsapp` (chats/broadcasts/templates),
  `/partners` (partners/payouts), `/reports` (mis/analytics), `/tools` (eligibility/statement/emi).
- **Legacy URLs** (`/pm/*`, `/tl/*`, `/telecaller/queue`, `/admin/reports`, `/whatsapp/inbox`, …) redirect via
  `LEGACY_REDIRECTS`; unknown paths go to the user's role home.
- **API client**: `shared/services/apiClient.ts` (base `/api`, bearer token, refresh on 401).
- **Website** (`pages/LandingPage.tsx`, `features/landing/`): Navbar → Hero (quick offer form) → lending-network band →
  How it works → Borrower's Charter → Apply (5-step form) → Loans → Reviews → Channel partners → FAQ → Footer.
  Palette, fonts and helpers in `features/landing/theme.ts`; ornaments/reveal in `components/Royal.tsx`;
  breakpoints in `styles/landing.css`. Facts on the site (fees, lenders, grievance timeline, data use) must match
  `constants/landingData.ts` FAQ and the footer legal text — the site is a DSA and must not present itself as a lender,
  promise approvals, or show rates as its own.

---

## 10. Configuration (environment variables)

Templates: `platform/.env.production.example` (production, used by `docker-compose.prod.yml`),
`platform/backend/.env.example` (local backend). Never commit real `.env` files.

| Group | Variables |
|---|---|
| App | `NODE_ENV`, `PORT`, `CORS_ORIGIN`, `DOMAIN`, `APP_VERSION` |
| Auth | `JWT_SECRET` (≥32 chars, required), `JWT_EXPIRY_MS`, `JWT_REFRESH_EXPIRY_MS` |
| Databases | `AUTH_DATABASE_URL`, `LOAN_DATABASE_URL`, `CUSTOMER_DATABASE_URL`, `SALESOPS_DATABASE_URL`, `COMMS_DATABASE_URL`, `ANALYTICS_DATABASE_URL` |
| Redis / RabbitMQ | `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `RABBITMQ_URL`, `RABBITMQ_USER`, `RABBITMQ_PASS`, `RABBITMQ_EXCHANGE` |
| S3 | `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `AWS_S3_ENDPOINT` (LocalStack only) |
| WhatsApp | `WHATSAPP_PROVIDER` (`meta`/`interakt`) · Meta: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`, `WHATSAPP_API_URL` · Interakt: `INTERAKT_API_KEY`, `INTERAKT_WEBHOOK_SECRET`, `INTERAKT_RATE_PER_MIN` |
| Email | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` |

Webhook URLs to register: Meta `https://<domain>/api/messaging/whatsapp/webhook` (subscribe `messages` and
`message_template_status_update`); Interakt `https://<domain>/api/messaging/whatsapp/interakt-webhook`.

---

## 11. Running and deploying

### Local
```bash
cd platform && docker compose up -d            # MySQL, Redis, RabbitMQ, LocalStack (bucket auto-created)
cd backend && npm install && npm run prisma:generate && npm run dev     # :8080
cd ../frontend && npm install --legacy-peer-deps && npm run dev        # :3000
```
Local logins: `admin@realmoneygroups.in` / `Admin@123`; QA accounts (local DB only) `qa.rm@`, `qa.ops@`,
`qa.connector@realmoneygroups.in` / `QaTest@1234`. WhatsApp runs in dry-run locally.

### Production (EC2 via AWS SSM, code from GitHub `shivang398/AI-Loan-FLow-`, branch `main`)
Order matters for the Nov 2026 release:
0. **Safety net**: RDS snapshot + `docker tag realmoney/backend:latest realmoney/backend:pre-<date>` (same for frontend).
1. **Before**: `mysql -h <rds> -u <user> -p < platform/backend/scripts/pre-deploy.sql` (collation fix so schema sync completes).
   For **this** release add `ALLOW_SCHEMA_DATA_LOSS=true` to `.env.production` (it drops `cibil_checks`); remove it afterwards.
2. **Deploy**: on the instance, `git pull --ff-only` then
   `docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build backend frontend`
   (in the checkout directory — `/opt/AI-Loan-FLow-/platform` per `platform/CLAUDE.md`; note `deploy/update.sh` assumes `/opt/realmoney`).
3. **Check** `docker logs realmoney-prod-backend-1 | grep -E "^\[Config\]|^\[Schema\]|Running on"` — expect
   `[Schema] all schemas in sync`, no `[Schema] ERROR`; and `curl -s localhost:8080/health/ready` inside the container network.
4. **After**: `mysql … < platform/backend/scripts/merge-roles.sql` (roles 8→4; affected users sign in again).
5. Remove `ALLOW_SCHEMA_DATA_LOSS` from `.env.production` (and `up -d backend` again).
6. Smoke test: `https://<domain>/api/health/ready`, staff login per role, submit a website application, see it in Ops Queue.

Production layout (Nov 2026): EC2 `i-045918d47755bdb30` (ap-south-1), checkout `/opt/AI-Loan-FLow-`, compose project
`realmoney-prod` (containers `realmoney-prod-{backend,frontend,rabbitmq,redis}-1`), MySQL on RDS, documents on S3.
The server's `docker-compose.prod.yml` is locally modified (frontend published on `127.0.0.1:8443` behind a host-level
proxy) — keep that edit; never `git reset --hard` on the server.

`start.sh` drops tables removed from the schemas (`--accept-data-loss`) — e.g. `cibil_checks` in this release.

---

## 12. Testing

| What | How | Status (10 Nov 2026) |
|---|---|---|
| Type checks | `npx tsc --noEmit` (backend `-p .`, frontend) | 0 errors |
| Unit tests | `cd frontend && npx vitest run` | 3/3 pass |
| Production builds | `docker build backend` / `docker build frontend` | both build; backend image boots, syncs 6 schemas, logs in |
| Schema drift | `prisma migrate diff --from-schema-datasource … --to-schema-datamodel …` per schema | all 6 in sync |
| API sweep | every GET endpoint × {Admin, RM, Ops, Connector, anonymous} | no 5xx; nothing private reachable anonymously |
| Role UI | log in as each role, open every sidebar page and tab | 31 screens, 0 errors |
| End to end | website form (5 steps + 4 uploads) → Ops Queue drawer | all 12 fields + 4 documents shown; download + review work |
| WhatsApp | signed webhooks (Meta + Interakt formats), bot journey, campaigns, receipts | pass (Interakt against a local stand-in) |

Watch out when testing locally: login is limited to 5 attempts / 15 min per IP and the API to 200 req/min —
restarting the backend clears both (in-memory).

---

## 13. Known gaps and follow-ups

- **Team Meeting live chat**: client connects to `/ws/team-meeting`, which no backend handles, so messages only
  appear on the sender's screen. Fix: send via `POST /messaging/team-meetings/rooms/:roomKey/messages` and listen to
  the Socket.IO `team_message` event the backend already emits.
- **Public partner self-signup** `POST /auth/register/partner` creates an active CONNECTOR login with no approval —
  disable it or make new partners pending.
- **Interakt free-text format** isn't in Interakt's public docs: send one live test before switching providers.
- **Staff phone numbers** are random placeholders generated by User Management (form has no phone field).
- **Website content to confirm**: phone `+91 98765 43210` looks like a placeholder; testimonials are illustrative;
  grievance inbox `grievance@realmoneygroups.in` must exist and be monitored (the Charter promises 7 days).
- **Login page** shows "ISO 27001 / SOC 2" badges — remove unless certified.
- **Credit bureau checks** were removed for a rebuild; re-add RBI 180-day retention when they return.

---

## 14. Change log — Oct–Nov 2026

- WhatsApp: lead-journey bot, ops inbox (BOT/HUMAN handover), broadcasts with in-app templates, delivery/reply/lead
  tracking, Meta signature fix (raw body), webhooks outside rate limiter, Interakt provider.
- Simplification: sidebar via one config; hub pages with tabs; legacy redirects; ~3,500 lines of dead code, 25+60 npm
  packages (incl. Tailwind) removed; duplicate constants unified.
- Roles 8 → 4 (`merge-roles.sql`); credit-bureau integrations removed (Equifax/Recordent, CRIF, CIBIL/Tenacio).
- Security: connectors can no longer read/edit the lead & customer CRM; connector eligibility submissions scoped to
  the partner; unique-constraint errors return 409.
- Website: DSA positioning, royal navy/gold/ivory design, hero quick-offer form, Borrower's Charter with fraud
  warning, channel-partner section, bank names removed.
- Dev setup: LocalStack auto-creates the S3 bucket; stale auth tests fixed.
- Production hardening (10 Nov 2026): S3 IAM-role support + encryption + 5-min links, opt-in destructive schema sync,
  startup config check, `/health/ready`, configurable proxy hops, optional RabbitMQ, public upload limits (10 MB,
  recent leads only), DB indexes, non-root backend container, 413 for oversized files.
