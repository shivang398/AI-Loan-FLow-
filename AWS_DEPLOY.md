# AWS Deployment Guide

Deploy the complete platform (15 Spring Boot microservices + React frontend) to AWS ECS Fargate.

## Architecture

```
Internet
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  Application Load Balancer (public, port 80/443)                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
              ┌───────────▼───────────┐
              │  Frontend (Nginx/ECS) │  Public subnets
              │  platform-frontend    │  AWS Cloud Map: frontend.platform.local
              └───────────┬───────────┘
                          │ proxies /api/* → backend services
              ┌───────────▼───────────────────────────────────────┐
              │        Private Subnets (ECS Fargate)              │
              │                                                   │
              │  auth-service          connector-service          │
              │  customer-service      loan-service               │
              │  eligibility-service   policy-service             │
              │  sm-routing-service    rm-tracking-service        │
              │  query-service         document-service           │
              │  notification-service  commission-service         │
              │  reporting-service     analytics-service          │
              │  messaging-service     rabbitmq                   │
              │                                                   │
              │  Service discovery: <name>.platform.local:8080   │
              └───────┬────────────────────┬──────────────────────┘
                      │                    │
          ┌───────────▼──────┐  ┌──────────▼──────────┐
          │  RDS PostgreSQL  │  │  ElastiCache Redis   │
          │  (15 databases)  │  │                      │
          └──────────────────┘  └─────────────────────┘
```

**AWS services used:**
- ECS Fargate — container orchestration (no servers to manage)
- RDS PostgreSQL 15 — managed database
- ElastiCache Redis 7 — session cache
- EFS — persistent storage for RabbitMQ
- S3 — document storage
- ECR — container registry
- ALB — load balancer
- Cloud Map — private DNS service discovery
- CloudFormation — infrastructure as code
- GitHub Actions — CI/CD  

---

## Prerequisites

| Tool | Install |
|------|---------|
| AWS CLI v2 | `brew install awscli` or [docs](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) |
| AWS account | With `AdministratorAccess` (or a scoped IAM role) |
| GitHub repository | Push your code to GitHub before deploying |
| jq | `brew install jq` or `apt install jq` |
| psql | For running the DB init script locally (optional) |

---

## Step 1 — Configure AWS CLI

```bash
aws configure
# AWS Access Key ID: <your-key>
# AWS Secret Access Key: <your-secret>
# Default region: us-east-1        ← or your preferred region
# Default output format: json
```

---

## Step 2 — Deploy CloudFormation Infrastructure

This creates VPC, RDS, Redis, ECS cluster, ALB, ECR repos, IAM roles, and Cloud Map.

### 2a. Launch the stack

```bash
aws cloudformation deploy \
  --stack-name platform-infrastructure \
  --template-file aws/cloudformation/infrastructure.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1 \
  --parameter-overrides \
    Environment=prod \
    DBPassword="YourSecureDBPassword123!" \
    RabbitMQPassword="YourRabbitPassword123!" \
    JwtSecret="your-super-secret-jwt-key-at-least-32-characters-long" \
    MailUsername="your-email@gmail.com" \
    MailPassword="your-gmail-app-password" \
    WhatsAppToken="your-whatsapp-token" \
    WhatsAppPhoneId="your-phone-id" \
    WhatsAppVerifyToken="your-verify-token" \
    WhatsAppAppSecret="your-app-secret"
```

> For `dev` environment (cheaper instance sizes, no Multi-AZ):
> Change `Environment=prod` to `Environment=dev`

This takes **10–15 minutes**. Monitor progress:
```bash
aws cloudformation describe-stack-events \
  --stack-name platform-infrastructure \
  --region us-east-1 \
  --query 'StackEvents[*].[ResourceStatus,ResourceType,ResourceStatusReason]' \
  --output table
```

### 2b. Verify and note outputs

```bash
aws cloudformation describe-stacks \
  --stack-name platform-infrastructure \
  --region us-east-1 \
  --query 'Stacks[0].Outputs' \
  --output table
```

You'll need these outputs later (the deploy script fetches them automatically).

### 2c. (Optional) Add HTTPS

If you have a domain, request a certificate in ACM:
```bash
aws acm request-certificate \
  --domain-name your-domain.com \
  --validation-method DNS \
  --region us-east-1
```
Then re-deploy the stack with `CertificateArn=<arn>`.

