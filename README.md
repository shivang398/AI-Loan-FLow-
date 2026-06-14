# Realmoney Advisory Platform

An end-to-end loan distribution management system for **Realmoney Advisory Solution**. Loan connectors (DSAs) originate leads, relationship managers (RMs) manage connectors, and the platform routes applications through eligibility checks, policy matching, and disbursement tracking.

---

## What this platform does

1. A customer submits a loan enquiry.
2. A **Connector** (DSA) picks up the lead, submits documents, and triggers a soft CIBIL pull.
3. The platform checks eligibility (income, FOIR, CIBIL score) and generates a downloadable credit report.
4. It matches the application to the right bank or NBFC based on lending policy rules.
5. A **Sales Manager** is auto-assigned and the file is tracked through every stage.
6. On disbursement, commissions are calculated and logged automatically.
7. **Operations** staff handle WhatsApp communication and day-to-day queries.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js 20 + Express + TypeScript |
| Database | MySQL 8 — 6 separate schemas, one Prisma client each |
| Cache / JWT revocation | Redis 7 |
| Message broker | RabbitMQ 3 (topic exchange `platform.exchange`) |
| File storage | AWS S3 (LocalStack for local dev) |
| Frontend | React 19 + Vite 5 + Ant Design 5 + Redux Toolkit 2 |
| Reverse proxy | Nginx (serves SPA, proxies `/api/*` to backend) |
| Auth | Stateless JWT — HS256, 15-min access + 7-day refresh |
| CIBIL | Tenacio CRIF Soft Pull API |
| Container runtime | Docker + Docker Compose |

---

## Architecture

```
Internet
   │
   ▼
Frontend container (Nginx :80)
   │  Serves React SPA
   │  Proxies /api/* → backend:8080
   │  WebSocket upgrade for /socket.io/*
   │
   ▼
Backend container (Node.js :8080)
   │  All API routes in a single Express process
   │  Socket.IO for real-time messaging
   │
   ├── MySQL 8 (6 databases via 6 Prisma clients)
   ├── Redis 7 (JWT revocation)
   └── RabbitMQ 3 (async event bus)
```

All backend containers run on an internal Docker network — only the frontend Nginx is exposed on port 80/443.

---

## Route → Database Map

| Route prefix | Prisma client | MySQL database |
|---|---|---|
| `/auth/*` | `authDb` | `platform_auth` |
| `/loans/*`, `/eligibility/*`, `/policies/*` | `loanDb` | `platform_loan_core` |
| `/customers/*`, `/documents/*` | `customerDb` | `platform_customer_docs` |
| `/connectors/*`, `/commissions/*`, `/foir/*`, `/routing/*` | `salesOpsDb` | `platform_sales_ops` |
| `/messaging/*`, `/notifications/*` | `commsDb` | `platform_communications` |
| `/analytics/*`, `/reports/*` | `analyticsDb` | `platform_analytics_reporting` |

---

## User Roles

| Role | Who | Access |
|---|---|---|
| `ADMIN` | Platform owner | Everything |
| `PARTNER_MANAGER` | Senior manager | Connector onboarding, payout slabs |
| `TEAM_LEADER` | Team lead | All RMs and their pipelines |
| `RM` | Relationship Manager | Own connectors, regional dashboard |
| `CONNECTOR` | Loan agent (DSA) | Own dashboard, lead submission, CIBIL check |
| `OPERATIONS` | Back-office | WhatsApp console, ops dashboard |

---

## Local Development

### Prerequisites

- Docker + Docker Compose
- Node.js 20+

### Step 1 — Start infrastructure

```bash
cd platform
docker compose up -d          # MySQL 8, RabbitMQ 3, Redis 7, LocalStack S3
docker compose ps             # wait until all healthy (~30 s)
```

Ports: MySQL `:3307`, RabbitMQ AMQP `:5673` (UI `:15673`), Redis `:6381`, LocalStack `:4566`.

### Step 2 — Configure backend

```bash
cd platform/backend
cp .env.example .env
# Edit .env — at minimum fill in JWT_SECRET (32+ chars)
# All DB URLs, Redis, RabbitMQ are pre-filled for local docker-compose ports

npm install
npm run prisma:generate   # run once on clean checkout
npm run dev               # hot-reload dev server on :8080
```

### Step 3 — Start frontend

```bash
cd platform/frontend
npm install --legacy-peer-deps
npm run dev               # Vite dev server on :3000, proxies /api/* to :8080
```

### Prisma migrations

```bash
cd platform/backend
npm run prisma:migrate:auth      # platform_auth
npm run prisma:migrate:loan      # platform_loan_core
npm run prisma:migrate:customer  # platform_customer_docs
npm run prisma:migrate:salesops  # platform_sales_ops
npm run prisma:migrate:comms     # platform_communications
npm run prisma:migrate:analytics # platform_analytics_reporting
```

---

## Production — AWS EC2 + RDS

Recommended production setup: a single **EC2 t3.medium** runs the full stack via Docker Compose, with **RDS MySQL 8** as a separate managed database.

