# Real Money Advisory Platform

A complete loan distribution management system built for **Real Money Groups** and **Real Finserv**. It connects loan agents (called Connectors) with banks, tracks every step of a loan application, and gives managers full visibility over their teams.

---

## What does this platform do — in plain words?

Think of it like an **internal CRM + loan pipeline + commission tracker** built specifically for a DSA (Direct Selling Agent) business. Here is the full journey:

1. A customer visits the website and fills a loan enquiry form.
2. A **Connector** (loan agent) picks up the lead and submits documents.
3. The platform automatically checks if the customer qualifies for a loan (income, EMI capacity).
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
| Database | **MySQL 8.0.44** (migrated from PostgreSQL) |
| Migrations | Flyway 11 |
| Message broker | RabbitMQ 3 |
| Cache | Redis 7 |
| File storage | Amazon S3 (LocalStack for local dev) |
| Frontend | React 19, Vite 5, Ant Design 5, Redux Toolkit 2 |
| Auth | Stateless JWT (jjwt 0.12.5), BCrypt cost 12 |
| Build | Maven 3.9.6 (bundled — do not use system mvn) |

---

## What each service does — plain English

The platform runs as **6 merged backend services** (consolidated from 13 for simpler deployment and lower infrastructure cost):

| Service | Port | Database | What it does |
|---|---|---|---|
| **auth-service** | 8081 | `platform_auth` | The security guard. Login, JWT tokens, BCrypt passwords, account lockout, role management. |
| **sales-ops-service** | 8082 | `platform_sales_ops` | Everything sales-related — Connector and RM profiles, FOIR calculations, commission slabs, payout ledger, and automatic Sales Manager assignment. |
| **customer-document-service** | 8083 | `platform_customer_docs` | Stores customer/lead information (name, PAN, Aadhaar, mobile) and manages file uploads to S3. PAN and Aadhaar are **AES-256-GCM encrypted at rest**. |
| **loan-core-service** | 8084 | `platform_loan_core` | The heart of the platform. Tracks the full loan lifecycle, runs eligibility checks (FOIR + CIBIL via Tenacio API), and enforces each bank's lending rules. |
| **communications-service** | 8087 | `platform_communications` | All outbound and inbound communication — WhatsApp messages, internal real-time team chat (WebSocket/STOMP), and email notifications. |
| **analytics-reporting-service** | 8093 | `platform_analytics_reporting` | Generates Excel/PDF reports (MIS summaries, connector performance) and provides KPI dashboards (daily trends, team scorecards). |
| **Frontend (React)** | 3000 | — | Role-aware browser app. Each role sees a different dashboard. |

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
      └─ ELIGIBLE / BORDERLINE ──► Lead saved ──►

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 2 — CUSTOMER & KYC  (customer-document-service :8083)                │
 └─────────────────────────────────────────────────────────────────────────────┘

  [customer-document-service — customer sub-module]
      │  • Stores customer profile (PAN encrypted with AES-256-GCM)
      │  • Creates KYC record
      │  • Fires event: customer.created ──► RabbitMQ ──► loan-core-service
      │
  [customer-document-service — document sub-module]
      │  • Connector uploads salary slips, bank statements, ID proofs → S3
      │  • File type validated by MIME + magic bytes before upload

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  PHASE 3 — LOAN APPLICATION  (loan-core-service :8084)                      │
 └─────────────────────────────────────────────────────────────────────────────┘

  NEW → DOCUMENTS_PENDING → UNDER_REVIEW → APPROVED / REJECTED → DISBURSED

  On APPROVED:
      ├──► sales-ops-service (routing) — auto-assigns Sales Manager
      ├──► communications-service — emails customer + Connector
      └──► sales-ops-service (commission) — creates pending commission entry

  On DISBURSED:
      └──► sales-ops-service (commission) — marks commission as payable

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
     [6 Spring Boot services — each on its own port]
          │              │              │
          └──────────────┴──────────────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
          Amazon RDS    Redis      RabbitMQ
         MySQL 8.0.44  (cache)   (event bus)
          (6 databases)  on EC2    on EC2
                         │
                     Amazon S3
                  (document files)