---

## Step 3 — Initialize RDS Databases

The 15 application databases must be created before the services start.

### Option A — From your local machine (requires VPN or bastion)

```bash
# Get RDS endpoint
RDS_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name platform-infrastructure \
  --region us-east-1 \
  --query "Stacks[0].Outputs[?OutputKey=='RDSEndpoint'].OutputValue" \
  --output text)

# Run the init script
DB_HOST="$RDS_ENDPOINT" \
DB_PASSWORD="YourSecureDBPassword123!" \
bash aws/scripts/setup-rds.sh
```

### Option B — Via a temporary ECS task (recommended, no bastion needed)

```bash
# Get required values
RDS_ENDPOINT=$(aws cloudformation describe-stacks --stack-name platform-infrastructure \
  --query "Stacks[0].Outputs[?OutputKey=='RDSEndpoint'].OutputValue" --output text --region us-east-1)
PRIVATE_SUBNET=$(aws cloudformation describe-stacks --stack-name platform-infrastructure \
  --query "Stacks[0].Outputs[?OutputKey=='PrivateSubnet1Id'].OutputValue" --output text --region us-east-1)
BACKEND_SG=$(aws cloudformation describe-stacks --stack-name platform-infrastructure \
  --query "Stacks[0].Outputs[?OutputKey=='BackendSecurityGroupId'].OutputValue" --output text --region us-east-1)
EXEC_ROLE=$(aws cloudformation describe-stacks --stack-name platform-infrastructure \
  --query "Stacks[0].Outputs[?OutputKey=='ECSTaskExecutionRoleArn'].OutputValue" --output text --region us-east-1)

# Run a one-off psql task in ECS
aws ecs run-task \
  --cluster platform-cluster \
  --launch-type FARGATE \
  --region us-east-1 \
  --network-configuration "awsvpcConfiguration={subnets=[$PRIVATE_SUBNET],securityGroups=[$BACKEND_SG],assignPublicIp=DISABLED}" \
  --overrides "{
    \"containerOverrides\": [{
      \"name\": \"db-init\",
      \"command\": [\"psql\", \"-h\", \"$RDS_ENDPOINT\", \"-U\", \"postgres\", \"-d\", \"postgres\",
        \"-c\", \"CREATE DATABASE platform_auth; CREATE DATABASE platform_connector; CREATE DATABASE platform_customer; CREATE DATABASE platform_loan; CREATE DATABASE platform_eligibility; CREATE DATABASE platform_policy; CREATE DATABASE platform_routing; CREATE DATABASE platform_rm_tracking; CREATE DATABASE platform_query; CREATE DATABASE platform_document; CREATE DATABASE platform_notification; CREATE DATABASE platform_commission; CREATE DATABASE platform_reporting; CREATE DATABASE platform_analytics; CREATE DATABASE platform_messaging;\"],
      \"environment\": [{\"name\": \"PGPASSWORD\", \"value\": \"YourSecureDBPassword123!\"}]
    }]
  }" \
  --task-definition "arn:aws:ecs:us-east-1:$(aws sts get-caller-identity --query Account --output text):task-definition/platform-db-init:1"
```

> Alternatively, connect to RDS via RDS Query Editor in the AWS Console and run the `CREATE DATABASE` statements.

---

## Step 4 — Configure GitHub Actions Secrets

In your GitHub repository: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |
| `DB_PASSWORD` | Same as Step 2 |
| `RABBITMQ_PASSWORD` | Same as Step 2 |
| `JWT_SECRET` | Same as Step 2 |
| `MAIL_USERNAME` | Gmail address (for notifications) |
| `MAIL_PASSWORD` | Gmail app password |
| `WHATSAPP_TOKEN` | WhatsApp API token (optional) |
| `WHATSAPP_PHONE_ID` | WhatsApp phone ID (optional) |
| `WHATSAPP_VERIFY_TOKEN` | WhatsApp verify token (optional) |
| `WHATSAPP_APP_SECRET` | WhatsApp app secret (optional) |

### IAM user for CI (least-privilege)

Create a dedicated IAM user for GitHub Actions (rather than using your root credentials):

