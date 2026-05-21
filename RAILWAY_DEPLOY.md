# Railway Deployment Guide

This guide explains how to deploy the complete microservices platform to Railway.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Railway Project                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌─────────────────────────────────┐  │
│  │   Frontend       │───▶│  Nginx (with API proxy routes)  │  │
│  │   (Nginx)        │    └─────────────────────────────────┘  │
│  └──────────────────┘                                          │
│           │                                                    │
│           └─────────┬──────────────────────┬──────────┬────┬──┤
│                     │                      │          │    │  │
│    ┌────────────────▼──────────────┐       │          │    │  │
│    │   Backend Java Services       │       │          │    │  │
│    │   (15 Spring Boot services)   │       │          │    │  │
│    │   auth, customer, loan, etc.  │       │          │    │  │
│    └───────────────┬────────────────┘       │          │    │  │
│                    │                        │          │    │  │
│    ┌───────────────▼──────────┐  ┌──────────▼──┐  ┌───▼──┐│  │
│    │   PostgreSQL             │  │   Redis     │  │RabbitMQ
│    │   (14 databases)         │  │             │  │      ││  │
│    └──────────────────────────┘  └─────────────┘  └───────┘│  │
│                                                             │  │
└─────────────────────────────────────────────────────────────┘  │
```

## Step 1: Git Setup

Ensure your repository is initialized and pushed to GitHub:

```bash
cd /home/shivang/Desktop/Auditor
git init
git add .
git commit -m "Add Railway deployment configuration"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "GitHub" and authorize Railway to access your repositories
4. Select this repository and the `main` branch
5. Name your project (e.g., "financial-platform")

## Step 3: Add Database Services

### PostgreSQL (Primary Database)

1. In Railway dashboard, click "+ Add Service"
2. Select "PostgreSQL"
3. In the PostgreSQL settings:
   - Go to "Variables" tab
   - No additional configuration needed (Railway provides `DATABASE_URL` automatically)
4. Note the connection string for later

### Redis

1. Click "+ Add Service"
2. Select "Redis"
3. No configuration needed (Railway provides `REDIS_URL` automatically)

### RabbitMQ

Railway doesn't provide a built-in RabbitMQ addon. Options:

**Option A: Use Community RabbitMQ Template (Recommended)**
1. Click "+ Add Service"
2. Click "Docker" / "Docker Image"
3. Image: `rabbitmq:3-management-alpine`
4. Set these environment variables in Railway:
   - `RABBITMQ_DEFAULT_USER=guest`
   - `RABBITMQ_DEFAULT_PASS=guest`
5. Set ports: `5672` (AMQP), `15672` (Management UI)

**Option B: Use External RabbitMQ**
- Configure an external RabbitMQ service and set env vars to point to it

## Step 4: Add Backend Java Microservices

Railway will auto-detect services, but for better control, manually add each:

1. In Railway dashboard, click "+ Add Service"
2. Select "Repo"
3. Point to your GitHub repository
4. Configure the service:

**Service Configuration (repeat for each of the 15 services):**

```
Service: auth-service
├── Name: auth-service
├── Root Directory: platform
├── Dockerfile: Dockerfile
├── Build Arguments: SERVICE_NAME=auth-service
└── Environment Variables: (see Step 5)

Repeat with:
  - connector-service (SERVICE_NAME=connector-service)
  - customer-service (SERVICE_NAME=customer-service)
  - loan-service (SERVICE_NAME=loan-service)
  - eligibility-service (SERVICE_NAME=eligibility-service)
  - policy-service (SERVICE_NAME=policy-service)
  - sm-routing-service (SERVICE_NAME=sm-routing-service)
  - rm-tracking-service (SERVICE_NAME=rm-tracking-service)
  - query-service (SERVICE_NAME=query-service)
  - document-service (SERVICE_NAME=document-service)
  - notification-service (SERVICE_NAME=notification-service)
  - commission-service (SERVICE_NAME=commission-service)
  - reporting-service (SERVICE_NAME=reporting-service)
  - analytics-service (SERVICE_NAME=analytics-service)
  - messaging-service (SERVICE_NAME=messaging-service)
```

## Step 5: Environment Variables

### For ALL Java Backend Services

Set these environment variables (Railway Dashboard → [Service Name] → Variables):

