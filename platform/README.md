# Real Money Advisory Platform

A complete loan distribution management system built for **Real Money Groups** and **Real Finserv**. It connects loan agents (called Connectors) with banks, tracks every step of a loan application, and gives managers full visibility over their teams.

---

## What does this platform do — in plain words?

Think of it like an **internal CRM + loan pipeline + commission tracker** built specifically for a DSA (Direct Selling Agent) business. Here is the full journey:

1. A customer visits the website and fills a loan enquiry form.
2. A **Connector** (loan agent) picks up the lead and submits documents.
3. The platform automatically checks if the customer qualifies for a loan (income, EMI capacity).
4. It matches the application to the right bank based on that bank's rules.
5. A **Sales Manager** is auto-assigned to push the file forward.
6. The **RM** (Relationship Manager) monitors their team of Connectors.
7. A **Team Leader** gets a bird's-eye view across all RMs.
8. **Operations** staff handle WhatsApp communication and day-to-day queries.
9. When a loan is disbursed, commissions are calculated and logged automatically.
10. **Admins** and **Partner Managers** manage users, payouts, and platform settings.

---

## What each service does — plain English

| Service | What it actually does |
|---|---|
| **auth-service** | The security guard. Every user logs in here, gets a digital pass (JWT token), and every other service checks that pass before doing anything. Blocks anyone not from `@realmoneygroups.in` or `@realfinserv.com`. |
| **connector-service** | Manages all the loan agents (Connectors) and Relationship Managers — their profiles, which region they cover, their FOIR (debt-to-income) calculations. |
| **customer-service** | Stores customer/lead information — name, PAN, Aadhaar, mobile, employment details. Think of it as the customer folder. |
| **loan-service** | Tracks the full lifecycle of a loan application — from "new lead" through "documents submitted", "under review", "approved", "disbursed", or "rejected". |
| **eligibility-service** | The calculator. Given a customer's income and existing EMIs, it works out the maximum loan they can get and which lenders they qualify for. |
| **policy-service** | Stores each bank's lending rules — minimum income, maximum loan amount, allowed loan types. Acts as the rulebook the eligibility engine checks against. |
| **messaging-service** | Handles WhatsApp messages to customers and an internal team chat (real-time using WebSockets). |
| **document-service** | Manages file uploads and downloads (salary slips, bank statements, ID proofs) stored securely in S3. |
| **notification-service** | Sends email alerts — loan status changes, new assignments, reminders. |
| **commission-service** | Calculates how much each Connector and RM earns when a loan is disbursed. Maintains the full payout ledger. |
| **reporting-service** | Generates Excel and PDF reports — MIS summaries, connector performance, monthly disbursements. |
| **analytics-service** | Provides KPI dashboards — daily/weekly trends, team scorecards, funnel conversion rates. |
| **sm-routing-service** | Automatically assigns a Sales Manager to a loan file based on region and workload when a loan is approved. Runs entirely in the background — no UI. |
| **Frontend (React)** | The browser application every user sees. Role-aware — each role (Admin, RM, Connector, etc.) sees a different dashboard. Served by Nginx which also routes API calls to the right backend service. |

---