```

---

## Security — OWASP Top 10 Coverage

| Control | Implementation |
|---|---|
| **A01 Broken Access Control** | Role-based `authorizeHttpRequests` on every endpoint; `@PreAuthorize` on sensitive operations |
| **A02 Cryptographic Failures** | HSTS on all services; BCrypt cost 12; JWT HMAC-SHA256; min 32-char secret enforced at startup; **PAN/Aadhaar AES-256-GCM encrypted at rest** |
| **A03 Injection** | `@Valid`/`@Validated` on all controller inputs; parameterised JPQL only — no string-concatenated queries |
| **A05 Misconfiguration** | `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy` on all services; `server.error.include-stacktrace: never`; CORS allowlist via `CORS_ALLOWED_ORIGIN` env var |
| **A06 Vulnerable Components** | OWASP dependency-check runs on `mvn verify`, fails on CVSS ≥ 7; all dependencies at latest patched versions |
| **A07 Auth Failures** | Redis-backed distributed rate limiting (5 req/min/IP on login); account lockout after 5 failed attempts; JWT revocation via Redis blocklist on logout |
| **A08 Data Integrity** | `ObjectMapper.deactivateDefaultTyping()` on all services; file uploads validated by MIME type + magic bytes |
| **A09 Security Logging** | `SecurityEventLogger` (common-lib) logs every `ACCESS_DENIED` to `SECURITY_AUDIT` log stream; auth-service logs every login, lockout, and registration event |

---

## Local Development

### Prerequisites

- Java 25 (JDK)
- Docker + Docker Compose
- Node.js 20+
- Maven 3.9.6 — **use the bundled one**: `platform/maven/apache-maven-3.9.6/bin/mvn`

### Step 1 — Start infrastructure

```bash
cd platform
docker compose up -d
docker compose ps    # wait until all 4 containers are healthy (~30s)
```

This starts:
- **MySQL 8.0.44** on `localhost:3307` — 6 databases auto-created
- **RabbitMQ 3** on `localhost:5673` (UI: `localhost:15673`)
- **Redis 7** on `localhost:6381`
- **LocalStack S3** on `localhost:4566`

### Step 2 — Build and run backend

```bash
export MVN=~/Desktop/Auditor/maven/apache-maven-3.9.6/bin/mvn
cd platform

# Install common-lib first on a clean checkout
$MVN -pl common-lib install -DskipTests -q

# Start all 6 services at once
./start-all.sh
```

Or start a single service manually:

```bash
$MVN -pl common-lib,auth-service -am package -DskipTests -q

java -jar auth-service/target/auth-service-1.0.0-SNAPSHOT.jar \
  -DDB_HOST=localhost -DDB_PORT=3307 -DDB_USER=root -DDB_PASSWORD=password \
  -DJWT_SECRET=LocalDevSecretMustBeAtLeast32CharsLong! \
  -DRABBITMQ_HOST=localhost -DRABBITMQ_PORT=5673 \
  -DRABBITMQ_USER=guest -DRABBITMQ_PASS=guest \
  -DREDIS_HOST=localhost -DREDIS_PORT=6381
```

### Step 3 — Start frontend

```bash
cd platform/frontend
npm install --legacy-peer-deps
npm run dev    # dev server on :3000, proxies /api/* to backend services
```

### Required env vars

Every service needs at minimum:

```
DB_PASSWORD=password              # MySQL root password
DB_USER=root                      # MySQL user
DB_PORT=3307                      # MySQL port
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
JWT_SECRET=<any-string-32-chars+>
INTERNAL_SERVICE_TOKEN=<any-string>   # shared secret for inter-service calls
```

Optional (safe to leave empty locally):
- `PII_ENCRYPTION_KEY` — 32-char AES key for PAN/Aadhaar encryption (dev fallback used if missing)
- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`
- `MAIL_USERNAME`, `MAIL_PASSWORD`
- `CORS_ALLOWED_ORIGIN` — defaults to `http://localhost:3000`

---

## Deployment — EC2 + RDS MySQL + S3

### Estimated cost