```bash
aws iam create-user --user-name platform-github-actions
aws iam attach-user-policy \
  --user-name platform-github-actions \
  --policy-arn arn:aws:iam::aws:policy/AmazonECS_FullAccess
aws iam attach-user-policy \
  --user-name platform-github-actions \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess
aws iam attach-user-policy \
  --user-name platform-github-actions \
  --policy-arn arn:aws:iam::aws:policy/AWSCloudFormationReadOnlyAccess
aws iam attach-user-policy \
  --user-name platform-github-actions \
  --policy-arn arn:aws:iam::aws:policy/AWSServiceCatalogEndUserFullAccess

# Create access key
aws iam create-access-key --user-name platform-github-actions
```

---

## Step 5 — Deploy the Application

Push to `main` — GitHub Actions automatically:
1. Builds all 16 Docker images in parallel and pushes them to ECR
2. Reads CloudFormation outputs (endpoints, subnet IDs, security group IDs)
3. Registers ECS task definitions for all services
4. Creates or updates ECS Fargate services
5. Waits for all services to stabilize

```bash
git add .
git commit -m "Deploy to AWS"
git push origin main
```

Monitor the GitHub Actions workflow in your repo's **Actions** tab.

### Manual deploy (without pushing)

```bash
# Set required env vars
export AWS_REGION=us-east-1
export ECR_REGISTRY="$(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com"
export IMAGE_TAG=manual-$(date +%Y%m%d%H%M%S)

# Build and push images manually
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$ECR_REGISTRY"

# Build each service (run from platform/)
for svc in auth-service connector-service customer-service loan-service eligibility-service \
           policy-service sm-routing-service rm-tracking-service query-service document-service \
           notification-service commission-service reporting-service analytics-service messaging-service; do
  docker build --build-arg SERVICE_NAME=$svc \
    -t "$ECR_REGISTRY/platform-$svc:$IMAGE_TAG" \
    -t "$ECR_REGISTRY/platform-$svc:latest" \
    platform/
  docker push "$ECR_REGISTRY/platform-$svc:$IMAGE_TAG"
  docker push "$ECR_REGISTRY/platform-$svc:latest"
done

# Build frontend
docker build -t "$ECR_REGISTRY/platform-frontend:$IMAGE_TAG" platform/frontend/
docker push "$ECR_REGISTRY/platform-frontend:$IMAGE_TAG"

# Fetch stack outputs and run deploy script
# (set all env vars that deploy.sh expects)
bash aws/scripts/deploy.sh
```

---

## Step 6 — Verify Deployment

```bash
# Get ALB URL
ALB_DNS=$(aws cloudformation describe-stacks \
  --stack-name platform-infrastructure \
  --region us-east-1 \
  --query "Stacks[0].Outputs[?OutputKey=='ALBDNSName'].OutputValue" \
  --output text)

echo "Application URL: http://$ALB_DNS"

# Health check
curl -sf "http://$ALB_DNS/api/auth/actuator/health" | jq .

# Check all ECS services
aws ecs describe-services \
  --cluster platform-cluster \
  --services frontend auth-service customer-service loan-service \
  --region us-east-1 \
  --query 'services[*].[serviceName,runningCount,desiredCount,status]' \
  --output table
```

---

## Monitoring & Operations

### View logs

```bash
# Tail logs for a specific service
aws logs tail /ecs/platform/auth-service --follow --region us-east-1

# Last 100 lines from frontend
aws logs tail /ecs/platform/frontend --since 10m --region us-east-1
```

### ECS Exec (SSH into a running container)

```bash
TASK_ARN=$(aws ecs list-tasks --cluster platform-cluster --service-name auth-service \
  --query 'taskArns[0]' --output text --region us-east-1)

aws ecs execute-command \
  --cluster platform-cluster \
  --task "$TASK_ARN" \
  --container auth-service \
  --interactive \
  --command "/bin/sh" \
  --region us-east-1
```

### Restart a service

```bash
aws ecs update-service \
  --cluster platform-cluster \
  --service auth-service \
  --force-new-deployment \
  --region us-east-1
```

### Scale a service

```bash
aws ecs update-service \
  --cluster platform-cluster \
  --service auth-service \
  --desired-count 2 \
  --region us-east-1
```

---

## Environment Variables Reference

All backend services accept these env vars (set by the deploy script from CloudFormation outputs):