```bash
# Database (Railway PostgreSQL)
DB_HOST=${{POSTGRES.PGHOST}}
DB_PORT=${{POSTGRES.PGPORT}}
DB_USER=${{POSTGRES.PGUSER}}
DB_PASSWORD=${{POSTGRES.PGPASSWORD}}

# RabbitMQ
RABBITMQ_HOST=${{RABBITMQ.RAILWAY_PRIVATE_URL}}  # Or your external RabbitMQ host
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# Redis
REDIS_HOST=${{REDIS.RAILWAY_PRIVATE_URL}}
REDIS_PORT=6379

# JWT (change to your own values in production)
JWT_EXPIRY_MS=900000
JWT_SECRET=your-production-secret-here

# AWS S3 (for document-service and messaging-service)
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_ENDPOINT=https://your-bucket.s3.amazonaws.com  # or use LocalStack
AWS_S3_BUCKET=your-bucket-name

# Notification Service Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Messaging Service (WhatsApp integration - optional)
WHATSAPP_API_URL=https://graph.facebook.com/v19.0
WHATSAPP_PHONE_ID=your-phone-id
WHATSAPP_TOKEN=your-access-token
WHATSAPP_VERIFY_TOKEN=your-verify-token
WHATSAPP_APP_SECRET=your-app-secret
```

**Replace `${{SERVICE_NAME.VARIABLE}}` syntax with Railway variable references:**
- `${{POSTGRES.PGHOST}}` → Railway PostgreSQL host
- `${{REDIS.RAILWAY_PRIVATE_URL}}` → Railway Redis URL
- etc.

### For Frontend Service Only

```bash
# Backend service URLs (these default to Railway internal hostnames)
# Only set if using external services or different naming

AUTH_SERVICE_URL=auth-service.railway.internal:8080
CONNECTOR_SERVICE_URL=connector-service.railway.internal:8080
CUSTOMER_SERVICE_URL=customer-service.railway.internal:8080
LOAN_SERVICE_URL=loan-service.railway.internal:8080
ELIGIBILITY_SERVICE_URL=eligibility-service.railway.internal:8080
POLICY_SERVICE_URL=policy-service.railway.internal:8080
COMMISSION_SERVICE_URL=commission-service.railway.internal:8080
MESSAGING_SERVICE_URL=messaging-service.railway.internal:8080
RM_SERVICE_URL=rm-tracking-service.railway.internal:8080
QUERY_SERVICE_URL=query-service.railway.internal:8080
DOCUMENT_SERVICE_URL=document-service.railway.internal:8080
REPORTING_SERVICE_URL=reporting-service.railway.internal:8080
ANALYTICS_SERVICE_URL=analytics-service.railway.internal:8080
ROUTING_SERVICE_URL=sm-routing-service.railway.internal:8080
```

## Step 6: Database Initialization

Railway PostgreSQL comes with one default database. You need to create the 14 required databases:

1. **Via Railway CLI:**

```bash
# Install Railway CLI (if not already installed)
npm i -g @railway/cli

# Login
railway login

# Connect to PostgreSQL
railway connect postgres

# Run initialization script
\c postgres
CREATE DATABASE platform_auth;
CREATE DATABASE platform_connector;
CREATE DATABASE platform_customer;
CREATE DATABASE platform_loan;
CREATE DATABASE platform_eligibility;
CREATE DATABASE platform_policy;
CREATE DATABASE platform_routing;
CREATE DATABASE platform_rm_tracking;
CREATE DATABASE platform_query;
CREATE DATABASE platform_document;
CREATE DATABASE platform_notification;
CREATE DATABASE platform_commission;
CREATE DATABASE platform_reporting;
CREATE DATABASE platform_analytics;
CREATE DATABASE platform_messaging;
```

2. **Via Railway Dashboard:**
   - Connect to your PostgreSQL service using a database client (pgAdmin, DBeaver, etc.)
   - Run the same CREATE DATABASE commands

## Step 7: Configure Network

### Private Network Access

Railway services communicate via a private network. Ensure:

1. All services are in the same Railway project
2. Environment variables reference other services using Railway's internal hostnames:
   - Format: `{service-name}.railway.internal:{port}`
   - Example: `auth-service.railway.internal:8080`

### Public Access

Only the frontend should be publicly accessible:

