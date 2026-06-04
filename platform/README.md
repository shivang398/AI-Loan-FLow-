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

The platform runs as **6 merged backend services** (consolidated from 13 for simpler deployment and lower infrastructure cost):

| Service | What it actually does |
|---|---|
| **auth-service** | The security guard. Every user logs in here, gets a digital pass (JWT token), and every other service checks that pass before doing anything. |
| **sales-ops-service** | Everything sales-related in one place — Connector and RM profiles, FOIR (debt-to-income) calculations, payout slabs, commission transactions, and automatic Sales Manager assignment. |
| **customer-document-service** | Stores customer/lead information (name, PAN, Aadhaar, mobile, employment) and manages all file uploads and downloads (salary slips, bank statements, ID proofs) stored securely in S3. |
| **loan-core-service** | The heart of the platform. Tracks the full lifecycle of a loan application, runs eligibility checks (FOIR + CIBIL via Tenacio API), and enforces each bank's lending rules. |
| **communications-service** | All outbound and inbound communication — WhatsApp messages to customers, an internal real-time team chat (WebSocket/STOMP), and email notifications for status changes and reminders. |
| **analytics-reporting-service** | Generates Excel/PDF reports (MIS summaries, connector performance, monthly disbursements) and provides KPI dashboards (daily/weekly trends, team scorecards, funnel conversion rates). |
| **Frontend (React)** | The browser application every user sees. Role-aware — each role (Admin, RM, Connector, etc.) sees a different dashboard. |

---