| Resource | Spec | $/month |
|---|---|---|
| EC2 t3.large (8 GB RAM) | All 6 services + Nginx | ~$60 |
| RDS MySQL db.t3.small | Single-AZ, MySQL 8.0 | ~$25 |
| S3 | Documents storage | ~$2 |
| Elastic IP | Static public IP | ~$4 |
| **Total** | | **~$91/month** |

---

### Step 1 — Launch EC2 instance

1. Open **EC2 → Launch Instance** in the AWS Console.
2. Choose **Amazon Linux 2** (AMI search: `amzn2-ami-hvm`).
3. Instance type: `t3.large` (prod) or `t3.medium` (dev/staging).
4. Storage: **30 GB gp3** root volume.
5. Security Group — open these ports:

   | Port | Source | Purpose |
   |---|---|---|
   | 22 | Your IP only | SSH |
   | 80 | 0.0.0.0/0 | HTTP |
   | 443 | 0.0.0.0/0 | HTTPS |

6. Create or select a key pair and download the `.pem` file.
7. Allocate and associate an **Elastic IP**.

---

### Step 2 — Create RDS MySQL 8.0

1. Open **RDS → Create database**.
2. Engine: **MySQL 8.0.44** (or latest 8.0.x).
3. DB instance class: `db.t3.micro` (dev) / `db.t3.small` (prod).
4. DB instance identifier: `platform-db`
5. Master username: `root` (or any user you prefer)
6. Master password: choose a strong password — save it.
7. **Connectivity**: same VPC as your EC2. Security group must allow **port 3306 inbound from the EC2 security group only**.
8. Additional config → Initial database name: leave blank (Step 9 creates the 6 databases).
9. Note the **Endpoint** after the instance creates.

---

### Step 3 — Create S3 bucket

1. Open **S3 → Create bucket**.
2. Bucket name: `realmoneygroups-documents-prod`.
3. Region: same as EC2.
4. **Block all public access**: ON.

---

### Step 4 — Create IAM role for EC2

1. **IAM → Roles → Create role** → Trusted entity: **EC2**.
2. Attach policy: `AmazonS3FullAccess` (or scoped to your bucket).
3. Role name: `platform-ec2-role`.
4. Attach to your EC2 instance via **Actions → Security → Modify IAM role**.

---

### Step 5 — Install Java and Docker on EC2

```bash
ssh -i your-key.pem ec2-user@<your-elastic-ip>
```

Install Java 25 (Temurin via Adoptium RPM repo):

```bash
# Add Adoptium yum repository
cat > /etc/yum.repos.d/adoptium.repo << 'EOF'
[Adoptium]
name=Adoptium
baseurl=https://packages.adoptium.net/artifactory/rpm/amazonlinux/2/x86_64/
enabled=1
gpgcheck=1
gpgkey=https://packages.adoptium.net/artifactory/api/gpg/key/public
EOF

yum install -y temurin-25-jdk
java -version    # should print openjdk 25
```

If `temurin-25-jdk` is not yet in the repo, install from the binary tarball instead:

```bash
cd /tmp
wget -q "https://github.com/adoptium/temurin25-binaries/releases/download/jdk-25.0.2%2B9/OpenJDK25U-jdk_x64_linux_hotspot_25.0.2_9.tar.gz" \
  -O temurin-25.tar.gz

mkdir -p /usr/local/java
tar -xzf temurin-25.tar.gz -C /usr/local/java/

JAVA_DIR=$(ls /usr/local/java/ | grep jdk-25)
cat > /etc/profile.d/java.sh << EOF
export JAVA_HOME=/usr/local/java/$JAVA_DIR
export PATH=\$JAVA_HOME/bin:\$PATH
EOF

source /etc/profile.d/java.sh
java -version    # should print openjdk 25
```

Install Docker (for RabbitMQ + Redis containers):

```bash
amazon-linux-extras install -y docker
systemctl start docker
systemctl enable docker
docker --version
```

Install Docker Compose v2:

```bash
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL "https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
docker compose version    # should print v2.27.0
```

---

### Step 6 — Copy the project to EC2

