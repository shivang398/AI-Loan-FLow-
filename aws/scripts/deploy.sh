#!/usr/bin/env bash
# deploy.sh — Registers ECS task definitions and creates/updates ECS services.
# Called by GitHub Actions after Docker images have been pushed to ECR.
#
# Required environment variables (injected by CI):
#   IMAGE_TAG, ECR_REGISTRY, AWS_REGION, ECS_CLUSTER,
#   RDS_ENDPOINT, REDIS_ENDPOINT,
#   EXECUTION_ROLE_ARN, TASK_ROLE_ARN, S3_BUCKET,
#   CLOUDMAP_NS_ID, PRIVATE_SUBNET_1, PRIVATE_SUBNET_2,
#   PUBLIC_SUBNET_1, PUBLIC_SUBNET_2,
#   BACKEND_SG, FRONTEND_SG, RABBITMQ_SG,
#   FRONTEND_TG_ARN, EFS_ID,
#   DB_PASSWORD, RABBITMQ_PASSWORD, JWT_SECRET,
#   PII_ENCRYPTION_KEY, INTERNAL_SERVICE_TOKEN,
#   MAIL_USERNAME, MAIL_PASSWORD,
#   SMTP_USER, SMTP_PASSWORD,
#   WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_VERIFY_TOKEN, WHATSAPP_APP_SECRET,
#   TENACIO_CRIF_CLIENT_ID, TENACIO_CRIF_API_KEY, TENACIO_CRIF_WORKFLOW_ID,
#   CORS_ALLOWED_ORIGIN

set -euo pipefail

AWS_REGION="${AWS_REGION:-us-east-1}"
ECS_CLUSTER="${ECS_CLUSTER:-platform-cluster}"
RABBITMQ_HOST="rabbitmq.platform.local"
RABBITMQ_PORT="5672"
RABBITMQ_USER="guest"

log() { echo "[deploy] $*"; }

# ── Helper: register task definition and return its ARN ─────────────────────
register_task_def() {
  local name="$1"
  local json="$2"
  local arn
  arn=$(aws ecs register-task-definition \
    --region "$AWS_REGION" \
    --cli-input-json "$json" \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)
  echo "$arn"
}

# ── Helper: upsert an ECS service (create or update) ────────────────────────
upsert_service() {
  local service_name="$1"
  local task_def_arn="$2"
  local subnets="$3"
  local sg="$4"
  local desired_count="${5:-1}"
  local tg_arn="${6:-}"
  local extra_flags="${7:-}"

  local existing
  existing=$(aws ecs describe-services \
    --region "$AWS_REGION" \
    --cluster "$ECS_CLUSTER" \
    --services "$service_name" \
    --query 'services[0].status' \
    --output text 2>/dev/null || echo "MISSING")

  local load_balancers=""
  if [[ -n "$tg_arn" ]]; then
    load_balancers="--load-balancers targetGroupArn=${tg_arn},containerName=${service_name},containerPort=8080"
  fi

  local sd_arn
  sd_arn=$(ensure_cloudmap_service "$service_name")

  if [[ "$existing" == "ACTIVE" || "$existing" == "DRAINING" ]]; then
    log "Updating service: $service_name"
    aws ecs update-service \
      --region "$AWS_REGION" \
      --cluster "$ECS_CLUSTER" \
      --service "$service_name" \
      --task-definition "$task_def_arn" \
      --desired-count "$desired_count" \
      --force-new-deployment \
      $extra_flags \
      --output json > /dev/null
  else
    log "Creating service: $service_name"
    aws ecs create-service \
      --region "$AWS_REGION" \
      --cluster "$ECS_CLUSTER" \
      --service-name "$service_name" \
      --task-definition "$task_def_arn" \
      --desired-count "$desired_count" \
      --launch-type FARGATE \
      --network-configuration "awsvpcConfiguration={subnets=[${subnets}],securityGroups=[${sg}],assignPublicIp=DISABLED}" \
      --service-registries "registryArn=${sd_arn}" \
      $load_balancers \
      $extra_flags \
      --output json > /dev/null
  fi
}

