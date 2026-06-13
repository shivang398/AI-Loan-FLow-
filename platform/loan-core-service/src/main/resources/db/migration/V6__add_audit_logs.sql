CREATE TABLE audit_logs (
    id           CHAR(36)      PRIMARY KEY DEFAULT (UUID()),
    action       VARCHAR(100)  NOT NULL,
    actor_email  VARCHAR(255),
    entity_type  VARCHAR(100),
    entity_id    VARCHAR(255),
    details      TEXT,
    created_at   DATETIME(6)   NOT NULL DEFAULT NOW(6)
);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_actor      ON audit_logs(actor_email);
CREATE INDEX idx_audit_entity     ON audit_logs(entity_type, entity_id);