1. Frontend service:
   - Go to Railway Dashboard → Frontend → Networking
   - Enable "Public networking" ✓
   - Note the public URL (e.g., `https://frontend-xyz.railway.app`)

2. Backend services:
   - Disable "Public networking" (keep internal only)
   - Frontend proxies all requests to them internally

## Step 8: Deploy

1. In Railway Dashboard, all services should show "Deploying"
2. Wait for all builds to complete (this may take 5-10 minutes)
3. Once all services show green checkmarks, the platform is live

### Verify Deployment:

```bash
# Check frontend
curl https://your-frontend-url.railway.app

# Check health of a backend service (via frontend proxy)
curl https://your-frontend-url.railway.app/api/auth/health

# Check via Railway CLI
railway logs -s auth-service
railway logs -s customer-service
# etc.
```

## Step 9: Post-Deployment Tasks

### 1. Initialize Test Data

```bash
# Via frontend (replace with your Railway URL)
FRONTEND_URL="https://your-frontend-url.railway.app"

# Register user
curl -X POST $FRONTEND_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@platform.com","password":"Admin@123"}'

# Login
curl -X POST $FRONTEND_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@platform.com","password":"Admin@123"}'
```

### 2. Monitor Logs

Use Railway CLI to monitor logs:

```bash
railway logs -s auth-service --tail
railway logs -s customer-service --tail
# ... etc
```

### 3. Database Backups

Configure PostgreSQL backups in Railway Dashboard:
- PostgreSQL service → Backups tab
- Enable automatic backups

### 4. Enable Monitoring

Railway provides built-in monitoring:
- Dashboard → Project → Observability
- Set up alerts for service restarts, high CPU/memory, etc.

## Troubleshooting

### Service Won't Start

**Check logs:**
```bash
railway logs -s auth-service
```

**Common issues:**
- Database not initialized → Run Step 6 database setup
- Missing environment variables → Verify all required env vars are set
- Wrong SERVICE_NAME build arg → Check Railway build configuration

### Backend Services Can't Connect

**Check networking:**
```bash
# SSH into frontend container via Railway CLI
railway shell -s frontend

# Test connection to backend
nc -zv auth-service.railway.internal 8080
```

**Common issues:**
- Private network not enabled → Check all services are in same project
- Hostname mismatch → Verify service names match env var configurations
- Port mismatch → Ensure all services listen on port 8080

### Database Connection Errors

**Verify database credentials:**
```bash
# Check PostgreSQL variables
railway variables -s postgres

# Test connection
psql postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/platform_auth
```

**Verify all 14 databases exist:**
```bash
railway connect postgres
\l
```

## Monitoring & Operations

### Key Metrics

1. **Response Times:** Dashboard → Observability → Network
2. **Error Rates:** Dashboard → Observability → Errors
3. **Deployments:** Dashboard → Deployments tab

### Common Operations

```bash
# Restart a service
railway redeploy -s auth-service

# Redeploy all services
railway redeploy

# Tail logs from multiple services
railway logs

# Check service health
railway status
```

## Security Checklist

- [ ] Change default RabbitMQ credentials
- [ ] Configure HTTPS (Railway auto-provisions SSL)
- [ ] Rotate JWT secret in production
- [ ] Enable database backups
- [ ] Configure database encryption
- [ ] Use strong email credentials for notifications
- [ ] Limit public API access if needed
- [ ] Enable Railway's Web Security features

## Next Steps

1. **Frontend Configuration:**
   - Update frontend environment for production (CDN, caching, etc.)
   - Configure custom domain (if desired)

2. **Monitoring:**
   - Set up log aggregation (Datadog, New Relic, etc.)
   - Configure alerts for critical errors

3. **Load Testing:**
   - Use tools like k6, JMeter to test under load
   - Monitor resource utilization in Railway Dashboard

4. **CI/CD Pipeline:**
   - Configure GitHub Actions to automatically deploy on push
   - Add test stages to deployment pipeline

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Railway CLI Reference](https://docs.railway.app/cli/documentation)
- [Spring Boot on Railway](https://docs.railway.app/guides/springboot)
- [React/Vite on Railway](https://docs.railway.app/guides/nodejs)

## Support

For issues with:
- **Railway Platform:** [Railway Support](https://railway.app/support)
- **Application:** Check logs, verify environment variables, ensure database is initialized
- **Deployment:** Review Railway documentation for monorepo deployments
