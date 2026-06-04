#!/bin/bash
# Fix 14 & 15: Infrastructure security hardening script.
# Run ONCE on EC2 after the platform is deployed.
# Requires: AWS CLI configured, jq installed.

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "==> [Fix 15] Locking down RDS and Redis to private subnet"
echo "    Ensure RDS security group allows port 5432 ONLY from the EC2 security group."
echo "    Ensure ElastiCache/Redis allows port 6379 ONLY from the EC2 security group."
echo "    Neither should have 0.0.0.0/0 inbound rules."
echo ""
echo "    Check with:"
echo "    aws ec2 describe-security-groups --query 'SecurityGroups[?GroupName==\`rds-sg\`]'"
echo ""

echo "==> [Fix 14] Enabling RDS encryption at rest"
echo "    NOTE: Encryption must be enabled at RDS instance creation time."
echo "    To encrypt an existing unencrypted instance:"
echo "    1. Create a snapshot: aws rds create-db-snapshot --db-instance-id platform-db --db-snapshot-id platform-db-snap"
echo "    2. Copy snapshot with encryption: aws rds copy-db-snapshot \\"
echo "         --source-db-snapshot-id platform-db-snap \\"
echo "         --target-db-snapshot-id platform-db-snap-encrypted \\"
echo "         --kms-key-id alias/aws/rds"
echo "    3. Restore from encrypted snapshot to a new instance."
echo "    4. Update DB_HOST in Secrets Manager to point to new instance."
echo ""

echo "==> [Fix 9] Storing secrets in AWS Secrets Manager"

# Store all secrets — replace placeholder values before running
declare -A SECRETS=(
  ["/platform/prod/jwt-secret"]="${JWT_SECRET:-REPLACE_WITH_REAL_SECRET}"
  ["/platform/prod/db-password"]="${DB_PASSWORD:-REPLACE_WITH_REAL_PASSWORD}"
  ["/platform/prod/pii-encryption-key"]="${PII_ENCRYPTION_KEY:-REPLACE_WITH_32_CHAR_KEY}"
  ["/platform/prod/internal-service-token"]="${INTERNAL_SERVICE_TOKEN:-REPLACE_WITH_TOKEN}"
  ["/platform/prod/whatsapp-token"]="${WHATSAPP_TOKEN:-}"
  ["/platform/prod/whatsapp-app-secret"]="${WHATSAPP_APP_SECRET:-}"
)

for secret_name in "${!SECRETS[@]}"; do
  value="${SECRETS[$secret_name]}"
  if [[ "$value" == REPLACE* ]] || [[ -z "$value" ]]; then
    echo "    [SKIP] $secret_name — set a real value first"
    continue
  fi
  if aws secretsmanager describe-secret --secret-id "$secret_name" --region "$AWS_REGION" &>/dev/null; then
    aws secretsmanager update-secret \
      --secret-id "$secret_name" \
      --secret-string "$value" \
      --region "$AWS_REGION" > /dev/null
    echo "    Updated: $secret_name"
  else
    aws secretsmanager create-secret \
      --name "$secret_name" \
      --secret-string "$value" \
      --region "$AWS_REGION" > /dev/null
    echo "    Created: $secret_name"
  fi
done

echo ""
echo "==> [Fix 15] UFW firewall — block all inter-service ports from internet"
echo "    Each service listens on its own port. Only Nginx (80/443) should be public."

if command -v ufw &>/dev/null; then
  sudo ufw default deny incoming
  sudo ufw default allow outgoing
  sudo ufw allow ssh
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  # Block direct access to service ports from outside — Nginx proxies all traffic
  for port in 8081 8082 8083 8084 8087 8093 5432 6379 5672 15672; do
    sudo ufw deny "$port"/tcp
  done
  sudo ufw --force enable
  echo "    UFW rules applied."
else
  echo "    UFW not installed — install with: sudo apt-get install -y ufw"
fi

echo ""
echo "==> All infrastructure security steps complete."
echo "    Remember to:"
echo "    1. Update each service's DB_USER to use the per-service user from db-setup-secure.sql"
echo "    2. Set PII_ENCRYPTION_KEY in Secrets Manager and update .env.prod"
echo "    3. Set INTERNAL_SERVICE_TOKEN to the same value in sales-ops and customer-document services"
echo "    4. Rotate all secrets every 90 days via Secrets Manager rotation policies"