| Variable | Description |
|----------|-------------|
| `DB_HOST` | RDS endpoint |
| `DB_PORT` | `5432` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | RDS master password |
| `DB_NAME` | Per-service database name (e.g. `platform_auth`) |
| `RABBITMQ_HOST` | `rabbitmq.platform.local` (Cloud Map DNS) |
| `RABBITMQ_PORT` | `5672` |
| `RABBITMQ_USER` | `guest` |
| `RABBITMQ_PASS` | RabbitMQ password |
| `REDIS_HOST` | ElastiCache primary endpoint |
| `REDIS_PORT` | `6379` |
| `JWT_SECRET` | JWT signing secret |
| `AWS_REGION` | AWS region |
| `AWS_S3_BUCKET` | S3 bucket name for documents |

Frontend env vars (set in ECS task definition):

| Variable | Default (AWS) |
|----------|---------------|
| `AUTH_SERVICE_URL` | `auth-service.platform.local:8080` |
| `CONNECTOR_SERVICE_URL` | `connector-service.platform.local:8080` |
| `CUSTOMER_SERVICE_URL` | `customer-service.platform.local:8080` |
| `...` | `<name>.platform.local:8080` |

---

## Cost Estimate

| Resource | Spec | $/month (approx) |
|----------|------|-------------------|
| ECS Fargate (16 tasks × 0.5vCPU/1GB) | `us-east-1` | ~$120 |
| RDS PostgreSQL db.t3.medium Multi-AZ | 100 GB gp3 | ~$100 |
| ElastiCache Redis cache.t3.micro | Single | ~$15 |
| ALB | 1 ALB, moderate traffic | ~$20 |
| NAT Gateway | ~10 GB/month | ~$35 |
| EFS | RabbitMQ data | ~$2 |
| ECR | 16 repos | ~$5 |
| CloudWatch Logs | 14-day retention | ~$5 |
| **Total** | | **~$300/month** |

To reduce costs for development:
- Use `Environment=dev` (smaller instances, no Multi-AZ)
- Switch backend services to `FARGATE_SPOT` capacity provider (~70% cheaper)
- Reduce desired count to 0 for non-critical services when idle

---

## Troubleshooting

### Service won't start — check logs

```bash
aws logs tail /ecs/platform/<service-name> --since 30m --region us-east-1
```

Common causes:
- **Database connection refused** → Run Step 3 (database setup) if not done
- **RABBITMQ_HOST not resolving** → RabbitMQ ECS service must be running first; Cloud Map takes ~30s to propagate
- **JWT_SECRET missing** → Check GitHub Actions secrets and CloudFormation parameters
- **Out of memory** → Increase `memory` in the task definition (default: 1024 MB)

### Services can't reach each other

Cloud Map DNS (`*.platform.local`) only works within the same VPC. Verify:
```bash
# ECS Exec into a backend container and test DNS
aws ecs execute-command --cluster platform-cluster \
  --task <task-arn> --container auth-service \
  --interactive --command "nslookup rabbitmq.platform.local"
```

### RDS connection errors

```bash
# Check security group allows backend SG on port 5432
aws ec2 describe-security-groups \
  --group-ids <rds-sg-id> \
  --query 'SecurityGroups[0].IpPermissions'
```

### Image pull errors (ECR auth)

```bash
# The ECS task execution role needs ECR permissions (already included in CloudFormation)
# Verify the role has AmazonECSTaskExecutionRolePolicy attached
aws iam list-attached-role-policies --role-name platform-ecs-execution-role
```

---

## Teardown

```bash
# Delete all ECS services first (to drain tasks)
for svc in frontend rabbitmq auth-service connector-service customer-service loan-service \
           eligibility-service policy-service sm-routing-service rm-tracking-service \
           query-service document-service notification-service commission-service \
           reporting-service analytics-service messaging-service; do
  aws ecs update-service --cluster platform-cluster --service $svc --desired-count 0 --region us-east-1 2>/dev/null || true
  aws ecs delete-service --cluster platform-cluster --service $svc --force --region us-east-1 2>/dev/null || true
done

# Empty S3 bucket (required before CloudFormation can delete it)
BUCKET=$(aws cloudformation describe-stacks --stack-name platform-infrastructure \
  --query "Stacks[0].Outputs[?OutputKey=='DocumentsBucketName'].OutputValue" --output text --region us-east-1)
aws s3 rm "s3://$BUCKET" --recursive

# Delete CloudFormation stack (takes 10-15 min, creates RDS snapshot)
aws cloudformation delete-stack --stack-name platform-infrastructure --region us-east-1
```