# ── Helper: ensure Cloud Map service exists, return its ARN ─────────────────
ensure_cloudmap_service() {
  local name="$1"
  local existing_arn
  existing_arn=$(aws servicediscovery list-services \
    --region "$AWS_REGION" \
    --filters "Name=NAMESPACE_ID,Values=${CLOUDMAP_NS_ID},Condition=EQ" \
    --query "Services[?Name=='${name}'].Arn" \
    --output text 2>/dev/null || echo "")

  if [[ -n "$existing_arn" ]]; then
    echo "$existing_arn"
    return
  fi

  aws servicediscovery create-service \
    --region "$AWS_REGION" \
    --name "$name" \
    --namespace-id "$CLOUDMAP_NS_ID" \
    --dns-config "NamespaceId=${CLOUDMAP_NS_ID},RoutingPolicy=MULTIVALUE,DnsRecords=[{Type=A,TTL=10}]" \
    --health-check-custom-config FailureThreshold=1 \
    --query 'Service.Arn' \
    --output text
}

# ── Common env vars for all backend services ─────────────────────────────────
# Bug 7 fixed: DB_PORT was 5432 (PostgreSQL) — all services use MySQL on 3306
# Bug 9 fixed: added PORT=8080 so every container starts on the mapped port
# Bug 12 fixed: added PII_ENCRYPTION_KEY and INTERNAL_SERVICE_TOKEN
backend_common_env() {
  cat <<EOF
[
  {"name":"DB_HOST",              "value":"${RDS_ENDPOINT}"},
  {"name":"DB_PORT",              "value":"3306"},
  {"name":"DB_USER",              "value":"platform"},
  {"name":"DB_PASSWORD",          "value":"${DB_PASSWORD}"},
  {"name":"RABBITMQ_HOST",        "value":"${RABBITMQ_HOST}"},
  {"name":"RABBITMQ_PORT",        "value":"${RABBITMQ_PORT}"},
  {"name":"RABBITMQ_USER",        "value":"${RABBITMQ_USER}"},
  {"name":"RABBITMQ_PASS",        "value":"${RABBITMQ_PASSWORD}"},
  {"name":"REDIS_HOST",           "value":"${REDIS_ENDPOINT}"},
  {"name":"REDIS_PORT",           "value":"6379"},
  {"name":"JWT_SECRET",           "value":"${JWT_SECRET}"},
  {"name":"JWT_EXPIRY_MS",        "value":"28800000"},
  {"name":"AWS_REGION",           "value":"${AWS_REGION}"},
  {"name":"AWS_S3_BUCKET",        "value":"${S3_BUCKET}"},
  {"name":"PORT",                 "value":"8080"},
  {"name":"INTERNAL_SERVICE_TOKEN","value":"${INTERNAL_SERVICE_TOKEN}"},
  {"name":"PII_ENCRYPTION_KEY",   "value":"${PII_ENCRYPTION_KEY}"},
  {"name":"CORS_ALLOWED_ORIGIN",  "value":"${CORS_ALLOWED_ORIGIN}"}
]
EOF
}

# ── Backend task definition factory ─────────────────────────────────────────
backend_task_def() {
  local service_name="$1"
  local db_name="$2"
  local extra_env="${3:-[]}"

  local image="${ECR_REGISTRY}/platform-${service_name}:${IMAGE_TAG}"

  local merged_env
  merged_env=$(jq -n \
    --argjson base "$(backend_common_env)" \
    --argjson extra "$extra_env" \
    '$base + $extra')

  cat <<EOF
{
  "family": "platform-${service_name}",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "taskRoleArn": "${TASK_ROLE_ARN}",
  "containerDefinitions": [
    {
      "name": "${service_name}",
      "image": "${image}",
      "portMappings": [{"containerPort": 8080, "protocol": "tcp"}],
      "environment": ${merged_env},
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/platform/${service_name}",
          "awslogs-region": "${AWS_REGION}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -sf http://localhost:8080/actuator/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      },
      "essential": true
    }
  ]
}
EOF
}

SUBNETS="${PRIVATE_SUBNET_1},${PRIVATE_SUBNET_2}"

# ═══════════════════════════════════════════════════════════════════════════════
# 1. RabbitMQ (ECS Fargate with EFS persistence)
# ═══════════════════════════════════════════════════════════════════════════════
log "=== Deploying RabbitMQ ==="