```bash
rsync -av --exclude='node_modules' --exclude='target' --exclude='.git' \
  /path/to/Auditor/platform/ \
  ec2-user@<your-elastic-ip>:/home/ec2-user/platform/
```

Or clone from GitHub (recommended — no local rsync needed):

```bash
yum install -y git
git clone https://github.com/shivang398/AI-Loan-FLow-.git /home/ec2-user/platform
```

---

### Step 7 — Build all service JARs

```bash
export MVN=/home/ec2-user/platform/maven/apache-maven-3.9.6/bin/mvn
cd /home/ec2-user/platform
$MVN clean package -DskipTests -T4 --no-transfer-progress
```

Takes about 3–5 minutes.

---

### Step 8 — Create the environment file

```bash
cat > /home/ec2-user/platform/.env.prod << 'EOF'
# ── Database (RDS MySQL) ─────────────────────────────────────────────────────
DB_HOST=platform-db.xxxx.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_STRONG_RDS_PASSWORD_HERE

# ── Message broker ────────────────────────────────────────────────────────────
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# ── Cache ─────────────────────────────────────────────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379

# ── Security ──────────────────────────────────────────────────────────────────
# Generate: openssl rand -hex 32
JWT_SECRET=REPLACE_WITH_64_CHAR_HEX

# Shared secret for inter-service calls — generate: openssl rand -hex 16
INTERNAL_SERVICE_TOKEN=REPLACE_WITH_RANDOM_STRING

# AES-256 key for PAN/Aadhaar encryption — generate: openssl rand -hex 16
PII_ENCRYPTION_KEY=REPLACE_WITH_32_CHAR_KEY

# ── CORS ──────────────────────────────────────────────────────────────────────
CORS_ALLOWED_ORIGIN=https://yourdomain.com

# ── AWS ───────────────────────────────────────────────────────────────────────
AWS_REGION=ap-south-1
AWS_S3_BUCKET=realmoneygroups-documents-prod

# ── Email ─────────────────────────────────────────────────────────────────────
MAIL_USERNAME=notifications@realmoneygroups.in
MAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# ── WhatsApp (optional) ───────────────────────────────────────────────────────
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=
EOF
chmod 600 /home/ec2-user/platform/.env.prod
```

---

### Step 9 — Create the 6 MySQL databases on RDS

```bash
yum install -y mysql

mysql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -uroot -pYOUR_PASSWORD << 'SQL'
CREATE DATABASE platform_auth               CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE platform_sales_ops          CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE platform_customer_docs      CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE platform_loan_core          CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE platform_communications     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE platform_analytics_reporting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SQL
echo "Databases created."
```

---

### Step 10 — Start RabbitMQ and Redis

```bash
cat > /home/ec2-user/platform/docker-compose.infra.yml << 'EOF'
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
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"
EOF

docker compose -f /home/ec2-user/platform/docker-compose.infra.yml up -d
sleep 15
docker compose -f /home/ec2-user/platform/docker-compose.infra.yml ps
```

---

### Step 11 — Start all 6 backend services

```bash
cat > /home/ec2-user/platform/start-services.sh << 'SCRIPT'
#!/bin/bash
set -a
source /home/ec2-user/platform/.env.prod
set +a

BASEDIR=/home/ec2-user/platform
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

echo "Waiting 60s for startup..."
sleep 60

echo ""
echo "=== Health Check ==="
for port in 8081 8082 8083 8084 8087 8093; do
  s=$(curl -s --max-time 3 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  printf "  :%s  %s\n" "$port" "$s"
done
SCRIPT

chmod +x /home/ec2-user/platform/start-services.sh
/home/ec2-user/platform/start-services.sh
```

All 6 should print `UP`. If any show `DOWN`, check `logs/<service>.log`.

---

### Step 12 — Build and serve the frontend

```bash
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

cd /home/ec2-user/platform/frontend
npm install --legacy-peer-deps
npm run build     # output in frontend/dist/

amazon-linux-extras install -y nginx1
```

Create the Nginx config (Amazon Linux 2 uses `/etc/nginx/conf.d/`, not `sites-available/`):

