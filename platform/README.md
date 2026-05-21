# Hierarchical Multi-Bank Credit Distribution OS
# Complete Platform Build & Run Guide

## Prerequisites
- Docker & Docker Compose
- Java 21+
- Maven 3.9+

---

## Step 1: Start Infrastructure
```bash
cd /home/shivang/Desktop/Auditor/platform
chmod +x init-multiple-databases.sh
docker-compose up -d
```

**Wait for health checks to pass (≈30s):**
```bash
docker-compose ps
```

---

## Step 2: Verify All 14 Databases Created
```bash
docker exec platform-postgres psql -U postgres -c "\l" | grep platform
```

Expected output:
```
platform_analytics
platform_auth
platform_commission
platform_connector
platform_customer
platform_document
platform_eligibility
platform_loan
platform_notification
platform_policy
platform_query
platform_reporting
platform_rm_tracking
platform_routing
```

---

## Step 3: Run Services (Dev Mode)
Run each service in a separate terminal:

```bash
# Terminal 1 — Auth Service (port 8081)
cd auth-service && mvn spring-boot:run

# Terminal 2 — Connector Service (port 8082)
cd connector-service && mvn spring-boot:run

# Terminal 3 — Customer Service (port 8083)
cd customer-service && mvn spring-boot:run

# Terminal 4 — Loan Service (port 8084)
cd loan-service && mvn spring-boot:run

# Terminal 5 — Eligibility Service (port 8085)
cd eligibility-service && mvn spring-boot:run

# Terminal 6 — Policy Service (port 8086)
cd policy-service && mvn spring-boot:run

# Terminal 7 — SM Routing Service (port 8087)
cd sm-routing-service && mvn spring-boot:run

# Terminal 8 — RM Tracking Service (port 8088)
cd rm-tracking-service && mvn spring-boot:run

# Terminal 9 — Query Service (port 8089)
cd query-service && mvn spring-boot:run

# Terminal 10 — Document Service (port 8090)
cd document-service && mvn spring-boot:run

# Terminal 11 — Notification Service (port 8091)
cd notification-service && mvn spring-boot:run

# Terminal 12 — Commission Service (port 8092)
cd commission-service && mvn spring-boot:run

# Terminal 13 — Reporting Service (port 8093)
cd reporting-service && mvn spring-boot:run

# Terminal 14 — Analytics Service (port 8094)
cd analytics-service && mvn spring-boot:run
```

---

## Step 4: Verify Health
All services expose actuator at `/actuator/health`:
```bash
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
curl http://localhost:8083/actuator/health
# ... etc
```

---

## Step 5: Manual API Testing

### Auth Service (port 8081)
**Register:**
```bash
curl -X POST http://localhost:8081/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@platform.com","password":"Admin@123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8081/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@platform.com","password":"Admin@123"}'
```

### Customer Service (port 8083)
**Create Customer:**
```bash
curl -X POST http://localhost:8083/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Rahul",
    "lastName":"Sharma",
    "email":"rahul@email.com",
    "mobile":"9876543210",
    "panNumber":"ABCDE1234F"
  }'
```

### Loan Service (port 8084)
**Create Loan:**
```bash
curl -X POST http://localhost:8084/loans \
  -H "Content-Type: application/json" \
  -d '{
    "customerId":"<uuid-from-above>",
    "amount":500000,
    "tenureMonths":36,
    "purpose":"Home Renovation"
  }'
```

### Eligibility Service (port 8085)
**Evaluate:**
```bash
curl -X POST http://localhost:8085/eligibility/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "loanAmount":500000,
    "monthlyIncome":80000,
    "existingEmi":5000,
    "newEmi":15000
  }'
```

### Query Service (port 8089)
**Create Query:**
```bash
curl -X POST http://localhost:8089/queries \
  -H "Content-Type: application/json" \
  -d '{
    "loanId":"<loan-uuid>",
    "subject":"Missing income proof",
    "description":"Please provide latest salary slips"
  }'
```

### Reporting Service (port 8093)
**Download Excel Report:**
```bash
curl -OJ http://localhost:8093/reports/connector-summary/download
```

---

## RabbitMQ Management Console
http://localhost:15672 (guest/guest)

## Service Port Map
| Service             | Port |
|---------------------|------|
| auth-service        | 8081 |
| connector-service   | 8082 |
| customer-service    | 8083 |
| loan-service        | 8084 |
| eligibility-service | 8085 |
| policy-service      | 8086 |
| sm-routing-service  | 8087 |
| rm-tracking-service | 8088 |
| query-service       | 8089 |
| document-service    | 8090 |
| notification-service| 8091 |
| commission-service  | 8092 |
| reporting-service   | 8093 |
| analytics-service   | 8094 |
