#!/usr/bin/env bash
# One-command EC2 bootstrap for Realmoney Advisory Platform.
# Supports Amazon Linux 2 and Amazon Linux 2023.
#
# Run from your local machine:
#   ssh ec2-user@YOUR_EC2_IP "bash -s" < deploy/setup-ec2.sh
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/shivang398/AI-Loan-FLow-.git}"
INSTALL_DIR="/opt/realmoney"
COMPOSE_FILE="docker-compose.prod.yml"
EC2_USER="${SUDO_USER:-ec2-user}"

# Detect Amazon Linux version
if grep -q "Amazon Linux 2023" /etc/os-release 2>/dev/null; then
  AL_VERSION=2023
  PKG_MGR=dnf
elif grep -q "Amazon Linux 2" /etc/os-release 2>/dev/null; then
  AL_VERSION=2
  PKG_MGR=yum
else
  echo "WARNING: This script is designed for Amazon Linux 2 / 2023."
  echo "Proceeding anyway with dnf..."
  AL_VERSION=2023
  PKG_MGR=dnf
fi

echo "==> Detected Amazon Linux $AL_VERSION (using $PKG_MGR)"

echo "==> [1/6] Updating system packages"
sudo $PKG_MGR update -y -q

echo "==> [2/6] Installing dependencies"
sudo $PKG_MGR install -y git jq mysql unzip

echo "==> [3/6] Installing Docker"
if ! command -v docker &>/dev/null; then
  if [ "$AL_VERSION" = "2023" ]; then
    sudo dnf install -y docker
  else
    # Amazon Linux 2 — use amazon-linux-extras
    sudo amazon-linux-extras install docker -y
  fi
  sudo systemctl enable --now docker
  sudo usermod -aG docker "$EC2_USER"
  # Apply group change without logout in this session
  newgrp docker || true
  echo "Docker installed: $(docker --version)"
else
  echo "Docker already installed: $(docker --version)"
  sudo systemctl enable --now docker
fi

echo "==> [4/6] Installing AWS CLI v2"
if ! command -v aws &>/dev/null; then
  curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip
  unzip -q /tmp/awscliv2.zip -d /tmp
  sudo /tmp/aws/install
  rm -rf /tmp/aws /tmp/awscliv2.zip
  echo "AWS CLI installed: $(aws --version)"
else
  echo "AWS CLI already installed: $(aws --version)"
fi

echo "==> [5/6] Cloning repository to $INSTALL_DIR"
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "Repo already cloned — pulling latest"
  sudo git -C "$INSTALL_DIR" pull --ff-only
else
  sudo git clone "$REPO_URL" "$INSTALL_DIR"
fi
sudo chown -R "$EC2_USER:$EC2_USER" "$INSTALL_DIR"

echo "==> [6/6] Registering systemd service (auto-start on reboot)"
sudo tee /etc/systemd/system/realmoney.service > /dev/null << EOF
[Unit]
Description=Realmoney Advisory Platform
After=docker.service network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=$EC2_USER
WorkingDirectory=$INSTALL_DIR/platform
ExecStart=/usr/bin/docker compose -f $COMPOSE_FILE up -d --remove-orphans
ExecStop=/usr/bin/docker compose -f $COMPOSE_FILE down
TimeoutStartSec=300

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable realmoney.service
echo "systemd service 'realmoney' enabled."

echo "==> Configuring Docker log rotation"
sudo tee /etc/docker/daemon.json > /dev/null << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5"
  }
}
EOF
sudo systemctl reload docker || sudo systemctl restart docker

echo ""
echo "============================================================"
echo "  Bootstrap complete! (Amazon Linux $AL_VERSION)"
echo "============================================================"
echo ""
echo "Next steps:"
echo ""
echo "  1. Create the 6 MySQL databases on RDS (run once):"
echo "     mysql -h YOUR_RDS_ENDPOINT -u root -p < $INSTALL_DIR/platform/init-mysql-databases.sh"
echo ""
echo "  2. Configure environment:"
echo "     nano $INSTALL_DIR/platform/backend/.env"
echo "       — Set AUTH_DATABASE_URL .. ANALYTICS_DATABASE_URL (RDS endpoint)"
echo "       — Set JWT_SECRET:  openssl rand -hex 32"
echo "       — Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET"
echo "       — Set TENACIO_CRIF_* for CIBIL checks"
echo "     nano $INSTALL_DIR/platform/.env"
echo "       — Set CORS_ORIGIN=https://yourdomain.com"
echo "       — Set RABBITMQ_USER and RABBITMQ_PASS"
echo ""
echo "  3. Build images and start:"
echo "     cd $INSTALL_DIR/platform"
echo "     docker compose -f $COMPOSE_FILE build"
echo "     docker compose -f $COMPOSE_FILE up -d"
echo ""
echo "  4. Verify:"
echo "     docker compose -f $INSTALL_DIR/platform/$COMPOSE_FILE ps"
echo "     curl http://localhost/api/health"
echo ""
echo "  NOTE: If docker commands fail with 'permission denied',"
echo "        log out and SSH back in for the docker group to apply."
echo ""
