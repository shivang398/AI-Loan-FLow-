#!/bin/bash
set -e
PLATFORM_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="$PLATFORM_DIR/.service-pids"

if [ -f "$PID_FILE" ]; then
    echo "==> Stopping services..."
    while IFS='=' read -r SVC PID; do
        if kill -0 "$PID" 2>/dev/null; then
            kill -9 "$PID" || true
            echo "    Stopped $SVC (PID $PID)"
        else
            echo "    $SVC (PID $PID) was not running"
        fi
    done < "$PID_FILE"
    rm -f "$PID_FILE"
else
    echo "No .service-pids file found — killing Java processes on service ports..."
    for PORT in 8081 8082 8083 8084 8087 8093; do
        PID=$(lsof -ti tcp:"$PORT" 2>/dev/null || true)
        if [ -n "$PID" ]; then
            kill -9 "$PID" || true
            echo "    Killed PID $PID on port $PORT"
        fi
    done
fi

echo ""
echo "==> Stopping infrastructure..."
if docker compose -f "$PLATFORM_DIR/docker-compose.yml" down --remove-orphans 2>/dev/null; then
    echo "    Done."
else
    echo "    Retrying with sudo..."
    sudo docker compose -f "$PLATFORM_DIR/docker-compose.yml" down --remove-orphans
    echo "    Done."
fi
