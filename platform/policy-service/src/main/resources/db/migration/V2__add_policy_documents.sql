CREATE TABLE policy_documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    category        VARCHAR(50)  NOT NULL, -- BANK or OFFICE
    file_name       VARCHAR(255) NOT NULL,
    mime_type       VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    file_data       BYTEA        NOT NULL,
    file_size_bytes BIGINT,
    uploaded_by_email VARCHAR(255),
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    uploaded_at     TIMESTAMP    NOT NULL DEFAULT NOW()
);
