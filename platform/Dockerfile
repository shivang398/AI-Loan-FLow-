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
WORKDIR /app

COPY --from=builder /workspace/${SERVICE_NAME}/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
