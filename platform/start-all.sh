#!/bin/bash
set -e

PLATFORM_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$PLATFORM_DIR/.service-pids"
LOG_DIR="$PLATFORM_DIR/logs"
export PATH="/home/shivang/Desktop/Auditor/maven/apache-maven-3.9.6/bin:$PATH"


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
  "notification-service:8091"
  "commission-service:8092"
  "reporting-service:8093"
  "analytics-service:8094"
  "sm-routing-service:8095"
)

mkdir -p "$LOG_DIR"
> "$PID_FILE"

# echo "==> Starting infrastructure (PostgreSQL, RabbitMQ, Redis, LocalStack)..."
# docker compose -f "$PLATFORM_DIR/docker-compose.yml" up -d
# 
# echo "==> Waiting for infrastructure to be healthy..."
# for i in {1..30}; do
#   HEALTHY=$(docker compose -f "$PLATFORM_DIR/docker-compose.yml" ps --format json 2>/dev/null \
#     | grep -c '"Health":"healthy"' || true)
#   TOTAL=4
#   if [ "$HEALTHY" -ge "$TOTAL" ]; then
#     echo "    Infrastructure ready."
#     break
#   fi
#   echo "    Waiting... ($i/30)"
#   sleep 3
# done
echo "==> Infrastructure assumed ready."

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
  LOG="$LOG_DIR/$SVC.log"
  java -XX:TieredStopAtLevel=1 -Xmx256m -Dspring.datasource.hikari.maximum-pool-size=3 -Dspring.rabbitmq.host=localhost -Dspring.rabbitmq.port=5673 -Dspring.rabbitmq.username=guest -Dspring.rabbitmq.password=guest -jar "$JAR" > "$LOG" 2>&1 &
  PID=$!
  echo "$SVC=$PID" >> "$PID_FILE"
  echo "    Started $SVC (PID $PID) → http://localhost:$PORT  [log: logs/$SVC.log]"
done

echo ""
echo "==> All services launched. URL summary:"
echo ""
echo "  Service                Port    URL"
echo "  ─────────────────────────────────────────────────────"
for entry in "${SERVICES[@]}"; do
  SVC="${entry%%:*}"
  PORT="${entry##*:}"
  printf "  %-22s %-7s http://localhost:%s\n" "$SVC" "$PORT" "$PORT"
done
echo ""
echo "  Infrastructure:"
echo "  PostgreSQL             5434    localhost:5434"
echo "  RabbitMQ management    15673   http://localhost:15673  (guest/guest)"
echo "  Redis                  6381    localhost:6381"
echo "  LocalStack S3          4566    http://localhost:4566"
echo ""
echo "  Health endpoints:  http://localhost:<PORT>/actuator/health"
echo "  PIDs stored in:    .service-pids"
echo "  Logs in:           logs/"
