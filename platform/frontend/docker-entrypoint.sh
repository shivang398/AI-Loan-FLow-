#!/bin/sh
# Frontend Docker entrypoint
# Substitutes environment variables in nginx config template and starts Nginx.
#
# Supports two deployment targets via SERVICE_DISCOVERY_SUFFIX env var:
#   AWS ECS (Cloud Map):  platform.local       (default)
#   Docker Compose:       (empty — uses service name directly)

set -e

PORT="${PORT:-8080}"
export PORT

# Detect the service discovery suffix from environment, defaulting to AWS Cloud Map
SUFFIX="${SERVICE_DISCOVERY_SUFFIX:-platform.local}"

svc_url() {
  local name="$1"
  # If an explicit override is set, use it; otherwise build from suffix
  local override_var
  override_var=$(echo "$name" | tr '[:lower:]' '[:upper:]' | tr '-' '_')_URL
  eval "val=\${${override_var}:-}"
  if [ -n "$val" ]; then
    echo "$val"
  elif [ -n "$SUFFIX" ]; then
    echo "${name}.${SUFFIX}:8080"
  else
    echo "${name}:8080"
  fi
}

export AUTH_SERVICE_URL="${AUTH_SERVICE_URL:-$(svc_url auth-service)}"
export CONNECTOR_SERVICE_URL="${CONNECTOR_SERVICE_URL:-$(svc_url connector-service)}"
export CUSTOMER_SERVICE_URL="${CUSTOMER_SERVICE_URL:-$(svc_url customer-service)}"
export LOAN_SERVICE_URL="${LOAN_SERVICE_URL:-$(svc_url loan-service)}"
export ELIGIBILITY_SERVICE_URL="${ELIGIBILITY_SERVICE_URL:-$(svc_url eligibility-service)}"
export POLICY_SERVICE_URL="${POLICY_SERVICE_URL:-$(svc_url policy-service)}"
export COMMISSION_SERVICE_URL="${COMMISSION_SERVICE_URL:-$(svc_url commission-service)}"
export MESSAGING_SERVICE_URL="${MESSAGING_SERVICE_URL:-$(svc_url messaging-service)}"
export RM_SERVICE_URL="${RM_SERVICE_URL:-$(svc_url rm-tracking-service)}"
export QUERY_SERVICE_URL="${QUERY_SERVICE_URL:-$(svc_url query-service)}"
export DOCUMENT_SERVICE_URL="${DOCUMENT_SERVICE_URL:-$(svc_url document-service)}"
export REPORTING_SERVICE_URL="${REPORTING_SERVICE_URL:-$(svc_url reporting-service)}"
export ANALYTICS_SERVICE_URL="${ANALYTICS_SERVICE_URL:-$(svc_url analytics-service)}"
export ROUTING_SERVICE_URL="${ROUTING_SERVICE_URL:-$(svc_url sm-routing-service)}"

# Read DNS resolver from resolv.conf; wrap IPv6 addresses in brackets for nginx
NAMESERVER_RAW=$(grep "nameserver" /etc/resolv.conf | awk '{print $2}' | head -1)
if echo "$NAMESERVER_RAW" | grep -q ":"; then
    NAMESERVER="[$NAMESERVER_RAW]"
else
    NAMESERVER="$NAMESERVER_RAW"
fi
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
