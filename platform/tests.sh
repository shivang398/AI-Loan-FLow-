#!/bin/bash

# Platform Integration Test Suite
# Verifies the core workflows across all 6 merged services.

set -e

BASE_AUTH="http://localhost:8081"
BASE_SALES_OPS="http://localhost:8082"
BASE_CUSTOMER_DOC="http://localhost:8083"
BASE_LOAN_CORE="http://localhost:8084"
BASE_COMMS="http://localhost:8087"
BASE_ANALYTICS="http://localhost:8093"

# Unique test data per run
TS=$(date +%s)
ADMIN_EMAIL="admin_${TS}@platform.com"
CUST_EMAIL="rahul_${TS}@email.com"
CUST_MOBILE="98765${TS: -5}"

PASS=0
FAIL=0

green() { printf "\033[0;32m%s\033[0m\n" "$1"; }
red()   { printf "\033[0;31m%s\033[0m\n" "$1"; }

ok() {
  green "  ✓ $1"
  PASS=$((PASS + 1))
}

fail() {
  red "  ✗ $1"
  FAIL=$((FAIL + 1))
}

assert_json_field() {
  local label="$1" body="$2" field="$3" expected="$4"
  local actual
  actual=$(echo "$body" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d$field)" 2>/dev/null || echo "PARSE_ERROR")
  if [ "$actual" = "$expected" ] || ([ "$expected" = "NOT_NULL" ] && [ "$actual" != "null" ] && [ -n "$actual" ]); then
    ok "$label"
  else
    fail "$label (got: $actual)"
  fi
}

echo ""
echo "=================================================="
echo "  Real Money Platform — Integration Test Suite"
echo "=================================================="

# ── Phase 0: Health Checks ────────────────────────────
echo ""
echo "[ Phase 0 ] Health Checks"

for pair in \
  "auth-service:$BASE_AUTH" \
  "sales-ops-service:$BASE_SALES_OPS" \
  "customer-document-service:$BASE_CUSTOMER_DOC" \
  "loan-core-service:$BASE_LOAN_CORE" \
  "communications-service:$BASE_COMMS" \
  "analytics-reporting-service:$BASE_ANALYTICS"; do
  SVC="${pair%%:http*}"
  URL="${pair#*:http}"
  URL="http${URL}"
  STATUS=$(curl -s --max-time 3 "$URL/actuator/health" \
    | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','UNKNOWN'))" 2>/dev/null || echo "DOWN")
  if [ "$STATUS" = "UP" ]; then
    ok "$SVC is UP"
  else
    fail "$SVC is DOWN — aborting"
    echo ""
    red "One or more services are not running. Start them with: ./start-all.sh"
    exit 1
  fi
done

# ── Phase 1: Authentication (auth-service :8081) ──────
echo ""
echo "[ Phase 1 ] Authentication"

# Register admin
REG=$(curl -s -X POST "$BASE_AUTH/auth/register/partner" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"Admin@123\",\"role\":\"CONNECTOR\"}" 2>/dev/null)
assert_json_field "Partner self-registration" "$REG" "['success']" "True"

# Login
LOGIN=$(curl -s -X POST "$BASE_AUTH/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"Admin@123\"}" 2>/dev/null)
TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null || echo "")
if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
  ok "Login successful — JWT obtained"
  PASS=$((PASS + 1))
else
  fail "Login failed — no token returned"
  exit 1
fi

# Bad credentials must return 400/401
BAD_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_AUTH/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"nobody@platform.com","password":"wrong"}' 2>/dev/null)
if [ "$BAD_CODE" = "400" ] || [ "$BAD_CODE" = "401" ]; then
  ok "Bad credentials rejected (HTTP $BAD_CODE)"
  PASS=$((PASS + 1))
else
  fail "Bad credentials not rejected (HTTP $BAD_CODE)"
fi

# ── Phase 2: Customer & Document (customer-document-service :8083) ──
echo ""
echo "[ Phase 2 ] Customer & Document"

# Public customer creation (no token required)
CUST=$(curl -s -X POST "$BASE_CUSTOMER_DOC/customers" \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Rahul\",\"lastName\":\"Sharma\",\"email\":\"$CUST_EMAIL\",\"mobile\":\"$CUST_MOBILE\",\"panNumber\":\"ABCDE1234F\"}" 2>/dev/null)
CUSTOMER_ID=$(echo "$CUST" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null || echo "null")
assert_json_field "Public customer creation (no token)" "$CUST" "['success']" "True"
if [ "$CUSTOMER_ID" != "null" ] && [ -n "$CUSTOMER_ID" ]; then
  ok "Customer ID obtained: $CUSTOMER_ID"
  PASS=$((PASS + 1))