RABBITMQ_TASK_DEF=$(cat <<EOF
{
  "family": "platform-rabbitmq",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "volumes": [
    {
      "name": "rabbitmq-data",
      "efsVolumeConfiguration": {
        "fileSystemId": "${EFS_ID}",
        "rootDirectory": "/rabbitmq",
        "transitEncryption": "ENABLED"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "rabbitmq",
      "image": "rabbitmq:3-management-alpine",
      "portMappings": [
        {"containerPort": 5672, "protocol": "tcp"},
        {"containerPort": 15672, "protocol": "tcp"}
      ],
      "environment": [
        {"name": "RABBITMQ_DEFAULT_USER", "value": "guest"},
        {"name": "RABBITMQ_DEFAULT_PASS", "value": "${RABBITMQ_PASSWORD}"}
      ],
      "mountPoints": [
        {"sourceVolume": "rabbitmq-data", "containerPath": "/var/lib/rabbitmq"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/platform/rabbitmq",
          "awslogs-region": "${AWS_REGION}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "rabbitmq-diagnostics -q ping || exit 1"],
        "interval": 15,
        "timeout": 5,
        "retries": 5,
        "startPeriod": 30
      },
      "essential": true
    }
  ]
}
EOF
)

MQ_ARN=$(register_task_def "platform-rabbitmq" "$RABBITMQ_TASK_DEF")
upsert_service "rabbitmq" "$MQ_ARN" "$SUBNETS" "$RABBITMQ_SG" 1
log "RabbitMQ deployed: $MQ_ARN"

# ═══════════════════════════════════════════════════════════════════════════════
# 2. Backend Java microservices — 6 merged services
# Bug 8 fixed: replaced 13 pre-merger service names with the 6 actual services
# Bug 10 fixed: heredoc delimiters are now unquoted (ENVEOF not 'ENVEOF')
#               so ${VAR} references expand correctly
# Bug 11 fixed: DB names updated to match actual application.yml databases
# ═══════════════════════════════════════════════════════════════════════════════

deploy_backend() {
  local service_name="$1"
  local db_name="$2"
  local extra_env="${3:-[]}"
  log "=== Deploying $service_name ==="
  local td_json
  td_json=$(backend_task_def "$service_name" "$db_name" "$extra_env")
  local td_arn
  td_arn=$(register_task_def "platform-${service_name}" "$td_json")
  upsert_service "$service_name" "$td_arn" "$SUBNETS" "$BACKEND_SG" 1 "" "--enable-execute-command"
  log "$service_name deployed: $td_arn"
}

deploy_backend "auth-service" "platform_auth"

deploy_backend "sales-ops-service" "platform_sales_ops"

deploy_backend "customer-document-service" "platform_customer_docs"

# loan-core-service includes the eligibility sub-package (Tenacio CRIF credit checks)
deploy_backend "loan-core-service" "platform_loan_core" "$(cat <<ENVEOF
[
  {"name":"TENACIO_CRIF_CLIENT_ID",  "value":"${TENACIO_CRIF_CLIENT_ID}"},
  {"name":"TENACIO_CRIF_API_KEY",    "value":"${TENACIO_CRIF_API_KEY}"},
  {"name":"TENACIO_CRIF_WORKFLOW_ID","value":"${TENACIO_CRIF_WORKFLOW_ID}"}
]
ENVEOF
)"

# communications-service includes messaging + notification sub-packages
deploy_backend "communications-service" "platform_communications" "$(cat <<ENVEOF
[
  {"name":"MAIL_HOST",          "value":"smtp.gmail.com"},
  {"name":"MAIL_PORT",          "value":"587"},
  {"name":"MAIL_USERNAME",      "value":"${MAIL_USERNAME}"},
  {"name":"MAIL_PASSWORD",      "value":"${MAIL_PASSWORD}"},
  {"name":"WHATSAPP_API_URL",   "value":"https://graph.facebook.com/v19.0"},
  {"name":"WHATSAPP_PHONE_ID",  "value":"${WHATSAPP_PHONE_ID}"},
  {"name":"WHATSAPP_TOKEN",     "value":"${WHATSAPP_TOKEN}"},
  {"name":"WHATSAPP_VERIFY_TOKEN","value":"${WHATSAPP_VERIFY_TOKEN}"},
  {"name":"WHATSAPP_APP_SECRET","value":"${WHATSAPP_APP_SECRET}"}
]
ENVEOF
)"

