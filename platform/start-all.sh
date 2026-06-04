#!/bin/bash
set -e

PLATFORM_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$PLATFORM_DIR/.service-pids"
LOG_DIR="$PLATFORM_DIR/logs"
export PATH="/home/shivang/Desktop/Auditor/maven/apache-maven-3.9.6/bin:$PATH"

# JWT secret — must be set in production; falls back to local-dev placeholder
JWT_SECRET="${JWT_SECRET:-LocalDevSecretMustBeAtLeast32CharsLong!}"

# Token expiry: 24 hours for dev convenience (use 28800000 = 8h in production)
JWT_EXPIRY_MS="${JWT_EXPIRY_MS:-86400000}"

# CORS — allow the Vite dev server by default
CORS_ALLOWED_ORIGIN="${CORS_ALLOWED_ORIGIN:-http://localhost:3000}"

# 6 merged services (consolidated from 13)
SERVICES=(
  "auth-service:8081"
  "sales-ops-service:8082"
  "customer-document-service:8083"
  "loan-core-service:8084"
  "communications-service:8087"
  "analytics-reporting-service:8093"
)

mkdir -p "$LOG_DIR"
> "$PID_FILE"

echo "==> Infrastructure assumed ready (PostgreSQL:5434, RabbitMQ:5673, Redis:6381)."

echo ""
echo "==> Building all services (skipping tests)..."
cd "$PLATFORM_DIR"
mvn clean package -DskipTests -q
echo "    Build complete."

echo ""
echo "==> Starting services..."
for entry in "${SERVICES[@]}"; do
  SVC="${entry%%:*}"
  PORT="${entry##*:}"
  JAR=$(ls "$PLATFORM_DIR/$SVC/target/"*.jar 2>/dev/null | grep -v 'original' | head -1)
  if [ -z "$JAR" ]; then
    echo "    [SKIP] $SVC — JAR not found"
    continue
  fi

  # Kill any stale process on this port
  STALE=$(lsof -ti :"$PORT" 2>/dev/null || true)
  [ -n "$STALE" ] && kill "$STALE" 2>/dev/null && sleep 1

  LOG="$LOG_DIR/$SVC.log"
  java -XX:TieredStopAtLevel=1 -Xmx384m \
    -Dserver.port="$PORT" -DPORT="$PORT" \
    -Dspring.datasource.hikari.maximum-pool-size=3 \
    -DDB_HOST=localhost -DDB_PORT=5434 \
    -DDB_USER=postgres -DDB_PASSWORD=password \
    -Dspring.rabbitmq.host=localhost -Dspring.rabbitmq.port=5673 \
    -Dspring.rabbitmq.username=guest -Dspring.rabbitmq.password=guest \
    -DRABBITMQ_HOST=localhost -DRABBITMQ_PORT=5673 \
    -DRABBITMQ_USER=guest -DRABBITMQ_PASS=guest \
    -DREDIS_HOST=localhost -DREDIS_PORT=6381 \
    -Dspring.data.redis.host=localhost -Dspring.data.redis.port=6381 \
    -DJWT_SECRET="$JWT_SECRET" \
    -DJWT_EXPIRY_MS="$JWT_EXPIRY_MS" \
    -DCORS_ALLOWED_ORIGIN="$CORS_ALLOWED_ORIGIN" \
    -Dmanagement.health.rabbit.enabled=false \
    -Dmanagement.health.redis.enabled=false \
    -jar "$JAR" > "$LOG" 2>&1 &
  PID=$!
  echo "$SVC=$PID" >> "$PID_FILE"
  echo "    Started $SVC (PID $PID) → http://localhost:$PORT"
done

echo ""
echo "==> Waiting for services to become healthy (up to 120s)..."
ALL_OK=true
for entry in "${SERVICES[@]}"; do
  SVC="${entry%%:*}"
  PORT="${entry##*:}"
  for i in $(seq 1 24); do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "http://localhost:$PORT/actuator/health" 2>/dev/null || echo "000")
    if [ "$CODE" = "200" ]; then
      printf "    ✓ %-38s :%-5s UP\n" "$SVC" "$PORT"
      break
    fi
    if [ "$i" -eq 24 ]; then
      printf "    ✗ %-38s :%-5s FAILED (check logs/$SVC.log)\n" "$SVC" "$PORT"
      ALL_OK=false
    fi
    sleep 5
  done
done

echo ""
if $ALL_OK; then
  echo "==> All services healthy!"
else
  echo "==> Some services failed to start. Check logs/ for details."
fi

echo ""
echo "  Service                              Port    URL"
echo "  ──────────────────────────────────────────────────────────────"
for entry in "${SERVICES[@]}"; do
  SVC="${entry%%:*}"
  PORT="${entry##*:}"
  printf "  %-36s %-7s http://localhost:%s\n" "$SVC" "$PORT" "$PORT"
done
echo ""
echo "  Databases:  PostgreSQL → localhost:5434"
echo "              platform_auth, platform_sales_ops, platform_customer_docs,"
echo "              platform_loan_core, platform_communications, platform_analytics_reporting"
echo "  Cache:      Redis      → localhost:6381"
echo "  MQ:         RabbitMQ   → localhost:5673  (UI: http://localhost:15673)"
echo "  Frontend:   cd frontend && npm run dev → http://localhost:3000"
echo ""
echo "  Admin login:  admin@platform.com / Admin@123"
echo "  Partner reg:  http://localhost:3000/partners/register"
echo "  Logs:         $LOG_DIR/"