## System Workflow — Complete Journey

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                    REAL MONEY ADVISORY PLATFORM — LOAN WORKFLOW                  ║
╚══════════════════════════════════════════════════════════════════════════════════╝

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 1 — LEAD CAPTURE  (loan-core-service :8084)                          │
 └─────────────────────────────────────────────────────────────────────────────┘

  [Customer]
      │  Fills loan form on website
      ▼
  [loan-core-service — eligibility sub-module]
      │  • Checks FOIR (Fixed Obligation to Income Ratio)
      │  • Runs CIBIL score lookup via Tenacio API
      │  • Evaluates against bank policy rules
      │  • Returns: ELIGIBLE / BORDERLINE / NOT_ELIGIBLE
      │
      ├─ NOT_ELIGIBLE ──► Return rejection reason (no further action)
      │
      └─ ELIGIBLE / BORDERLINE ──► Lead saved, event fired ──►


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 2 — CUSTOMER & KYC  (customer-document-service :8083)                │
 └─────────────────────────────────────────────────────────────────────────────┘

  [customer-document-service — customer sub-module]
      │  • Stores customer profile (name, PAN, Aadhaar, mobile, employment)
      │  • Creates KYC record
      │  • Fires event: customer.created ──► RabbitMQ ──► loan-core-service
      │
  [customer-document-service — document sub-module]
      │  • Connector uploads salary slips, bank statements, ID proofs → S3
      │  • Generates pre-signed download URLs for bank submissions
      │
      ▼


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 3 — LOAN APPLICATION  (loan-core-service :8084)                      │
 └─────────────────────────────────────────────────────────────────────────────┘

  [loan-core-service — loan sub-module]
      │  Receives event: customer.created
      │  Creates LoanFile with status: NEW
      │
      │  Status lifecycle:
      │
      │  NEW
      │   │
      │   ▼
      │  DOCUMENTS_PENDING  ◄── Connector uploads docs
      │   │
      │   ▼
      │  UNDER_REVIEW       ◄── Operations team reviews the file
      │   │
      │   ├─ ADDITIONAL_INFO_REQUIRED ──► communications-service sends WhatsApp/email
      │   │
      │   ▼
      │  APPROVED ──► Fires event: loan.status.updated ──► RabbitMQ
      │   │
      │   ├──► sales-ops-service (routing sub-module: auto-assigns Sales Manager)
      │   ├──► communications-service (emails customer + Connector)
      │   └──► sales-ops-service (commission sub-module: creates pending entry)
      │
      │  DISBURSED ──► Fires event: loan.file.disbursed
      │   │
      │   └──► sales-ops-service (commission sub-module: marks as payable)
      │
      └─ REJECTED ──► communications-service (sends rejection reason)


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 4 — BANK MATCHING  (loan-core-service :8084)                         │
 └─────────────────────────────────────────────────────────────────────────────┘

  [loan-core-service — policy sub-module]      [loan-core-service — eligibility sub-module]
       │                                              │
       │  Stores each bank's rules:                   │  Runs loan file against all
       │  • Min income                                │  bank policies:
       │  • Max loan amount                           │  • FOIR check per bank
       │  • Allowed employment types                  │  • Amount within bank limits
       │  • CIBIL score cutoff                        │  • Score ≥ bank threshold
       │                                              │
       └─────────────────────┬────────────────────────┘
                             │
                             ▼
                 Shortlist of eligible lenders
                 shown to Connector for bank selection


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 5 — SM ASSIGNMENT  (sales-ops-service — routing sub-module)          │
 └─────────────────────────────────────────────────────────────────────────────┘

  [sales-ops-service — routing sub-module]
      │  Listens for: loan.status.updated (APPROVED)
      │  • Finds the Sales Manager with fewest active files in the same region
      │  • Assigns SM to the loan file
      │  • Fires event: routing.sm.assigned (for future consumer)
      │
      └─ No UI — fully event-driven background process


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 6 — COMMISSION  (sales-ops-service — commission sub-module)          │
 └─────────────────────────────────────────────────────────────────────────────┘

  [sales-ops-service — commission sub-module]
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
 │  PHASE 7 — COMMUNICATION  (communications-service :8087)                    │
 └─────────────────────────────────────────────────────────────────────────────┘

  [communications-service — notification sub-module]
       │  Sends emails for:
       │  • New lead assigned
       │  • Status changes
       │  • Commission credited
       │  • Rejection with reason

  [communications-service — messaging sub-module]
       │  • WhatsApp messages to customers via Facebook API
       │  • Internal team STOMP chat (WebSocket)
       │  • Team meeting WebSocket


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 8 — REPORTING & ANALYTICS  (analytics-reporting-service :8093)       │
 └─────────────────────────────────────────────────────────────────────────────┘

  [analytics-reporting-service — reporting sub-module]
       │  Generates on-demand:
       │  • Connector performance Excel
       │  • MIS monthly summary PDF
       │  • Lender-wise disbursement report
       │  • Commission statement PDF

  [analytics-reporting-service — analytics sub-module]
       │  Pre-computes KPI snapshots:
       │  • Daily disbursal trend
       │  • Funnel conversion rates
       │  • Team scorecards
       │  • Regional performance


 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  EVENT BUS — RabbitMQ  (platform.exchange — topic type)                     │
 └─────────────────────────────────────────────────────────────────────────────┘

  Publisher                     Routing Key               Consumer(s)
  ───────────────────────────   ──────────────────────    ──────────────────────────────
  auth-service              ──► auth.user.created      ──► sales-ops-service (connector)
  customer-document-service ──► customer.created       ──► loan-core-service
  loan-core-service         ──► loan.file.created      ──► communications-service
  loan-core-service         ──► loan.status.updated    ──► communications-service
                                                       ──► sales-ops-service (routing)
  sales-ops-service         ──► routing.sm.assigned    ──► (future consumer)
  communications-service    ──► whatsapp.send.queue    ──► WhatsAppMessageConsumer
  communications-service    ──► whatsapp.webhook.queue ──► WhatsAppWebhookConsumer
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
     [Spring Boot services — 6 total, each on its own port]
          │              │              │
          └──────────────┴──────────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
         Amazon RDS    Redis      RabbitMQ
         PostgreSQL   (cache)   (event bus)
          (6 DBs)     on EC2      on EC2
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
| EC2 t3.large (8 GB RAM) | All 6 services + Nginx | ~$60 |
| RDS PostgreSQL db.t3.micro | Single-AZ | ~$15 |
| S3 | Documents storage | ~$2 |
| Elastic IP | Static public IP | ~$4 |
| **Total** | | **~$81/month** |

> Reduced from ~$156/month (13-service setup) to ~$81/month thanks to the service consolidation. Use `t3.medium` (4 GB) for staging/dev.

---

### Step 1 — Launch EC2 instance

1. Open **EC2 → Launch Instance** in the AWS Console.
2. Choose **Ubuntu 24.04 LTS**.
3. Instance type: `t3.large` (prod) or `t3.medium` (dev/staging).
4. Storage: **30 GB gp3** root volume.
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
3. DB instance class: `db.t3.micro` (dev) / `db.t3.small` (prod).
4. DB instance identifier: `platform-db`
5. Master username: `postgres`
6. Master password: choose a strong password — save it, you will need it below.
7. **Connectivity**: same VPC as your EC2. Security group must allow **port 5432 inbound from the EC2 instance's security group only** (not from the internet).
8. Initial database name: `postgres` (leave default — Step 9 creates the 6 app databases).
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

### Step 5 — Install Java on EC2

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
git clone https://github.com/shivang398/AI-Loan-FLow-.git
cd AI-Loan-FLow-/platform
```

---

### Step 7 — Build all service JARs

On the EC2 instance:

```bash
export MVN=/home/ubuntu/platform/maven/apache-maven-3.9.6/bin/mvn