### Cost estimate

| Resource | Spec | $/month |
|---|---|---|
| EC2 t3.medium (2 vCPU, 4 GB) | Backend + Frontend + Redis + RabbitMQ | ~$35 |
| RDS MySQL 8 db.t3.micro | Single-AZ, 20 GB gp3 | ~$16 |
| S3 | Document storage | ~$2 |
| Elastic IP | Static public IP | ~$4 |
| **Total** | | **~$57/month** |

### One-command EC2 bootstrap

```bash
# 1. Launch an EC2 t3.medium with Amazon Linux 2023 and your key pair
# 2. Run the setup script over SSH
ssh ec2-user@YOUR_EC2_IP "bash -s" < deploy/setup-ec2.sh
```

The script installs Docker, clones the repo to `/opt/realmoney`, and registers a systemd service that starts the platform on every boot.

### First-time configuration

```bash
ssh ec2-user@YOUR_EC2_IP

# Create the 6 databases on RDS (run once)
mysql -h YOUR_RDS_ENDPOINT -u root -p < /opt/realmoney/platform/init-mysql-databases.sh

# Configure environment
cd /opt/realmoney/platform
nano backend/.env   # see env var table below — fill in RDS URLs, JWT_SECRET, AWS keys
nano .env           # CORS_ORIGIN=https://yourdomain.com, MYSQL_ROOT_PASSWORD (for reference only)

# Build images and start
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Check health
docker compose -f docker-compose.prod.yml ps
curl http://localhost/api/health
```

### HTTPS / TLS

```bash
# Install Certbot (Amazon Linux 2023)
sudo dnf install -y certbot
# Amazon Linux 2: sudo amazon-linux-extras install epel -y && sudo yum install -y certbot

# Stop Nginx temporarily to free port 80
docker compose -f /opt/realmoney/platform/docker-compose.prod.yml stop frontend

# Issue certificate
sudo certbot certonly --standalone -d yourdomain.com

# Update CORS_ORIGIN in .env
sed -i 's|CORS_ORIGIN=.*|CORS_ORIGIN=https://yourdomain.com|' /opt/realmoney/platform/.env

# Restart
docker compose -f /opt/realmoney/platform/docker-compose.prod.yml up -d
```

For automated TLS renewal, add `certbot renew --pre-hook "docker stop frontend" --post-hook "docker start frontend"` to cron.

---

## CI/CD — GitHub Actions

Push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
1. Build backend and frontend Docker images
2. Push to Amazon ECR
3. SSH to EC2 and run `deploy/update.sh`

**Required GitHub Actions secrets:**

| Secret | Value |
|---|---|
| `EC2_HOST` | EC2 public IP or hostname |
| `EC2_USER` | `ec2-user` (Amazon Linux default) |
| `EC2_SSH_KEY` | Contents of your `.pem` key file (`cat ~/Downloads/yourkey.pem`) |
| `AWS_ACCESS_KEY_ID` | IAM access key with ECR push permissions |
| `AWS_SECRET_ACCESS_KEY` | IAM secret |
| `AWS_ACCOUNT_ID` | 12-digit AWS account ID |
| `AWS_REGION` | e.g. `ap-south-1` |

---

## Environment Variables Reference

### `platform/.env` (Docker Compose level)

| Variable | Default | Purpose |
|---|---|---|
| `APP_VERSION` | `latest` | Docker image tag |
| `HTTP_PORT` | `80` | Host port that the frontend binds to |
| `CORS_ORIGIN` | `http://localhost` | Allowed CORS origin — set to your domain in prod |
| `MYSQL_ROOT_PASSWORD` | `password` | MySQL root password (local dev only; prod uses RDS) |
| `RABBITMQ_USER` | `guest` | RabbitMQ username |
| `RABBITMQ_PASS` | `guest` | RabbitMQ password |

### `platform/backend/.env` (Application secrets)

| Variable | Required | Purpose |
|---|---|---|
| `JWT_SECRET` | ✅ | Min 32 chars. Generate: `openssl rand -hex 32` |
| `AUTH_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_auth` |
| `LOAN_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_loan_core` |
| `CUSTOMER_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_customer_docs` |
| `SALESOPS_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_sales_ops` |
| `COMMS_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_communications` |
| `ANALYTICS_DATABASE_URL` | ✅ | `mysql://user:pass@host:3306/platform_analytics_reporting` |
| `REDIS_HOST` | ✅ | `redis` (Docker) or `localhost` (local dev) |
| `REDIS_PORT` | ✅ | `6379` |
| `RABBITMQ_URL` | ✅ | `amqp://user:pass@rabbitmq:5672` |
| `AWS_REGION` | ✅ | e.g. `ap-south-1` |
| `AWS_ACCESS_KEY_ID` | ✅ | IAM key with S3 permissions |
| `AWS_SECRET_ACCESS_KEY` | ✅ | IAM secret |
| `AWS_S3_BUCKET` | ✅ | S3 bucket name for documents |
| `AWS_S3_ENDPOINT` | — | Only for local dev (LocalStack URL). Omit in production. |
| `TENACIO_CRIF_URL` | — | CIBIL soft pull API endpoint |
| `TENACIO_CRIF_CLIENT_ID` | — | Tenacio client ID |
| `TENACIO_CRIF_API_KEY` | — | Tenacio API key |
| `TENACIO_CRIF_WORKFLOW_ID` | — | Tenacio workflow ID |
| `WHATSAPP_ACCESS_TOKEN` | — | Meta WhatsApp API token |
| `WHATSAPP_PHONE_NUMBER_ID` | — | WhatsApp phone number ID |
| `WHATSAPP_VERIFY_TOKEN` | — | Webhook verify token |
| `SMTP_HOST` | — | SMTP server for email notifications |
| `SMTP_PORT` | — | Usually `587` |
| `SMTP_USER` | — | SMTP username |
| `SMTP_PASS` | — | SMTP password / app password |