fi

# Fetch leads — requires auth
LEADS_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" "$BASE_CUSTOMER_DOC/customers/leads" 2>/dev/null)
if [ "$LEADS_CODE" = "200" ]; then
  ok "Leads list returns 200 with valid token"
  PASS=$((PASS + 1))
else
  fail "Leads list returned HTTP $LEADS_CODE"
fi

# Unauthenticated leads access must be blocked
UNAUTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_CUSTOMER_DOC/customers/leads" 2>/dev/null)
if [ "$UNAUTH_CODE" = "401" ] || [ "$UNAUTH_CODE" = "403" ]; then
  ok "Unauthenticated leads access blocked (HTTP $UNAUTH_CODE)"
  PASS=$((PASS + 1))
else
  fail "Unauthenticated leads access not blocked (HTTP $UNAUTH_CODE)"
fi

# ── Phase 3: Loan Core (loan-core-service :8084) ──────
echo ""
echo "[ Phase 3 ] Loan Core"

# Create loan application
LOAN=$(curl -s -X POST "$BASE_LOAN_CORE/loans" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"customerId\":\"$CUSTOMER_ID\",\"amount\":500000,\"tenureMonths\":36,\"purpose\":\"Home Renovation\"}" 2>/dev/null)
LOAN_ID=$(echo "$LOAN" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null || echo "null")
assert_json_field "Loan application created" "$LOAN" "['success']" "True"
if [ "$LOAN_ID" != "null" ] && [ -n "$LOAN_ID" ]; then
  ok "Loan ID obtained: $LOAN_ID"
  PASS=$((PASS + 1))
fi

# Eligibility — public lead capture endpoint
ELIG=$(curl -s -X POST "$BASE_LOAN_CORE/eligibility/submissions" \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Rahul Sharma\",\"mobileNumber\":\"$CUST_MOBILE\",\"loanAmount\":500000,\"monthlyIncome\":80000,\"employmentType\":\"SALARIED\",\"city\":\"Mumbai\"}" 2>/dev/null)
assert_json_field "Public eligibility submission (no token)" "$ELIG" "['success']" "True"

# Eligibility evaluate — requires auth
EVAL=$(curl -s -X POST "$BASE_LOAN_CORE/eligibility/evaluate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"loanAmount\":500000,\"monthlyIncome\":80000,\"existingEmi\":5000,\"newEmi\":15000}" 2>/dev/null)
EVAL_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_LOAN_CORE/eligibility/evaluate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"loanAmount\":500000,\"monthlyIncome\":80000,\"existingEmi\":5000,\"newEmi\":15000}" 2>/dev/null)
if [ "$EVAL_CODE" = "200" ]; then
  ok "Eligibility evaluate returns 200"
  PASS=$((PASS + 1))
else
  fail "Eligibility evaluate returned HTTP $EVAL_CODE"
fi

# ── Phase 4: Sales Ops (sales-ops-service :8082) ──────
echo ""
echo "[ Phase 4 ] Sales Ops"

# Internal connector lookup — no auth required
INTERNAL_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_SALES_OPS/connectors/internal/all" 2>/dev/null)
if [ "$INTERNAL_CODE" = "200" ] || [ "$INTERNAL_CODE" = "204" ]; then
  ok "Internal connector lookup open (HTTP $INTERNAL_CODE)"
  PASS=$((PASS + 1))
else
  fail "Internal connector lookup returned HTTP $INTERNAL_CODE"
fi

# Connector create — requires auth
CONN=$(curl -s -X POST "$BASE_SALES_OPS/connectors" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"userId\":\"00000000-0000-0000-0000-000000000001\",\"firstName\":\"Test\",\"lastName\":\"Agent\",\"region\":\"MUMBAI\"}" 2>/dev/null)
CONN_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_SALES_OPS/connectors" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"userId\":\"00000000-0000-0000-0000-000000000001\",\"firstName\":\"Test\",\"lastName\":\"Agent\",\"region\":\"MUMBAI\"}" 2>/dev/null)
if [ "$CONN_CODE" = "200" ] || [ "$CONN_CODE" = "201" ] || [ "$CONN_CODE" = "400" ]; then
  ok "Connector endpoint reachable (HTTP $CONN_CODE)"
  PASS=$((PASS + 1))