cd /home/ubuntu/platform
$MVN clean package -DskipTests -T4 --no-transfer-progress
```

This produces a runnable `.jar` inside each `<service>/target/` folder. Takes about 3–5 minutes.

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

# ── CORS — set to your actual frontend domain in production ──────────────────
CORS_ALLOWED_ORIGIN=https://yourdomain.com

# ── AWS — IAM role handles credentials, no keys needed ──────────────────────
AWS_REGION=us-east-1
AWS_S3_BUCKET=realmoneygroups-documents-prod

# ── Email ─────────────────────────────────────────────────────────────────────
MAIL_USERNAME=notifications@realmoneygroups.in
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# ── WhatsApp (optional — leave blank to disable) ─────────────────────────────
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=
EOF

chmod 600 /home/ubuntu/platform/.env.prod
```

---

### Step 9 — Create the 6 databases on RDS

Run this once — it creates all the application databases on your RDS instance.

```bash
sudo apt-get install -y postgresql-client

export PGPASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE

psql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -U postgres << 'SQL'
CREATE DATABASE platform_auth;
CREATE DATABASE platform_sales_ops;
CREATE DATABASE platform_customer_docs;
CREATE DATABASE platform_loan_core;
CREATE DATABASE platform_communications;
CREATE DATABASE platform_analytics_reporting;
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

### Step 11 — Start all 6 backend services

```bash
cat > /home/ubuntu/platform/start-services.sh << 'SCRIPT'
#!/bin/bash
set -a
source /home/ubuntu/platform/.env.prod
set +a

BASEDIR=/home/ubuntu/platform
LOGDIR=$BASEDIR/logs
mkdir -p "$LOGDIR"

declare -A SERVICES=(
  [auth-service]=8081
  [sales-ops-service]=8082
  [customer-document-service]=8083
  [loan-core-service]=8084
  [communications-service]=8087
  [analytics-reporting-service]=8093
)

for svc in "${!SERVICES[@]}"; do
  port="${SERVICES[$svc]}"
  jar="$BASEDIR/$svc/target/$svc-1.0.0-SNAPSHOT.jar"
  log="$LOGDIR/$svc.log"
  echo "Starting $svc on :$port ..."
  nohup java -Xmx768m -jar "$jar" --server.port=$port > "$log" 2>&1 &
  echo $! > "/tmp/${svc}.pid"
done

echo ""
echo "All services launched. Waiting 60s for startup..."
sleep 60

