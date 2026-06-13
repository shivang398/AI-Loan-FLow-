ARG SERVICE_NAME=auth-service

# ── Build Stage ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:25-jdk-alpine AS builder
ARG SERVICE_NAME
WORKDIR /workspace

RUN apk add --no-cache curl && \
    curl -fsSL https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz \
        | tar -xz -C /opt && \
    ln -s /opt/apache-maven-3.9.9/bin/mvn /usr/local/bin/mvn

# Copy entire platform directory so Maven can resolve all declared modules
COPY . .

RUN mvn -pl common-lib,${SERVICE_NAME} -am package -DskipTests -Denforcer.skip=true -q

# ── Runtime Stage ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:25-jre-alpine AS runtime
ARG SERVICE_NAME

# Run as non-root (A02 — least privilege)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --from=builder /workspace/${SERVICE_NAME}/target/*.jar app.jar
RUN chown appuser:appgroup app.jar

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
  CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

# exec replaces sh so SIGTERM goes directly to the JVM
ENTRYPOINT ["sh", "-c", "exec java \
  -XX:+UseContainerSupport \
  -XX:MaxRAMPercentage=75.0 \
  -XX:+ExitOnOutOfMemoryError \
  -Djava.security.egd=file:/dev/./urandom \
  -jar /app/app.jar --server.port=${PORT:-8080}"]
