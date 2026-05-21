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

# Copy parent POM and common-lib POM first (better cache layering)
COPY pom.xml .
COPY common-lib/pom.xml ./common-lib/pom.xml
COPY ${SERVICE_NAME}/pom.xml ./${SERVICE_NAME}/pom.xml

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
