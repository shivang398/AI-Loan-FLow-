# Real Money Advisory Platform

A complete loan distribution management system built for **Real Money Groups** and **Real Finserv**. It connects loan agents (Connectors) with banks, tracks every step of a loan application, and gives managers full visibility over their teams.

---

## What this platform does — in plain words

Think of it as an **internal CRM + loan pipeline + commission tracker** built specifically for a DSA (Direct Selling Agent) business. The full journey:

1. A customer fills a loan enquiry form on the website.
2. A **Connector** (loan agent) picks up the lead and submits documents.
3. The platform automatically checks if the customer qualifies (income, EMI capacity).
4. It matches the application to the right bank based on that bank's lending rules.
5. A **Sales Manager** is auto-assigned to push the file forward.
6. The **RM** (Relationship Manager) monitors their team of Connectors.
7. A **Team Leader** gets a bird's-eye view across all RMs.
8. **Operations** staff handle WhatsApp communication and day-to-day queries.
9. When a loan is disbursed, commissions are calculated and logged automatically.
10. **Admins** and **Partner Managers** manage users, payouts, and platform settings.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 25, Spring Boot 4.x, Spring Security 7, Hibernate 6 |
| Database | **AWS RDS MySQL 8.0** (6 separate databases) |
| Migrations | Flyway 11 (`ddl-auto: none` — schema-only migrations) |
| Message broker | RabbitMQ 3.13 |
| Cache / rate limiting | Redis 7 |
| File storage | **AWS S3** |
| Frontend | React 19, Vite 5, Ant Design 5, Redux Toolkit 2 |
| Auth | Stateless JWT (jjwt 0.12.5), BCrypt cost 12 |
| Build | Maven 3.9.6 (bundled — do not use system mvn) |
| Container runtime | Docker + Docker Compose |

---

## Architecture

```
Internet
   │
   ▼
Nginx (port 80 / 443)
   │   Serves React SPA
   │   Proxies /api/* to backend services
   │   WebSocket upgrade for /ws-messaging and /ws/team-meeting
   │
   ├──► auth-service          :8080
   ├──► sales-ops-service     :8080
   ├──► customer-document     :8080
   ├──► loan-core-service     :8080
   ├──► communications-svc    :8080
   └──► analytics-reporting   :8080
              │
    ┌─────────┼────────────────────┐
    │         │                   │
 AWS RDS    RabbitMQ           Redis
 MySQL 8.0  (message bus)      (cache / rate-limit / JWT blocklist)
 (6 DBs)         │
              AWS S3
            (document storage)
```

All backend containers run on the internal Docker network and are **not reachable from the internet** — only Nginx on port 80/443 is exposed.

---

## Service Map

| Service | Internal Port | Database | Merged from | Responsibility |
|---|---|---|---|---|
| **auth-service** | 8080 | `platform_auth` | *(standalone)* | JWT issue/validate, BCrypt passwords, account lockout, role management |
| **sales-ops-service** | 8080 | `platform_sales_ops` | connector + commission + sm-routing | Connector/RM profiles, FOIR calc, commission slabs, payout ledger, SM auto-assignment |
| **customer-document-service** | 8080 | `platform_customer_docs` | customer + document | Customer/lead profiles, KYC, S3 document upload (PAN/Aadhaar AES-256-GCM encrypted) |
| **loan-core-service** | 8080 | `platform_loan_core` | loan + eligibility + policy | Full loan lifecycle, FOIR/CIBIL eligibility, bank policy matching |
| **communications-service** | 8080 | `platform_communications` | messaging + notification | WhatsApp, STOMP real-time chat, team-meeting WebSocket, email notifications |
| **analytics-reporting-service** | 8080 | `platform_analytics_reporting` | analytics + reporting | KPI dashboards, Excel/PDF MIS exports, trend data |

> **Note on ports:** Inside Docker each service always runs on **port 8080**. The original service ports (8081, 8082, etc.) are only used when running JARs directly outside Docker.