```bash
cat > /etc/nginx/conf.d/platform.conf << 'NGINX'
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / { try_files $uri $uri/ /index.html; }

    # Auth
    location /api/auth/     { proxy_pass http://localhost:8081/auth/; }
    # Sales Ops (connectors, commissions, routing, FOIR)
    location /api/connectors/   { proxy_pass http://localhost:8082/connectors/; }
    location /api/transactions/ { proxy_pass http://localhost:8082/transactions/; }
    location /api/slabs/        { proxy_pass http://localhost:8082/slabs/; }
    location /api/foir/         { proxy_pass http://localhost:8082/foir/; }
    location /api/routing/      { proxy_pass http://localhost:8082/routing/; }
    # Customer & Documents
    location /api/customers/    { proxy_pass http://localhost:8083/customers/; }
    location /api/documents/    { proxy_pass http://localhost:8083/documents/; }
    # Loan Core (loans, eligibility, policy, BSA)
    location /api/loans/        { proxy_pass http://localhost:8084/loans/; }
    location /api/eligibility/  { proxy_pass http://localhost:8084/eligibility/; }
    location /api/policies/     { proxy_pass http://localhost:8084/policies/; }
    location /api/bsa/          { proxy_pass http://localhost:8084/bsa/; }
    # Communications (messaging, notifications, webhooks)
    location /api/messaging/    { proxy_pass http://localhost:8087/messaging/; }
    location /api/notifications/ { proxy_pass http://localhost:8087/notifications/; }
    location /api/webhooks/     { proxy_pass http://localhost:8087/webhooks/; }
    # Analytics & Reporting
    location /api/analytics/    { proxy_pass http://localhost:8093/analytics/; }
    location /api/reports/      { proxy_pass http://localhost:8093/reports/; }
    # WebSocket
    location /ws-messaging {
        proxy_pass http://localhost:8087;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
NGINX

cp -r /home/ec2-user/platform/frontend/dist/* /usr/share/nginx/html/
nginx -t && systemctl restart nginx && systemctl enable nginx
```

Your platform is now live at `http://<your-elastic-ip>`.

---

### Step 13 — Add HTTPS

```bash
amazon-linux-extras install -y epel
yum install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
# Update CORS_ALLOWED_ORIGIN in .env.prod to https://yourdomain.com
```

---

### Step 14 — Auto-start on reboot

```bash
tee /etc/systemd/system/platform.service << 'EOF'
[Unit]
Description=Real Money Platform
After=docker.service network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=ec2-user
ExecStart=/bin/bash -c \
  'docker compose -f /home/ec2-user/platform/docker-compose.infra.yml up -d && \
   sleep 15 && /home/ec2-user/platform/start-services.sh'
ExecStop=/bin/bash -c \
  'pkill -f "1.0.0-SNAPSHOT.jar" 2>/dev/null; \
   docker compose -f /home/ec2-user/platform/docker-compose.infra.yml down'

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable platform.service
```

---

## Deploying updates

```bash
cd /home/ec2-user/platform && git pull

# Rebuild only what changed
export MVN=/home/ec2-user/platform/maven/apache-maven-3.9.6/bin/mvn
$MVN -pl common-lib,loan-core-service -am package -DskipTests -q

# Kill old process and start new JAR
fuser -k 8084/tcp
source /home/ec2-user/platform/.env.prod
nohup java -Xmx768m -jar loan-core-service/target/loan-core-service-1.0.0-SNAPSHOT.jar \
  --server.port=8084 >> logs/loan-core-service.log 2>&1 &
echo "loan-core-service restarted"

# If frontend changed:
cd /home/ec2-user/platform/frontend && npm run build
cp -r dist/* /usr/share/nginx/html/
```

---

## Health monitoring

```bash
# Check all 6 services
for port in 8081 8082 8083 8084 8087 8093; do
  s=$(curl -s --max-time 2 "http://localhost:$port/actuator/health" \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['status'])" 2>/dev/null || echo "DOWN")
  echo "$port: $s"
done

# Tail a specific service log
tail -f /home/ec2-user/platform/logs/loan-core-service.log

# RabbitMQ management UI
# http://<your-ec2-ip>:15672  (login: guest / guest — change in production!)

# MySQL — check tables
mysql -h localhost -uroot -ppassword -e "SELECT TABLE_SCHEMA, COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA LIKE 'platform_%' GROUP BY TABLE_SCHEMA;"
```

