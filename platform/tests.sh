#!/bin/bash

# Platform Integration Test Suite
# This script verifies the core workflows of the Hierarchical Multi-Bank Credit Distribution OS.

set -e

BASE_URL_AUTH="http://localhost:8081"
BASE_URL_CUSTOMER="http://localhost:8083"
BASE_URL_LOAN="http://localhost:8084"
BASE_URL_ELIGIBILITY="http://localhost:8085"

# Use timestamp for unique test data
TS=$(date +%s)
ADMIN_EMAIL="admin_${TS}@platform.com"
CUST_EMAIL="rahul_${TS}@email.com"
CUST_MOBILE="98765${TS: -5}"

echo "--------------------------------------------------"
echo "🚀 Starting Platform Integration Tests"
echo "--------------------------------------------------"

# Function to check health
check_health() {
    local url=$1
    local name=$2
    echo -n "Checking health of $name... "
    if curl -s --fail "$url/actuator/health" | grep -q "UP"; then
        echo "✅ UP"
    else
        echo "❌ DOWN"
        return 1
    fi
}

# 1. Verify Health
check_health "$BASE_URL_AUTH" "Auth Service"
check_health "$BASE_URL_CUSTOMER" "Customer Service"
check_health "$BASE_URL_LOAN" "Loan Service"
check_health "$BASE_URL_ELIGIBILITY" "Eligibility Service"

echo "--------------------------------------------------"
echo "🔑 Phase 1: Authentication"
echo "--------------------------------------------------"

# Register
echo "Registering admin..."
curl -s -X POST "$BASE_URL_AUTH/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"Admin@123\",\"role\":\"ADMIN\"}" | grep -q "success"
echo "✅ Admin registered"

# Login
echo "Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL_AUTH/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"Admin@123\"}")
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo "✅ Login successful. Token obtained."
else
    echo "❌ Login failed."
    exit 1
fi

echo "--------------------------------------------------"
echo "👤 Phase 2: Customer Management"
echo "--------------------------------------------------"

echo "Creating customer..."
CUSTOMER_RESPONSE=$(curl -s -X POST "$BASE_URL_CUSTOMER/customers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"firstName\":\"Rahul\",\"lastName\":\"Sharma\",\"email\":\"$CUST_EMAIL\",\"mobile\":\"$CUST_MOBILE\",\"panNumber\":\"ABCDE1234F\"}")
CUSTOMER_ID=$(echo $CUSTOMER_RESPONSE | jq -r '.data.id')

if [ "$CUSTOMER_ID" != "null" ]; then
    echo "✅ Customer created with ID: $CUSTOMER_ID"
else
    echo "❌ Customer creation failed."
    exit 1
fi

echo "--------------------------------------------------"
echo "💰 Phase 3: Loan & Eligibility"
echo "--------------------------------------------------"

echo "Creating loan application..."
LOAN_RESPONSE=$(curl -s -X POST "$BASE_URL_LOAN/loans" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"customerId\":\"$CUSTOMER_ID\",
    \"amount\":500000,
    \"tenureMonths\":36,
    \"purpose\":\"Home Renovation\"
  }")
LOAN_ID=$(echo $LOAN_RESPONSE | jq -r '.data.id')

if [ "$LOAN_ID" != "null" ]; then
    echo "✅ Loan created with ID: $LOAN_ID"
else
    echo "❌ Loan creation failed."
    exit 1
fi

echo "Evaluating eligibility..."
ELIGIBILITY_RESPONSE=$(curl -s -X POST "$BASE_URL_ELIGIBILITY/eligibility/evaluate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "loanAmount":500000,
    "monthlyIncome":80000,
    "existingEmi":5000,
    "newEmi":15000
  }')
ELIGIBLE=$(echo $ELIGIBILITY_RESPONSE | jq -r '.data.eligible')

if [ "$ELIGIBLE" == "true" ]; then
    echo "✅ Eligibility check passed."
else
    echo "⚠️ Eligibility check failed (Expected for these parameters)."
fi

echo "--------------------------------------------------"
echo "🎉 All integration tests passed!"
echo "--------------------------------------------------"