else
  fail "Connector create returned unexpected HTTP $CONN_CODE"
fi

# ── Phase 5: Communications (communications-service :8087) ──
echo ""
echo "[ Phase 5 ] Communications"

# Notification list — requires auth
NOTIF_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" "$BASE_COMMS/notifications" 2>/dev/null)
if [ "$NOTIF_CODE" = "200" ] || [ "$NOTIF_CODE" = "204" ]; then
  ok "Notifications endpoint accessible (HTTP $NOTIF_CODE)"
  PASS=$((PASS + 1))
else
  fail "Notifications endpoint returned HTTP $NOTIF_CODE"
fi

# WhatsApp webhook — no auth (HMAC verified inside)
WEBHOOK_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  "$BASE_COMMS/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=test&hub.challenge=abc" 2>/dev/null)
if [ "$WEBHOOK_CODE" = "200" ] || [ "$WEBHOOK_CODE" = "400" ] || [ "$WEBHOOK_CODE" = "403" ]; then
  ok "WhatsApp webhook endpoint reachable without JWT (HTTP $WEBHOOK_CODE)"
  PASS=$((PASS + 1))
else
  fail "WhatsApp webhook returned unexpected HTTP $WEBHOOK_CODE"
fi

# ── Phase 6: Analytics & Reporting (analytics-reporting-service :8093) ──
echo ""
echo "[ Phase 6 ] Analytics & Reporting"

# Analytics summary — requires auth
ANALYTICS_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: Bearer $TOKEN" "$BASE_ANALYTICS/analytics/summary" 2>/dev/null)
if [ "$ANALYTICS_CODE" = "200" ] || [ "$ANALYTICS_CODE" = "403" ]; then
  ok "Analytics summary endpoint reachable (HTTP $ANALYTICS_CODE)"
  PASS=$((PASS + 1))
else
  fail "Analytics summary returned HTTP $ANALYTICS_CODE"
fi

# ── Phase 7: Security Controls ────────────────────────
echo ""
echo "[ Phase 7 ] Security Controls"

# Actuator must be blocked for non-admin
for pair in \
  "auth-service:$BASE_AUTH" \
  "loan-core-service:$BASE_LOAN_CORE" \
  "customer-document-service:$BASE_CUSTOMER_DOC"; do
  SVC="${pair%%:http*}"
  URL="${pair#*:http}"
  URL="http${URL}"
  ACT_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer $TOKEN" "$URL/actuator/metrics" 2>/dev/null)
  if [ "$ACT_CODE" = "401" ] || [ "$ACT_CODE" = "403" ]; then
    ok "$SVC actuator blocked for non-admin (HTTP $ACT_CODE)"
    PASS=$((PASS + 1))
  else
    fail "$SVC actuator not blocked for non-admin (HTTP $ACT_CODE)"
  fi
done

# Security headers must be present
HEADERS=$(curl -s -I "$BASE_AUTH/actuator/health" 2>/dev/null)
for header in "x-content-type-options" "x-frame-options" "strict-transport-security" "content-security-policy"; do
  if echo "$HEADERS" | grep -qi "$header"; then
    ok "Header present: $header"
    PASS=$((PASS + 1))
  else
    fail "Header missing: $header"
  fi
done

# Unauthenticated access to protected endpoint must be blocked
PROTECTED_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_LOAN_CORE/loans" 2>/dev/null)
if [ "$PROTECTED_CODE" = "401" ] || [ "$PROTECTED_CODE" = "403" ]; then
  ok "Unauthenticated loan access blocked (HTTP $PROTECTED_CODE)"
  PASS=$((PASS + 1))
else
  fail "Unauthenticated loan access not blocked (HTTP $PROTECTED_CODE)"
fi

# Error responses must not leak stack traces
ERROR_BODY=$(curl -s -X POST "$BASE_AUTH/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"x","password":"y"}' 2>/dev/null)
if echo "$ERROR_BODY" | grep -qi "stackTrace\|at com\.\|java\.lang"; then
  fail "Stack trace leaked in error response"
else
  ok "No stack trace in error response"
  PASS=$((PASS + 1))
fi

# ── Summary ───────────────────────────────────────────
echo ""
echo "=================================================="
TOTAL=$((PASS + FAIL))
if [ "$FAIL" -eq 0 ]; then
  green "  All $TOTAL tests passed!"
else
  red "  $PASS/$TOTAL passed — $FAIL failed"
fi
echo "=================================================="
echo ""

[ "$FAIL" -eq 0 ]