## System Workflow — Complete Journey

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                    REAL MONEY ADVISORY PLATFORM — LOAN WORKFLOW                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 1 — LEAD CAPTURE  (Landing Page → eligibility-service)               │
 └─────────────────────────────────────────────────────────────────────────────┘

  [Customer]
      │  Fills loan form on website
      ▼
  [eligibility-service :8085]
      │  • Checks FOIR (Fixed Obligation to Income Ratio)
      │  • Runs CIBIL score lookup via Tenacio API
      │  • Returns: ELIGIBLE / BORDERLINE / NOT_ELIGIBLE
      │
      ├─ NOT_ELIGIBLE ──► Return rejection reason to customer (no further action)
      │
      └─ ELIGIBLE / BORDERLINE ──► Lead saved, event fired ──►


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 2 — CUSTOMER & KYC  (customer-service)                               │
 └─────────────────────────────────────────────────────────────────────────────┘

  [customer-service :8083]
      │  • Stores customer profile (name, PAN, Aadhaar, mobile, employment)
      │  • Creates KYC record
      │  • Fires event: customer.created ──► RabbitMQ ──► loan-service
      │
      │  [document-service :8090]
      │      • Connector uploads salary slips, bank statements, ID proofs → S3
      │      • Generates pre-signed download URLs for bank submissions
      │
      ▼


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 3 — LOAN APPLICATION  (loan-service)                                 │
 └─────────────────────────────────────────────────────────────────────────────┘

  [loan-service :8084]
      │  Receives event: customer.created
      │  Creates LoanFile with status: NEW
      │
      │  Status lifecycle:
      │
      │  NEW
      │   │
      │   ▼
      │  DOCUMENTS_PENDING  ◄── Connector uploads docs via document-service
      │   │
      │   ▼
      │  UNDER_REVIEW       ◄── Operations team reviews the file
      │   │
      │   ├─ ADDITIONAL_INFO_REQUIRED ──► notification-service sends email/WhatsApp
      │   │                               to Connector
      │   ▼
      │  APPROVED ──► Fires event: loan.status.updated ──► RabbitMQ
      │   │
      │   ├──► sm-routing-service (auto-assigns Sales Manager)
      │   ├──► notification-service (emails customer + Connector)
      │   └──► commission-service (creates pending commission entry)
      │
      │  DISBURSED ──► Fires event: loan.file.disbursed
      │   │
      │   └──► commission-service (marks commission as payable)
      │
      └─ REJECTED ──► notification-service (sends rejection reason)


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 4 — BANK MATCHING  (eligibility-service + policy-service)            │
 └─────────────────────────────────────────────────────────────────────────────┘

  [policy-service :8086]            [eligibility-service :8085]
       │                                     │
       │  Stores each bank's rules:          │  Runs loan file against all
       │  • Min income                       │  bank policies:
       │  • Max loan amount                  │  • FOIR check per bank
       │  • Allowed employment types         │  • Amount within bank limits
       │  • Cibil score cutoff               │  • Score ≥ bank threshold
       │                                     │
       └──────────────────┬──────────────────┘
                          │
                          ▼
              Shortlist of eligible lenders
              shown to Connector for bank selection


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 5 — SM ASSIGNMENT  (sm-routing-service — background only)            │
 └─────────────────────────────────────────────────────────────────────────────┘

  [sm-routing-service :8095]
      │  Listens for: loan.status.updated (APPROVED)
      │  • Finds the Sales Manager with fewest active files in the same region
      │  • Assigns SM to the loan file
      │  • Fires event: routing.sm.assigned (for future consumer)
      │
      └─ No UI — fully event-driven background service


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 6 — COMMISSION  (commission-service)                                 │
 └─────────────────────────────────────────────────────────────────────────────┘

  [commission-service :8092]
      │  On loan APPROVED:
      │  • Creates pending commission transaction
      │  • Applies correct payout slab (global or per-Connector)
      │
      │  On loan DISBURSED:
      │  • Marks transaction as PAYABLE
      │  • Partner Manager reviews and approves payout
      │
      └─► Connector + RM can see their earnings in real time


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 7 — COMMUNICATION  (messaging-service + notification-service)        │
 └─────────────────────────────────────────────────────────────────────────────┘

  [notification-service :8091]           [messaging-service :8087]
       │                                        │
       │  Sends emails for:                     │  • WhatsApp messages to
       │  • New lead assigned                   │    customers via Facebook API
       │  • Status changes                      │  • Internal team STOMP chat
       │  • Commission credited                 │  • Team meeting WebSocket
       │  • Rejection with reason               │


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 8 — REPORTING & ANALYTICS  (reporting-service + analytics-service)   │
 └─────────────────────────────────────────────────────────────────────────────┘

  [reporting-service :8093]              [analytics-service :8094]
       │                                        │
       │  Generates on-demand:                  │  Pre-computes KPI snapshots:
       │  • Connector performance Excel         │  • Daily disbursal trend
       │  • MIS monthly summary PDF             │  • Funnel conversion rates
       │  • Lender-wise disbursement report     │  • Team scorecards
       │  • Commission statement PDF            │  • Regional performance


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  CROSS-CUTTING — AUTH & USER MANAGEMENT  (auth-service)                     │
 └─────────────────────────────────────────────────────────────────────────────┘

  [auth-service :8081]  ◄── Every other service validates JWT against this
       │
       │  • Issues JWT on login (8-hour expiry)
       │  • Refresh token via HttpOnly cookie
       │  • Domain restriction: @realmoneygroups.in / @realfinserv.com only
       │  • Per-account lockout: 5 failed attempts → 15-min lock
       │  • Rate limit: 5 login attempts / min / IP
       │  • Security audit log: every login, failure, lockout, registration
       │
       │  Roles and what they see:
       │
       │  ADMIN         ──► Full platform: users, analytics, all dashboards
       │  PARTNER_MANAGER──► Connector onboarding, commission slabs, payouts
       │  TEAM_LEADER   ──► All RMs + their Connectors, team performance
       │  RM            ──► Own Connectors, regional pipeline
       │  CONNECTOR     ──► Own leads, commission tracker, loan status
       │  OPERATIONS    ──► WhatsApp console, ops dashboard, file queries


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  EVENT BUS — RabbitMQ  (platform.exchange — topic type)                     │
 └─────────────────────────────────────────────────────────────────────────────┘

  Publisher             Routing Key               Consumer(s)
  ─────────────────     ──────────────────────    ──────────────────────────
  auth-service      ──► auth.user.created      ──► connector-service
  customer-service  ──► customer.created       ──► loan-service
  loan-service      ──► loan.file.created      ──► notification-service
  loan-service      ──► loan.status.updated    ──► notification-service
                                               ──► sm-routing-service
  sm-routing-service──► routing.sm.assigned    ──► (future consumer)
  messaging-service ──► whatsapp.send.queue    ──► WhatsAppMessageConsumer
  messaging-service ──► whatsapp.webhook.queue ──► WhatsAppWebhookConsumer