---

## Event Bus — RabbitMQ

All services share a single topic exchange: `platform.exchange`.

| Routing Key | Publisher | Consumer |
|---|---|---|
| `auth.user.created` | auth-service | sales-ops-service (connector sub-package) |
| `customer.created` | customer-document-service | loan-core-service |
| `loan.file.created` | loan-core-service | communications-service |
| `loan.status.updated` | loan-core-service | communications-service, sales-ops-service (routing) |
| `routing.sm.assigned` | sales-ops-service | *(future consumer)* |

communications-service also uses its own `messaging.exchange` (direct) with two queues:
- `whatsapp.send.queue` — outbound WhatsApp messages
- `whatsapp.webhook.queue` — inbound webhooks from Meta

---

## Loan Workflow

```
[Customer fills form]
       │
       ▼
loan-core-service — eligibility check (FOIR + CIBIL)
       │
       ├─ NOT_ELIGIBLE ──► return rejection reason
       └─ ELIGIBLE ──► create lead
              │
              ▼
customer-document-service — KYC + document upload to S3
              │
              ▼
loan-core-service — loan lifecycle
  NEW → DOCUMENTS_PENDING → UNDER_REVIEW → APPROVED → DISBURSED
              │ (on APPROVED)
              ├──► sales-ops-service (routing) — auto-assign Sales Manager
              ├──► communications-service — notify customer + Connector
              └──► sales-ops-service (commission) — create pending entry
              │ (on DISBURSED)
              └──► sales-ops-service (commission) — mark as payable
```

---

## Security — OWASP Top 10

| Control | Implementation |
|---|---|
| **A01 Broken Access Control** | Role-based `authorizeHttpRequests` on every endpoint; `@PreAuthorize` on sensitive operations; backend not internet-exposed |
| **A02 Cryptographic Failures** | HSTS on all services; BCrypt cost 12; JWT HMAC-SHA256; 256-bit minimum secret enforced; PAN/Aadhaar AES-256-GCM encrypted at rest; containers run as non-root |
| **A03 Injection** | `@Valid`/`@Validated` on all controller inputs; parameterised JPQL only — no string-concatenated queries |
| **A05 Misconfiguration** | `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy`; `server.error.include-stacktrace: never`; CORS restricted via `CORS_ALLOWED_ORIGIN` env var |
| **A06 Vulnerable Components** | OWASP dependency-check runs on `mvn verify`, fails on CVSS ≥ 7 |
| **A07 Auth Failures** | Redis-backed rate limiting (5 req/min/IP on login); account lockout after 5 failed attempts; JWT blocklist on logout |
| **A08 Data Integrity** | `ObjectMapper.deactivateDefaultTyping()` on all services; file uploads validated by MIME type + magic bytes before S3 upload |
| **A09 Security Logging** | `SecurityEventLogger` (common-lib) logs every `ACCESS_DENIED` to `SECURITY_AUDIT` stream; auth-service logs every login, lockout, and registration |

---

## User Roles

| Role | Who | What they can access |
|---|---|---|
| `ADMIN` | Platform owner | Everything — user management, analytics, all settings |
| `PARTNER_MANAGER` | Senior manager | Onboard Connectors, set commission slabs |
| `TEAM_LEADER` | Team lead | All RMs and their Connector pipelines |
| `RM` | Relationship Manager | Own Connectors' pipelines and regional dashboard |
| `CONNECTOR` | Loan agent (DSA) | Own dashboard, lead submission, own commissions |
| `OPERATIONS` | Back-office | WhatsApp console, ops dashboard |

Allowed email domains: `@realmoneygroups.in` and `@realfinserv.com`. Any other domain is rejected at the auth layer with HTTP 403.

---

## Local Development

### Prerequisites

- Java 25 JDK
- Docker + Docker Compose
- Node.js 20+
- Maven 3.9.6 — use the bundled one at `platform/maven/apache-maven-3.9.6/bin/mvn`

