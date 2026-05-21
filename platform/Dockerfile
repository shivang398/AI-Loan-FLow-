ARG SERVICE_NAME=loan-service

# ── Build Stage ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:26-jdk-noble AS builder
ARG SERVICE_NAME
WORKDIR /workspace

RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/* && \
    curl -fsSL https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz \
        | tar -xz -C /opt && \
    ln -s /opt/apache-maven-3.9.9/bin/mvn /usr/local/bin/mvn

# Copy entire platform directory so Maven can resolve all declared modules
COPY . .

RUN mvn -pl common-lib,${SERVICE_NAME} -am package -DskipTests -Denforcer.skip=true -q

# ── Runtime Stage ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:26-jdk-noble AS runtime
ARG SERVICE_NAME
WORKDIR /app

COPY --from=builder /workspace/${SERVICE_NAME}/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