```

---

## Architecture Overview

```
Internet → EC2 (Nginx :80/:443)
               │
               ├─ Serves React frontend (static files)
               │
               └─ Proxies /api/* to backend services
                         │
          ┌──────────────┼──────────────┐
          │              │              │
     [Spring Boot services — 13 total, each on its own port]
          │              │              │
          └──────────────┴──────────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
         Amazon RDS    Redis      RabbitMQ
         PostgreSQL   (cache)   (event bus)
         (13 DBs)    on EC2      on EC2
                         │
                     Amazon S3
                  (document files)
```

---

## Deployment — EC2 + RDS + S3

This guide deploys the entire platform on a single AWS EC2 instance using Java JARs and Nginx, with Amazon RDS for the database and Amazon S3 for document storage.

### Estimated cost

| Resource | Spec | $/month |
|---|---|---|
| EC2 t3.xlarge (16 GB RAM) | All 13 services + Nginx | ~$120 |
| RDS PostgreSQL db.t3.medium | Single-AZ | ~$30 |
| S3 | Documents storage | ~$2 |
| Elastic IP | Static public IP | ~$4 |
| **Total** | | **~$156/month** |

> Use `t3.large` (8 GB) for staging/dev — runs fine for small teams. For production with many concurrent users, use `t3.xlarge`.

---

### Step 1 — Launch EC2 instance

1. Open **EC2 → Launch Instance** in the AWS Console.
2. Choose **Ubuntu 24.04 LTS**.
3. Instance type: `t3.xlarge` (prod) or `t3.large` (dev/staging).
4. Storage: **40 GB gp3** root volume.
5. Security Group — open these ports:

   | Port | Source | Purpose |
   |---|---|---|
   | 22 | Your IP only | SSH |
   | 80 | 0.0.0.0/0 | HTTP |
   | 443 | 0.0.0.0/0 | HTTPS |

6. Create or select a key pair and download the `.pem` file.
7. Allocate and associate an **Elastic IP** so the address does not change on restart.

---

### Step 2 — Create RDS PostgreSQL

1. Open **RDS → Create database**.
2. Engine: **PostgreSQL 15**.
3. DB instance class: `db.t3.micro` (dev) / `db.t3.medium` (prod).
4. DB instance identifier: `platform-db`
5. Master username: `postgres`
6. Master password: choose a strong password — save it, you will need it below.
7. **Connectivity**: same VPC as your EC2. Security group must allow **port 5432 inbound from the EC2 instance's security group only** (not from the internet).
8. Initial database name: `postgres` (leave default — Step 9 creates the 13 app databases).
9. Note the **Endpoint** after the instance creates (looks like `platform-db.xxxx.us-east-1.rds.amazonaws.com`).

---

### Step 3 — Create S3 bucket

1. Open **S3 → Create bucket**.
2. Bucket name: `realmoneygroups-documents-prod` (must be globally unique — add a short suffix if taken).
3. Region: same as your EC2.
4. **Block all public access**: ON — files are only accessed by the app, never directly by browsers.

---

### Step 4 — Create IAM role for EC2

This lets the EC2 instance upload and download files from S3 without storing AWS keys anywhere in the code.

1. Open **IAM → Roles → Create role**.
2. Trusted entity: **EC2**.
3. Attach policy: `AmazonS3FullAccess` (or a scoped policy for your specific bucket).
4. Role name: `platform-ec2-role`.
5. In EC2 console → select your instance → **Actions → Security → Modify IAM role** → attach `platform-ec2-role`.

---

### Step 5 — Install Java and Docker on EC2

SSH into the instance:

```bash
ssh -i your-key.pem ubuntu@<your-elastic-ip>
```

Install Java 25 (Temurin):

```bash
wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public \
  | sudo gpg --dearmor -o /usr/share/keyrings/adoptium.gpg

echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] \
  https://packages.adoptium.net/artifactory/deb \
  $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" \
  | sudo tee /etc/apt/sources.list.d/adoptium.list

sudo apt-get update && sudo apt-get install -y temurin-25-jdk
java -version   # should print 25.x
```

Install Docker (needed for RabbitMQ and Redis):

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
sudo apt-get install -y docker-compose-plugin
newgrp docker
```

---

### Step 6 — Copy the project to EC2

From your **local machine**:

```bash
rsync -av --exclude='node_modules' --exclude='target' --exclude='.git' \
  /path/to/Auditor/platform/ \
  ubuntu@<your-elastic-ip>:/home/ubuntu/platform/
```

Or if the project is on GitHub:

```bash
# On the EC2 instance:
git clone https://github.com/your-org/your-repo.git
cd your-repo/platform
```

---

### Step 7 — Build all service JARs

On the EC2 instance:

```bash
export MVN=/home/ubuntu/platform/maven/apache-maven-3.9.6/bin/mvn

cd /home/ubuntu/platform
$MVN clean package -DskipTests -Denforcer.skip=true -T4 --no-transfer-progress
```

This produces a runnable `.jar` file inside each `<service>/target/` folder. Takes about 3–5 minutes.

---

### Step 8 — Create the environment file

```bash
cat > /home/ubuntu/platform/.env.prod << 'EOF'
# ── Database (RDS) ──────────────────────────────────────────────────────────
DB_HOST=platform-db.xxxx.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE

# ── Message broker (runs on this EC2) ───────────────────────────────────────
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# ── Cache (runs on this EC2) ─────────────────────────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379

# ── Security ─────────────────────────────────────────────────────────────────
# Generate with: openssl rand -hex 32
JWT_SECRET=REPLACE_WITH_64_CHAR_HEX_FROM_OPENSSL_RAND

# ── AWS — IAM role handles credentials, no keys needed ──────────────────────
AWS_REGION=us-east-1
AWS_S3_BUCKET=realmoneygroups-documents-prod

# ── Email (optional) ─────────────────────────────────────────────────────────
MAIL_USERNAME=notifications@realmoneygroups.in
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD

# ── WhatsApp (optional — leave blank to disable) ─────────────────────────────
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=
EOF

chmod 600 /home/ubuntu/platform/.env.prod
```

---

### Step 9 — Create the 13 databases on RDS

Run this once — it creates all the application databases on your RDS instance.

```bash
sudo apt-get install -y postgresql-client

export PGPASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE

psql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -U postgres << 'SQL'
CREATE DATABASE platform_auth;
CREATE DATABASE platform_connector;
CREATE DATABASE platform_customer;
CREATE DATABASE platform_loan;
CREATE DATABASE platform_eligibility;
CREATE DATABASE platform_policy;
CREATE DATABASE platform_messaging;
CREATE DATABASE platform_document;
CREATE DATABASE platform_notification;
CREATE DATABASE platform_commission;
CREATE DATABASE platform_reporting;
CREATE DATABASE platform_analytics;
CREATE DATABASE platform_routing;
SQL

echo "Databases created."
```

---

### Step 10 — Start RabbitMQ and Redis

```bash
cat > /home/ubuntu/platform/docker-compose.infra.yml << 'EOF'
services:
  rabbitmq:
    image: rabbitmq:3-management-alpine
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest
    ports:
      - "5672:5672"
      - "15672:15672"
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
EOF

docker compose -f /home/ubuntu/platform/docker-compose.infra.yml up -d

# Wait for healthy
sleep 15
docker compose -f /home/ubuntu/platform/docker-compose.infra.yml ps
```

---

### Step 11 — Start all 13 backend services

```bash
cat > /home/ubuntu/platform/start-services.sh << 'SCRIPT'
#!/bin/bash
# Loads .env.prod and starts all backend JARs
set -a
source /home/ubuntu/platform/.env.prod
set +a

BASEDIR=/home/ubuntu/platform
LOGDIR=$BASEDIR/logs
mkdir -p "$LOGDIR"

declare -A SERVICES=(
  [auth-service]=8081
  [connector-service]=8082
  [customer-service]=8083
  [loan-service]=8084
  [eligibility-service]=8085
  [policy-service]=8086
  [messaging-service]=8087
  [document-service]=8090
  [notification-service]=8091
  [commission-service]=8092
  [reporting-service]=8093
  [analytics-service]=8094
  [sm-routing-service]=8095
)

for svc in "${!SERVICES[@]}"; do
  port="${SERVICES[$svc]}"
  jar="$BASEDIR/$svc/target/$svc-1.0.0-SNAPSHOT.jar"
  log="$LOGDIR/$svc.log"
  echo "Starting $svc on :$port ..."
  nohup java -jar "$jar" --server.port=$port > "$log" 2>&1 &
  echo $! > "/tmp/${svc}.pid"
done

echo ""
echo "All services launched. Waiting 60s for startup..."
sleep 60

echo ""
echo "=== Health Check ==="
for port in 8081 8082 8083 8084 8085 8086 8087 8090 8091 8092 8093 8094 8095; do
  s=$(curl -s --max-time 3 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  printf "  :%s  %s\n" "$port" "$s"
done
SCRIPT

chmod +x /home/ubuntu/platform/start-services.sh
/home/ubuntu/platform/start-services.sh
```

All 13 should print `UP`. If any show `DOWN`, check `logs/<service>.log`.

---

### Step 12 — Build and serve the frontend

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Build the React app
cd /home/ubuntu/platform/frontend
npm install --legacy-peer-deps
npm run build
# Output is in frontend/dist/

# Install Nginx
sudo apt-get install -y nginx

# Generate Nginx config from the template (replace localhost with actual EC2 ports)
export PORT=80
export NAMESERVER=$(grep nameserver /etc/resolv.conf | awk '{print $2}' | head -1)
export AUTH_SERVICE_URL=localhost:8081
export CONNECTOR_SERVICE_URL=localhost:8082
export CUSTOMER_SERVICE_URL=localhost:8083
export LOAN_SERVICE_URL=localhost:8084
export ELIGIBILITY_SERVICE_URL=localhost:8085
export POLICY_SERVICE_URL=localhost:8086
export COMMISSION_SERVICE_URL=localhost:8092
export MESSAGING_SERVICE_URL=localhost:8087
export DOCUMENT_SERVICE_URL=localhost:8090
export REPORTING_SERVICE_URL=localhost:8093
export ANALYTICS_SERVICE_URL=localhost:8094
export ROUTING_SERVICE_URL=localhost:8095

envsubst '${PORT} ${NAMESERVER} ${AUTH_SERVICE_URL} ${CONNECTOR_SERVICE_URL} \
  ${CUSTOMER_SERVICE_URL} ${LOAN_SERVICE_URL} ${ELIGIBILITY_SERVICE_URL} \
  ${POLICY_SERVICE_URL} ${COMMISSION_SERVICE_URL} ${MESSAGING_SERVICE_URL} \
  ${DOCUMENT_SERVICE_URL} ${REPORTING_SERVICE_URL} ${ANALYTICS_SERVICE_URL} \
  ${ROUTING_SERVICE_URL}' \
  < /home/ubuntu/platform/frontend/nginx.conf.template \
  | sudo tee /etc/nginx/nginx.conf > /dev/null

# Deploy frontend static files
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r /home/ubuntu/platform/frontend/dist/* /usr/share/nginx/html/

# Start Nginx
sudo nginx -t && sudo systemctl restart nginx && sudo systemctl enable nginx
```

Your platform is now live at `http://<your-elastic-ip>`.

---

### Step 13 — Add HTTPS with a custom domain (recommended)

Point your domain's DNS A-record to the Elastic IP, then:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run    # verify auto-renewal works
```

---

### Step 14 — Auto-start on reboot

```bash
sudo tee /etc/systemd/system/platform.service << 'EOF'
[Unit]
Description=Real Money Platform
After=docker.service network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ubuntu
ExecStart=/bin/bash -c \
  'docker compose -f /home/ubuntu/platform/docker-compose.infra.yml up -d && \
   sleep 15 && \
   /home/ubuntu/platform/start-services.sh'
ExecStop=/bin/bash -c \
  'pkill -f "1.0.0-SNAPSHOT.jar" 2>/dev/null; \
   docker compose -f /home/ubuntu/platform/docker-compose.infra.yml down'

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable platform.service
echo "Platform will auto-start on every reboot."
```

---

## Deploying updates

When you push new code:

```bash
# On the EC2 instance:
cd /home/ubuntu/platform && git pull

# Rebuild only what changed — e.g. auth-service
export MVN=/home/ubuntu/platform/maven/apache-maven-3.9.6/bin/mvn
$MVN -pl common-lib,auth-service -am package -DskipTests -Denforcer.skip=true -q

# Kill the old process and start the new JAR
fuser -k 8081/tcp
source /home/ubuntu/platform/.env.prod
nohup java -jar auth-service/target/auth-service-1.0.0-SNAPSHOT.jar \
  --server.port=8081 >> logs/auth-service.log 2>&1 &
echo "auth-service restarted"

# If frontend changed:
cd /home/ubuntu/platform/frontend && npm run build
sudo cp -r dist/* /usr/share/nginx/html/
```

---

## Health monitoring

```bash
# Check all 13 services at once
for port in 8081 8082 8083 8084 8085 8086 8087 8090 8091 8092 8093 8094 8095; do
  s=$(curl -s --max-time 2 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  echo "$port: $s"
done

# Tail a specific service log
tail -f /home/ubuntu/platform/logs/auth-service.log

# RabbitMQ management UI — open in browser
# http://<your-ec2-ip>:15672  (login: guest / guest)
# Change this password in production — edit docker-compose.infra.yml

# System memory
free -h
```

---

## Troubleshooting

| Problem | What to do |
|---|---|
| Service won't start | `tail -50 logs/<service>.log` — look for `ERROR` or `APPLICATION FAILED` |
| `Port already in use` | `fuser -k <port>/tcp` then restart the service |
| Database connection refused | Verify RDS security group allows port 5432 from your EC2's private IP |
| `DB_PASSWORD` missing | Services refuse to start without it — make sure `.env.prod` is sourced in `start-services.sh` |
| 502 Bad Gateway in browser | The backend service crashed — check its log and restart it |
| Out of memory (OOM) | `free -h` — add `-Xmx512m` per service in `start-services.sh` to cap heap usage |
| RabbitMQ unreachable | `docker compose -f docker-compose.infra.yml ps` — restart if unhealthy |
| S3 upload fails | Verify EC2 IAM role has `s3:PutObject` and `s3:GetObject` on the correct bucket |
| Flyway error on startup | Check log for "non-empty schema" — ensure `baseline-on-migrate: true` is in `application.yml` |
| Login blocked for all users | Confirm email domain is `@realmoneygroups.in` or `@realfinserv.com` |

---

## Service and port reference

| Service | Port | Database |
|---|---|---|
| auth-service | 8081 | platform_auth |
| connector-service | 8082 | platform_connector |
| customer-service | 8083 | platform_customer |
| loan-service | 8084 | platform_loan |
| eligibility-service | 8085 | platform_eligibility |
| policy-service | 8086 | platform_policy |
| messaging-service | 8087 | platform_messaging |
| document-service | 8090 | platform_document |
| notification-service | 8091 | platform_notification |
| commission-service | 8092 | platform_commission |
| reporting-service | 8093 | platform_reporting |
| analytics-service | 8094 | platform_analytics |
| sm-routing-service | 8095 | platform_routing |
| Frontend (Nginx) | 80 / 443 | — |
| RabbitMQ | 5672 / 15672 (UI) | — |
| Redis | 6379 | — |

---

## Allowed email domains

Only `@realmoneygroups.in` and `@realfinserv.com` addresses can log in or register. Any other domain is rejected at the auth layer with HTTP 403.

---

## User roles

| Role | Who uses it | What they can do |
|---|---|---|
| `ADMIN` | Platform owner | Everything — user management, analytics, all settings |
| `PARTNER_MANAGER` | Senior manager | Onboard Connectors, set commission slabs |
| `TEAM_LEADER` | Team lead | View all RMs and their Connectors |
| `RM` | Relationship Manager | Track their Connectors' pipelines |
| `CONNECTOR` | Loan agent (DSA) | Submit leads, track own applications and commissions |
| `OPERATIONS` | Back-office staff | WhatsApp console, ops dashboard |

### Creating the first Admin user

The `/auth/register` endpoint requires the caller to already be an ADMIN. For first-time setup, use `/auth/register/partner` to create a CONNECTOR, then promote them to ADMIN directly in the database:

```bash
# 1. Create any user via the public endpoint
curl -X POST http://localhost:8081/auth/register/partner \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realmoneygroups.in","password":"StrongPass@123"}'

# 2. Promote to ADMIN in RDS
export PGPASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE
psql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -U postgres -d platform_auth << 'SQL'
INSERT INTO roles (name) VALUES ('ADMIN') ON CONFLICT DO NOTHING;
UPDATE user_roles
   SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
 WHERE user_id = (SELECT id FROM users WHERE email = 'admin@realmoneygroups.in');
SQL
```