---

## Troubleshooting

| Problem | What to do |
|---|---|
| Service won't start | `tail -50 logs/<service>.log` — look for `ERROR` or `APPLICATION FAILED` |
| `Port already in use` | `fuser -k <port>/tcp` then restart the service |
| MySQL connection refused | Check RDS security group allows port 3306 from your EC2 security group |
| `DB_PASSWORD` missing | Services refuse to start — ensure `.env.prod` is sourced |
| 502 Bad Gateway | The backend service crashed — check its log and restart |
| Out of memory | `free -h` — `-Xmx768m` in `start-services.sh` caps each service's heap |
| RabbitMQ unreachable | `docker compose -f docker-compose.infra.yml ps` — restart if unhealthy |
| S3 upload fails | Verify EC2 IAM role has `s3:PutObject` and `s3:GetObject` on the bucket |
| Flyway error on startup | Check log for table errors — likely a MySQL syntax issue in a migration file |
| CORS blocked in browser | Set `CORS_ALLOWED_ORIGIN` in `.env.prod` to your actual frontend domain |
| Login blocked | Confirm email domain is `@realmoneygroups.in` or `@realfinserv.com` |
| UUID insert error in MySQL | Ensure `hibernate.type.preferred_uuid_jdbc_type: CHAR` is in `application.yml` |

---

## Service and port reference

| Service | Port | Database | Merged from |
|---|---|---|---|
| auth-service | 8081 | platform_auth | *(standalone)* |
| sales-ops-service | 8082 | platform_sales_ops | connector + commission + sm-routing |
| customer-document-service | 8083 | platform_customer_docs | customer + document |
| loan-core-service | 8084 | platform_loan_core | loan + eligibility + policy |
| communications-service | 8087 | platform_communications | messaging + notification |
| analytics-reporting-service | 8093 | platform_analytics_reporting | analytics + reporting |
| Frontend (Nginx) | 80 / 443 | — | React SPA |
| RabbitMQ | 5672 / 15672 (UI) | — | Event bus |
| Redis | 6379 | — | Cache / JWT blocklist / Rate limiting |
| MySQL | 3307 (dev) / 3306 (prod) | — | Primary database |

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

```bash
# 1. Register via the public endpoint (CONNECTOR role)
curl -X POST http://localhost:8081/auth/register/partner \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@realmoneygroups.in","password":"StrongPass@123"}'

# 2. Promote to ADMIN in MySQL
mysql -h platform-db.xxxx.us-east-1.rds.amazonaws.com -uroot -pYOUR_PASSWORD platform_auth << 'SQL'
UPDATE user_roles
   SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
 WHERE user_id = (SELECT id FROM users WHERE email = 'admin@realmoneygroups.in');
SQL
```

---

## Key constraints

- **Java 25** — local dev must use JDK 25. The Maven enforcer rejects JDK 26+.
- **Maven 3.9.6** — use the bundled `platform/maven/apache-maven-3.9.6/bin/mvn`. The system mvn (3.8.x) will be rejected by the enforcer.
- **MySQL 8.0.44** — all UUIDs stored as `CHAR(36)`; do not change to binary storage without updating Hibernate config.
- **`ddl-auto: none`** — schema changes require a new Flyway migration file; you cannot just change an entity and restart.
- **One SecurityConfig per service** — each merged service has exactly one `@Bean SecurityFilterChain`. Never add a second one.
- **Flyway migration numbering** — within each merged service, migrations are sequenced across all merged origins. New migrations must continue from the last V number.
- **PII fields** — PAN and Aadhaar are encrypted at the JPA layer (`EncryptedStringConverter`). Never store plaintext; never log raw PAN numbers.
- **OWASP dependency check** runs on `mvn verify` and fails on CVEs with CVSS ≥ 7.