echo ""
echo "=== Health Check ==="
for port in 8081 8082 8083 8084 8087 8093; do
  s=$(curl -s --max-time 3 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  printf "  :%s  %s\n" "$port" "$s"
done
SCRIPT

chmod +x /home/ubuntu/platform/start-services.sh
/home/ubuntu/platform/start-services.sh
```

All 6 should print `UP`. If any show `DOWN`, check `logs/<service>.log`.

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

# Configure Nginx to proxy /api/* to each service
sudo tee /etc/nginx/sites-available/platform << 'NGINX'
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # React SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Auth
    location /api/auth/     { proxy_pass http://localhost:8081/auth/; }
    # Sales ops (connectors, commission, routing)
    location /api/connectors/  { proxy_pass http://localhost:8082/connectors/; }
    location /api/transactions/ { proxy_pass http://localhost:8082/transactions/; }
    location /api/slabs/       { proxy_pass http://localhost:8082/slabs/; }
    location /api/routing/     { proxy_pass http://localhost:8082/routing/; }
    location /api/foir/        { proxy_pass http://localhost:8082/foir/; }
    # Customer & documents
    location /api/customers/   { proxy_pass http://localhost:8083/customers/; }
    location /api/documents/   { proxy_pass http://localhost:8083/documents/; }
    # Loan core (loans, eligibility, policy)
    location /api/loans/       { proxy_pass http://localhost:8084/loans/; }
    location /api/eligibility/ { proxy_pass http://localhost:8084/eligibility/; }
    location /api/policy/      { proxy_pass http://localhost:8084/policy/; }
    # Communications (messaging, notifications, webhooks)
    location /api/messaging/   { proxy_pass http://localhost:8087/messaging/; }
    location /api/notifications/ { proxy_pass http://localhost:8087/notifications/; }
    location /api/webhooks/    { proxy_pass http://localhost:8087/webhooks/; }
    # Analytics & reporting
    location /api/analytics/   { proxy_pass http://localhost:8093/analytics/; }
    location /api/reporting/   { proxy_pass http://localhost:8093/reporting/; }
    # WebSocket (messaging)
    location /ws-messaging {
        proxy_pass http://localhost:8087;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/platform /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

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

Also update `.env.prod` so CORS allows your real domain:
```bash
CORS_ALLOWED_ORIGIN=https://yourdomain.com
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

# Rebuild only what changed — e.g. loan-core-service
export MVN=/home/ubuntu/platform/maven/apache-maven-3.9.6/bin/mvn
$MVN -pl common-lib,loan-core-service -am package -DskipTests -q

# Kill the old process and start the new JAR
fuser -k 8084/tcp
source /home/ubuntu/platform/.env.prod
nohup java -Xmx768m -jar loan-core-service/target/loan-core-service-1.0.0-SNAPSHOT.jar \
  --server.port=8084 >> logs/loan-core-service.log 2>&1 &
echo "loan-core-service restarted"

# If frontend changed:
cd /home/ubuntu/platform/frontend && npm run build
sudo cp -r dist/* /usr/share/nginx/html/
```

---

## Health monitoring

```bash
# Check all 6 services at once
for port in 8081 8082 8083 8084 8087 8093; do
  s=$(curl -s --max-time 2 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  echo "$port: $s"
done

# Tail a specific service log
tail -f /home/ubuntu/platform/logs/loan-core-service.log

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
| `DB_PASSWORD` missing | Services refuse to start without it — make sure `.env.prod` is sourced |
| 502 Bad Gateway in browser | The backend service crashed — check its log and restart it |
| Out of memory (OOM) | `free -h` — the `-Xmx768m` flag in `start-services.sh` caps each service's heap |
| RabbitMQ unreachable | `docker compose -f docker-compose.infra.yml ps` — restart if unhealthy |
| S3 upload fails | Verify EC2 IAM role has `s3:PutObject` and `s3:GetObject` on the correct bucket |
| Flyway error on startup | Check log for "non-empty schema" — ensure `baseline-on-migrate: true` is set |
| CORS blocked in browser | Set `CORS_ALLOWED_ORIGIN` in `.env.prod` to your actual frontend domain |
| Login blocked for all users | Confirm email domain is `@realmoneygroups.in` or `@realfinserv.com` |

---

## Service and port reference

| Service | Port | Database | Contains |
|---|---|---|---|
| auth-service | 8081 | platform_auth | JWT, BCrypt, roles, lockout |
| sales-ops-service | 8082 | platform_sales_ops | connector, commission, sm-routing |
| customer-document-service | 8083 | platform_customer_docs | customer, document/S3 |
| loan-core-service | 8084 | platform_loan_core | loan, eligibility, policy |
| communications-service | 8087 | platform_communications | messaging/WhatsApp, notification |
| analytics-reporting-service | 8093 | platform_analytics_reporting | analytics, reporting/MIS |
| Frontend (Nginx) | 80 / 443 | — | React SPA |
| RabbitMQ | 5672 / 15672 (UI) | — | Event bus |
| Redis | 6379 | — | Cache |

---

## Security — OWASP Top 10

Every service enforces:

| Control | Implementation |
|---|---|
| Broken Access Control (A01) | Role-based `authorizeHttpRequests` on every endpoint; method-level `@PreAuthorize` |
| Cryptographic Failures (A02) | HSTS on all services; BCrypt cost 12; JWT signed with HMAC-SHA256; min 32-char secret enforced at startup |
| Injection (A03) | `@Valid`/`@Validated` on all controller inputs; parameterised JPQL only — no string-concatenated queries |
| Security Misconfiguration (A05) | `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy`; `server.error.include-stacktrace: never` in all services; CORS allowlist via `CORS_ALLOWED_ORIGIN` |
| Vulnerable Components (A06) | OWASP dependency-check runs on `mvn verify` and fails on CVSS ≥ 7 |
| Auth Failures (A07) | Rate limiting (5 req/min/IP on login); account lockout after 5 failed attempts; refresh tokens in httpOnly cookies |
| Data Integrity (A08) | `ObjectMapper.deactivateDefaultTyping()` in every service; `FAIL_ON_UNKNOWN_PROPERTIES` disabled |
| Security Logging (A09) | `SecurityEventLogger` (common-lib) logs every `ACCESS_DENIED` event to `SECURITY_AUDIT` stream; `SecurityAuditLog` in auth-service logs every login, lockout, and registration |

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

The `/auth/register` endpoint requires the caller to already be an ADMIN. For first-time setup:

```bash
# 1. Create any user via the public endpoint
curl -X POST http://localhost:8081/auth/register/partner \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realmoneygroups.in","password":"StrongPass@123"}'

# 2. Promote to ADMIN in RDS
export PGPASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE
psql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -U postgres -d platform_auth << 'SQL'
UPDATE user_roles
   SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
 WHERE user_id = (SELECT id FROM users WHERE email = 'admin@realmoneygroups.in');
SQL
```