### Step 1 — Start local infrastructure

```bash
cd platform
docker compose up -d          # MySQL, RabbitMQ, Redis, LocalStack
docker compose ps             # wait until all healthy (~30s)
```

This starts MySQL 8 on `:3307`, RabbitMQ on `:5673` (UI: `:15673`), Redis on `:6381`, LocalStack S3 on `:4566`. Six MySQL databases are created automatically by `init-mysql-databases.sh`.

### Step 2 — Build and run backend

```bash
export MVN=~/Desktop/Auditor/maven/apache-maven-3.9.6/bin/mvn
cd platform

# Install common-lib first on a clean checkout
$MVN -pl common-lib install -DskipTests -q

# Start all 6 services (reads .service-pids for tracking)
./start-all.sh
```

Minimum env vars every service needs (already set in `start-all.sh` for local dev):

```
DB_PASSWORD=password
DB_USER=root
DB_PORT=3307
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
JWT_SECRET=<any-string-32-chars+>
```

### Step 3 — Start frontend

```bash
cd platform/frontend
npm install --legacy-peer-deps
npm run dev    # dev server on :3000, Vite proxy routes /api/* to backend services
```

---

## Docker Deployment (recommended for production)

This is the **primary production deployment method**. All 6 backend services, the frontend Nginx, RabbitMQ, and Redis run as Docker containers. AWS RDS provides MySQL; AWS S3 provides file storage — no local database or LocalStack needed.

### Prerequisites on the server

```bash
# Docker Engine + Compose plugin
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
sudo apt-get install -y docker-compose-plugin
newgrp docker
```

### Step 1 — Clone the repository

```bash
git clone https://github.com/shivang398/AI-Loan-FLow-.git
cd AI-Loan-FLow-/platform
```

### Step 2 — Create the 6 MySQL databases on RDS

Run this once, before starting the services for the first time. Flyway will create all tables on first startup.

```bash
sudo apt-get install -y mysql-client

mysql -h YOUR_RDS_ENDPOINT -u YOUR_DB_USER -p << 'SQL'
CREATE DATABASE IF NOT EXISTS platform_auth               CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_sales_ops          CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_customer_docs      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_loan_core          CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_communications     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_analytics_reporting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SQL
```

### Step 3 — Create your environment file

```bash
cp .env.example .env
chmod 600 .env        # only owner can read
nano .env             # fill in the required values (see table below)
```

**Required values in `.env`:**

| Variable | Description |
|---|---|
| `DB_HOST` | RDS endpoint (e.g. `platform-db.xxxx.ap-south-1.rds.amazonaws.com`) |
| `DB_PORT` | Usually `3306` |
| `DB_USER` | RDS master username |
| `DB_PASSWORD` | RDS master password — use a strong random value |
| `JWT_SECRET` | Generate: `openssl rand -hex 32` (min 64 hex chars) |
| `RABBITMQ_USER` | RabbitMQ user (set freely — container picks this up) |
| `RABBITMQ_PASS` | RabbitMQ password — use a strong random value |
| `AWS_ACCESS_KEY` | IAM access key for S3 (least-privilege, bucket-scoped) |
| `AWS_SECRET_KEY` | IAM secret key |
| `AWS_REGION` | S3 bucket region (e.g. `ap-south-1`) |
| `S3_BUCKET_NAME` | Your S3 bucket name |
| `CORS_ALLOWED_ORIGIN` | Your frontend domain (e.g. `https://app.realmoney.in`) |

