#!/bin/sh
# Frontend Docker entrypoint
# Substitutes environment variables in nginx config template and starts Nginx

set -e

# Default PORT to 8080 if not set by Railway
PORT="${PORT:-8080}"
export PORT

# Export all backend service URLs (for envsubst)
# These can be set as Railway environment variables, defaulting to internal hostnames
export AUTH_SERVICE_URL="${AUTH_SERVICE_URL:-auth-service.railway.internal:8080}"
export CONNECTOR_SERVICE_URL="${CONNECTOR_SERVICE_URL:-connector-service.railway.internal:8080}"
export CUSTOMER_SERVICE_URL="${CUSTOMER_SERVICE_URL:-customer-service.railway.internal:8080}"
export LOAN_SERVICE_URL="${LOAN_SERVICE_URL:-loan-service.railway.internal:8080}"
export ELIGIBILITY_SERVICE_URL="${ELIGIBILITY_SERVICE_URL:-eligibility-service.railway.internal:8080}"
export POLICY_SERVICE_URL="${POLICY_SERVICE_URL:-policy-service.railway.internal:8080}"
export COMMISSION_SERVICE_URL="${COMMISSION_SERVICE_URL:-commission-service.railway.internal:8080}"
export MESSAGING_SERVICE_URL="${MESSAGING_SERVICE_URL:-messaging-service.railway.internal:8080}"
export RM_SERVICE_URL="${RM_SERVICE_URL:-rm-tracking-service.railway.internal:8080}"
export QUERY_SERVICE_URL="${QUERY_SERVICE_URL:-query-service.railway.internal:8080}"
export DOCUMENT_SERVICE_URL="${DOCUMENT_SERVICE_URL:-document-service.railway.internal:8080}"
export REPORTING_SERVICE_URL="${REPORTING_SERVICE_URL:-reporting-service.railway.internal:8080}"
export ANALYTICS_SERVICE_URL="${ANALYTICS_SERVICE_URL:-analytics-service.railway.internal:8080}"
export ROUTING_SERVICE_URL="${ROUTING_SERVICE_URL:-sm-routing-service.railway.internal:8080}"

# Read the actual DNS resolver from the container's resolv.conf
NAMESERVER=$(grep "nameserver" /etc/resolv.conf | awk '{print $2}' | head -1)
export NAMESERVER

echo "[Frontend] PORT: $PORT"
echo "[Frontend] Backend Services:"
echo "  AUTH_SERVICE_URL: $AUTH_SERVICE_URL"
echo "  CONNECTOR_SERVICE_URL: $CONNECTOR_SERVICE_URL"
echo "  CUSTOMER_SERVICE_URL: $CUSTOMER_SERVICE_URL"
echo "  LOAN_SERVICE_URL: $LOAN_SERVICE_URL"

# Substitute only our variables — not nginx's own $var syntax
envsubst '${PORT} ${NAMESERVER} ${AUTH_SERVICE_URL} ${CONNECTOR_SERVICE_URL} ${CUSTOMER_SERVICE_URL} ${LOAN_SERVICE_URL} ${ELIGIBILITY_SERVICE_URL} ${POLICY_SERVICE_URL} ${COMMISSION_SERVICE_URL} ${MESSAGING_SERVICE_URL} ${RM_SERVICE_URL} ${QUERY_SERVICE_URL} ${DOCUMENT_SERVICE_URL} ${REPORTING_SERVICE_URL} ${ANALYTICS_SERVICE_URL} ${ROUTING_SERVICE_URL}' \
  < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Verify the config
nginx -t

# Start Nginx in foreground
exec nginx -g "daemon off;"
