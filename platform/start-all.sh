#!/bin/bash
set -e

PLATFORM_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$PLATFORM_DIR/.service-pids"
LOG_DIR="$PLATFORM_DIR/logs"
export PATH="/home/shivang/Desktop/Auditor/maven/apache-maven-3.9.6/bin:$PATH"

# JWT secret — must be set in production; falls back to local-dev placeholder
JWT_SECRET="${JWT_SECRET:-LocalDevSecretMustBeAtLeast32CharsLong!}"

# Token expiry: 8 hours for normal use
JWT_EXPIRY_MS="${JWT_EXPIRY_MS:-28800000}"

SERVICES=(
  "auth-service:8081"
  "connector-service:8082"
  "customer-service:8083"
  "loan-service:8084"
  "eligibility-service:8085"
  "policy-service:8086"
  "messaging-service:8087"
  "rm-tracking-service:8088"
  "query-service:8089"
  "document-service:8090"
  "commission-service:8092"
  "reporting-service:8093"
  "analytics-service:8094"
  "sm-routing-service:8095"
)

mkdir -p "$LOG_DIR"
> "$PID_FILE"

echo "==> Infrastructure assumed ready (PostgreSQL:5434, Redis:6381)."

echo ""
echo "==> Building all services (skipping tests)..."
cd "$PLATFORM_DIR"
mvn clean package -DskipTests -q
echo "    Build complete."

echo ""
echo "==> Starting microservices..."
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
  java -XX:TieredStopAtLevel=1 -Xmx256m \
    -Dserver.port="$PORT" -DPORT="$PORT" \
    -Dspring.datasource.hikari.maximum-pool-size=3 \
    -DDB_HOST=localhost -DDB_PORT=5434 \
    -DDB_USER=postgres -DDB_PASSWORD=password \
    -Dspring.rabbitmq.host=localhost -Dspring.rabbitmq.port=5673 \
    -Dspring.rabbitmq.username=guest -Dspring.rabbitmq.password=guest \
    -DRABBITMQ_HOST=localhost -DRABBITMQ_PORT=5673 \
    -DREDIS_HOST=localhost -DREDIS_PORT=6381 \
    -Dspring.data.redis.host=localhost -Dspring.data.redis.port=6381 \
    -DJWT_SECRET="$JWT_SECRET" \
    -DJWT_EXPIRY_MS="$JWT_EXPIRY_MS" \
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
      printf "    ✓ %-30s :%-5s UP\n" "$SVC" "$PORT"
      break
    fi
    if [ "$i" -eq 24 ]; then
      printf "    ✗ %-30s :%-5s FAILED (check logs/$SVC.log)\n" "$SVC" "$PORT"
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
echo "  Service                        Port    URL"
echo "  ────────────────────────────────────────────────────────"
for entry in "${SERVICES[@]}"; do
  SVC="${entry%%:*}"
  PORT="${entry##*:}"
  printf "  %-30s %-7s http://localhost:%s\n" "$SVC" "$PORT" "$PORT"
done
echo ""
echo "  Database:   PostgreSQL → localhost:5434"
echo "  Cache:      Redis      → localhost:6381"
echo "  Frontend:   cd frontend && npm run dev → http://localhost:3000"
echo ""
echo "  Admin login:  admin@platform.com / Admin@1234"
echo "  Partner reg:  http://localhost:3000/partners/register"
echo "  Logs:         $LOG_DIR/"