Optional (leave empty to disable the feature):
`MAIL_USERNAME`, `MAIL_PASSWORD`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_APP_SECRET`

### Step 4 — Build all images

This step compiles all 6 Spring Boot services and the React frontend inside Docker — no local Java or Node needed on the server.

```bash
docker compose -f docker-compose.services.yml build
```

Building all 6 services takes 10–15 minutes the first time. Subsequent builds are faster thanks to Docker layer caching.

To build a single service after a code change:

```bash
docker compose -f docker-compose.services.yml build loan-core-service
```

### Step 5 — Start everything

```bash
docker compose -f docker-compose.services.yml up -d
```

Startup order is managed automatically: RabbitMQ and Redis start first, then all 6 backend services, then the frontend (which waits for all backends to be healthy).

Watch the startup:

```bash
docker compose -f docker-compose.services.yml logs -f
```

Expected startup time: ~2 minutes for all services to pass their health checks.

### Step 6 — Verify everything is healthy

```bash
docker compose -f docker-compose.services.yml ps
```

All services should show `(healthy)`. The frontend listens on **port 80**.

Access the platform at `http://YOUR_SERVER_IP`.

### Step 7 — HTTPS with Let's Encrypt

Install Certbot and get a certificate. Then create an override file that changes the frontend port to 443 and mounts the certificate:

```bash
sudo apt-get install -y certbot
sudo certbot certonly --standalone -d yourdomain.com

# Update CORS_ALLOWED_ORIGIN in .env to https://yourdomain.com
nano .env

# Reload frontend container
docker compose -f docker-compose.services.yml up -d --no-deps frontend
```

For full TLS termination at Nginx, mount the cert into the frontend container or use a TLS reverse proxy (Caddy, Traefik) in front.

### Auto-start on server reboot

```bash
sudo tee /etc/systemd/system/realmoney.service << 'EOF'
[Unit]
Description=Real Money Platform
After=docker.service network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ubuntu
WorkingDirectory=/home/ubuntu/AI-Loan-FLow-/platform
ExecStart=/usr/bin/docker compose -f docker-compose.services.yml up -d
ExecStop=/usr/bin/docker compose -f docker-compose.services.yml down

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable realmoney.service
```

---

## Deploying updates

After a code push, rebuild only the changed service and roll it with zero downtime:

```bash
cd /home/ubuntu/AI-Loan-FLow-/platform
git pull

# Rebuild and restart a single service
docker compose -f docker-compose.services.yml build loan-core-service
docker compose -f docker-compose.services.yml up -d --no-deps loan-core-service

# Rebuild and restart the frontend (React)
docker compose -f docker-compose.services.yml build frontend
docker compose -f docker-compose.services.yml up -d --no-deps frontend
```

The `--no-deps` flag restarts only the named service without touching the rest of the stack.

---

## Health Monitoring

```bash
# All container statuses
docker compose -f docker-compose.services.yml ps

# Actuator health for every backend service
for svc in auth-service sales-ops-service customer-document-service \
           loan-core-service communications-service analytics-reporting-service; do
  status=$(docker compose -f docker-compose.services.yml exec $svc \
    wget -q -O- http://localhost:8080/actuator/health 2>/dev/null \
    | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  printf "  %-35s %s\n" "$svc" "$status"
done

# Tail logs for a specific service
docker compose -f docker-compose.services.yml logs -f loan-core-service

# RabbitMQ management UI (admin only — do not expose port 15672 publicly)
# Accessible via SSH tunnel: ssh -L 15672:localhost:15672 ubuntu@YOUR_SERVER
# Then open http://localhost:15672 in your browser
```

---

## Creating the first Admin user

```bash
# 1. Register via the public API (creates a CONNECTOR-role user)
curl -X POST http://YOUR_SERVER/api/auth/register/partner \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realmoneygroups.in","password":"StrongPass@123","name":"Admin"}'

# 2. Promote to ADMIN directly in RDS
mysql -h YOUR_RDS_ENDPOINT -u YOUR_DB_USER -p platform_auth << 'SQL'
UPDATE user_roles
   SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
 WHERE user_id = (SELECT id FROM users WHERE email = 'admin@realmoneygroups.in');
SQL
```

---

## AWS Infrastructure Sizing