# analytics-reporting-service includes reporting + analytics sub-packages
deploy_backend "analytics-reporting-service" "platform_analytics_reporting" "$(cat <<ENVEOF
[
  {"name":"SMTP_HOST",    "value":"smtp.gmail.com"},
  {"name":"SMTP_PORT",    "value":"587"},
  {"name":"SMTP_USER",    "value":"${SMTP_USER}"},
  {"name":"SMTP_PASSWORD","value":"${SMTP_PASSWORD}"}
]
ENVEOF
)"

# ═══════════════════════════════════════════════════════════════════════════════
# 3. Frontend
# Bug 13 fixed: Cloud Map URLs updated to actual merged service names
# ═══════════════════════════════════════════════════════════════════════════════
log "=== Deploying frontend ==="

FRONTEND_TASK_DEF=$(cat <<EOF
{
  "family": "platform-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "taskRoleArn": "${TASK_ROLE_ARN}",
  "containerDefinitions": [
    {
      "name": "frontend",
      "image": "${ECR_REGISTRY}/platform-frontend:${IMAGE_TAG}",
      "portMappings": [{"containerPort": 8080, "protocol": "tcp"}],
      "environment": [
        {"name": "PORT",                            "value": "8080"},
        {"name": "AUTH_SERVICE_URL",                "value": "auth-service.platform.local:8080"},
        {"name": "SALES_OPS_SERVICE_URL",           "value": "sales-ops-service.platform.local:8080"},
        {"name": "CUSTOMER_DOCUMENT_SERVICE_URL",   "value": "customer-document-service.platform.local:8080"},
        {"name": "LOAN_CORE_SERVICE_URL",           "value": "loan-core-service.platform.local:8080"},
        {"name": "COMMUNICATIONS_SERVICE_URL",      "value": "communications-service.platform.local:8080"},
        {"name": "ANALYTICS_REPORTING_SERVICE_URL", "value": "analytics-reporting-service.platform.local:8080"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/platform/frontend",
          "awslogs-region": "${AWS_REGION}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "wget -qO- http://localhost:8080/index.html > /dev/null || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 20
      },
      "essential": true
    }
  ]
}
EOF
)

FRONTEND_TD_ARN=$(register_task_def "platform-frontend" "$FRONTEND_TASK_DEF")

existing_frontend=$(aws ecs describe-services \
  --region "$AWS_REGION" \
  --cluster "$ECS_CLUSTER" \
  --services "frontend" \
  --query 'services[0].status' \
  --output text 2>/dev/null || echo "MISSING")

FRONTEND_SUBNETS="${PUBLIC_SUBNET_1},${PUBLIC_SUBNET_2}"

if [[ "$existing_frontend" == "ACTIVE" || "$existing_frontend" == "DRAINING" ]]; then
  aws ecs update-service \
    --region "$AWS_REGION" \
    --cluster "$ECS_CLUSTER" \
    --service "frontend" \
    --task-definition "$FRONTEND_TD_ARN" \
    --desired-count 1 \
    --force-new-deployment \
    --output json > /dev/null
else
  FRONTEND_SD_ARN=$(ensure_cloudmap_service "frontend")
  aws ecs create-service \
    --region "$AWS_REGION" \
    --cluster "$ECS_CLUSTER" \
    --service-name "frontend" \
    --task-definition "$FRONTEND_TD_ARN" \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[${FRONTEND_SUBNETS}],securityGroups=[${FRONTEND_SG}],assignPublicIp=ENABLED}" \
    --load-balancers "targetGroupArn=${FRONTEND_TG_ARN},containerName=frontend,containerPort=8080" \
    --service-registries "registryArn=${FRONTEND_SD_ARN}" \
    --output json > /dev/null
fi

log "Frontend deployed: $FRONTEND_TD_ARN"

# ═══════════════════════════════════════════════════════════════════════════════
# 4. Wait for stabilization
# ═══════════════════════════════════════════════════════════════════════════════
log "=== Waiting for services to stabilize... ==="

# Bug 8 fixed: list updated to actual 6 backend services + frontend + rabbitmq
SERVICES_TO_WATCH="frontend rabbitmq auth-service sales-ops-service \
  customer-document-service loan-core-service \
  communications-service analytics-reporting-service"

aws ecs wait services-stable \
  --region "$AWS_REGION" \
  --cluster "$ECS_CLUSTER" \
  --services $SERVICES_TO_WATCH \
  || true

log "=== Deployment complete ==="
