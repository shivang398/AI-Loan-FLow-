# Shared multi-stage Dockerfile for all Java microservices.
# Build with: docker build --build-arg SERVICE_NAME=auth-service -t auth-service .
# On Railway: set Build Argument SERVICE_NAME=<service-name> per service.

ARG SERVICE_NAME=auth-service

# ── Build Stage ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:26-jdk-noble AS builder
ARG SERVICE_NAME
WORKDIR /workspace

RUN apt-get update && apt-get install -y --no-install-recommends maven && \
    rm -rf /var/lib/apt/lists/*

# Copy parent POM and ALL module POMs so Maven can resolve the full reactor.
# Maven validates every <module> listed in the parent pom.xml exists on disk;
# missing directories cause "child module does not exist" build failures.
COPY pom.xml .
COPY common-lib/pom.xml            ./common-lib/pom.xml
COPY auth-service/pom.xml          ./auth-service/pom.xml
COPY connector-service/pom.xml     ./connector-service/pom.xml
COPY customer-service/pom.xml      ./customer-service/pom.xml
COPY loan-service/pom.xml          ./loan-service/pom.xml
COPY eligibility-service/pom.xml   ./eligibility-service/pom.xml
COPY policy-service/pom.xml        ./policy-service/pom.xml
COPY sm-routing-service/pom.xml    ./sm-routing-service/pom.xml
COPY rm-tracking-service/pom.xml   ./rm-tracking-service/pom.xml
COPY query-service/pom.xml         ./query-service/pom.xml
COPY document-service/pom.xml      ./document-service/pom.xml
COPY notification-service/pom.xml  ./notification-service/pom.xml
COPY commission-service/pom.xml    ./commission-service/pom.xml
COPY reporting-service/pom.xml     ./reporting-service/pom.xml
COPY analytics-service/pom.xml     ./analytics-service/pom.xml
COPY messaging-service/pom.xml     ./messaging-service/pom.xml

# Pre-download dependencies (cached unless POMs change)
RUN mvn -pl common-lib,${SERVICE_NAME} -am dependency:go-offline -q 2>/dev/null || true

# Copy sources
COPY common-lib/src ./common-lib/src
COPY ${SERVICE_NAME}/src ./${SERVICE_NAME}/src

# Build
RUN mvn -pl common-lib,${SERVICE_NAME} -am package -DskipTests -Dmaven.enforcer.skip=true -q

# ── Runtime Stage ────────────────────────────────────────────────────────────
FROM eclipse-temurin:26-jdk-noble AS runtime
ARG SERVICE_NAME
WORKDIR /app

COPY --from=builder /workspace/${SERVICE_NAME}/target/*.jar app.jar

# Railway injects PORT; Spring Boot reads it via --server.port below.
# Defaults to 8080 when running locally.
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