| Resource | Spec | Estimated cost/month |
|---|---|---|
| EC2 t3.large (8 GB, 2 vCPU) | All containers (services + Nginx + RabbitMQ + Redis) | ~$60 |
| RDS MySQL db.t3.small | Single-AZ, MySQL 8.0, 20 GB storage | ~$25 |
| S3 | Document storage (~10 GB) | ~$2 |
| Elastic IP | Static public IP | ~$4 |
| **Total** | | **~$91/month** |

For higher availability, upgrade to `db.t3.medium` Multi-AZ RDS (~$80) and a `t3.xlarge` EC2 (~$120).

---

## Troubleshooting

| Problem | What to do |
|---|---|
| Container won't start | `docker compose -f docker-compose.services.yml logs <service>` — look for `ERROR` or `APPLICATION FAILED TO START` |
| Service stays `starting` forever | JVM startup takes ~90s — wait for the `start_period` to pass before declaring it unhealthy |
| `DB_PASSWORD` rejected | Check `.env` is present in `platform/` and has no trailing spaces around the `=` |
| RDS connection refused | RDS security group must allow port 3306 inbound from the EC2 security group |
| 502 Bad Gateway | Backend service crashed or not yet healthy — check its logs |
| Out of memory | Increase `memory` limit in `docker-compose.services.yml`; JVM uses up to 75% of the container limit by default |
| RabbitMQ exchange not found | Wait for RabbitMQ to finish starting (15–30s); services retry automatically |
| S3 upload fails | Verify `AWS_ACCESS_KEY` has `s3:PutObject` and `s3:GetObject` on `S3_BUCKET_NAME` |
| Flyway error on startup | Check logs for `Migration failed` — likely a SQL syntax issue or wrong baseline version |
| CORS blocked in browser | `CORS_ALLOWED_ORIGIN` in `.env` must exactly match the origin the browser sends (including `https://`) |
| Login blocked | Email domain must be `@realmoneygroups.in` or `@realfinserv.com` |
| `Port already in use` | Another process is using port 80 — `sudo lsof -i :80` then stop it |
| JWT invalid after restart | `JWT_SECRET` must be the same across all services — set it once in `.env` |

---

## Key Constraints

- **Java 25** — all services compile and run on JDK 25. The Maven enforcer rejects JDK 26+.
- **Maven 3.9.6** — use the bundled `platform/maven/apache-maven-3.9.6/bin/mvn`. The system mvn (3.8.x) will be rejected by the enforcer.
- **`ddl-auto: none`** — schema changes require a new Flyway migration file. Restarting a service does not update the schema.
- **One SecurityConfig per service** — each merged service has exactly one `@Bean SecurityFilterChain`. Adding a second causes a bean conflict on startup.
- **Flyway migration numbering** — migrations are sequenced across all merged origins within a service. New migrations must continue from the last `V<N>__` number.
- **PII fields** — PAN and Aadhaar are encrypted at the JPA layer (`EncryptedStringConverter`). Never store plaintext; never log raw PAN numbers.
- **OWASP dependency check** runs on `mvn verify` and fails the build on CVEs with CVSS ≥ 7.
- **`.env` must never be committed** — it is listed in `.gitignore`. Verify with `git check-ignore -v .env`.

---

## Port Reference (outside Docker)

These ports apply when running JARs directly (local dev without Docker).

| Service | Port | Database |
|---|---|---|
| auth-service | 8081 | platform_auth |
| sales-ops-service | 8082 | platform_sales_ops |
| customer-document-service | 8083 | platform_customer_docs |
| loan-core-service | 8084 | platform_loan_core |
| communications-service | 8087 | platform_communications |
| analytics-reporting-service | 8093 | platform_analytics_reporting |
| Frontend dev server | 3000 | — |
| MySQL (local docker-compose) | 3307 | — |
| RabbitMQ AMQP (local) | 5673 | — |
| RabbitMQ UI (local) | 15673 | — |
| Redis (local) | 6381 | — |
| LocalStack S3 (local) | 4566 | — |