---

## Health Monitoring

```bash
# All container statuses and health
docker compose -f platform/docker-compose.prod.yml ps

# Backend health endpoint
curl http://localhost/api/health

# Tail backend logs
docker compose -f platform/docker-compose.prod.yml logs -f backend

# RabbitMQ management UI — access via SSH tunnel only
# ssh -L 15672:localhost:15672 ec2-user@YOUR_EC2_IP
# Then open http://localhost:15672 (credentials set in .env)
```

---

## Creating the First Admin User

```bash
# 1. Register via the public endpoint
curl -X POST http://YOUR_SERVER/api/auth/register/partner \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realmoneygroups.in","password":"StrongPass@123","name":"Admin"}'

# 2. Promote to ADMIN in MySQL
mysql -h YOUR_RDS_ENDPOINT -u root -p platform_auth << 'SQL'
UPDATE user_roles
   SET role = 'ADMIN'
 WHERE user_id = (SELECT id FROM users WHERE email = 'admin@realmoneygroups.in');
SQL
```

---

## Deploying Updates

### Automatic via GitHub Actions (recommended)

Push to `main` — the CI/CD pipeline builds new images, pushes to ECR, and SSHes into EC2 to run a rolling update. No manual steps needed.

### Manual update on EC2

```bash
ssh ec2-user@YOUR_EC2_IP
cd /opt/realmoney
git pull
bash deploy/update.sh
```

`update.sh` rebuilds only changed images and restarts affected containers with zero downtime for static assets.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Container won't start | `docker compose -f docker-compose.prod.yml logs <service>` |
| Backend shows unhealthy | Wait 30 s for `start_period`; check `GET /health` |
| 502 Bad Gateway | Backend not yet healthy or crashed — check logs |
| 401 on every request | `JWT_SECRET` changed between restarts — must stay constant |
| CORS blocked in browser | `CORS_ORIGIN` must exactly match the browser origin (including `https://`) |
| RabbitMQ exchange not found | Backend retries automatically — wait 30 s |
| MySQL connection refused | Check `DATABASE_URL` host and port in `backend/.env` |
| CIBIL shows score 1 | "NH" (No History) from bureau — not a bug |
| Out of disk on EC2 | `docker system prune -f` clears unused images |

---

## Security Controls

| OWASP Top 10 | Implementation |
|---|---|
| Broken access control | `requireRoles()` middleware on every protected route |
| Cryptographic failures | JWT HS256 with min-32-char secret; bcrypt cost 12; HSTS via nginx |
| Injection | Prisma parameterised queries — no raw SQL string concatenation |
| Security misconfiguration | Helmet.js headers; `X-Frame-Options: DENY`; CSP; no stack traces in prod responses |
| Auth failures | JWT revocation in Redis on logout; Redis fail-open so outage never blocks valid users |
| JWT in logs | nginx `ws_safe` log format redacts `token=` from WebSocket upgrade requests |

---

## Project Structure

```
Auditor/
├── platform/
│   ├── backend/
│   │   ├── prisma/              # 6 schema files (one per database)
│   │   ├── src/
│   │   │   ├── config/          # prisma.ts, redis.ts, rabbitmq.ts, s3.ts
│   │   │   ├── middleware/      # auth, roles, error
│   │   │   ├── routes/          # one file per domain
│   │   │   └── services/        # business logic
│   │   ├── Dockerfile
│   │   └── .env.example
│   ├── frontend/
│   │   ├── src/features/        # dashboard, connector, loans, analytics, etc.
│   │   ├── nginx.conf.template
│   │   └── Dockerfile
│   ├── docker-compose.yml           # local dev: MySQL, Redis, RabbitMQ, LocalStack
│   ├── docker-compose.services.yml  # local dev: backend + frontend
│   ├── docker-compose.prod.yml      # production: RDS + real S3, restart:always
│   └── init-mysql-databases.sh      # creates 6 databases on first run
├── deploy/
│   ├── setup-ec2.sh             # one-command EC2 bootstrap
│   └── update.sh                # rolling update on EC2
└── .github/workflows/
    └── deploy.yml               # CI/CD: build → ECR → deploy on push to main
```
