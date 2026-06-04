CREATE TABLE policy_documents (
    id                CHAR(36)      PRIMARY KEY DEFAULT (UUID()),
    title             VARCHAR(255)  NOT NULL,
    category          VARCHAR(50)   NOT NULL,
    file_name         VARCHAR(255)  NOT NULL,
    mime_type         VARCHAR(100)  NOT NULL DEFAULT 'application/pdf',
    file_data         LONGBLOB      NOT NULL,
    file_size_bytes   BIGINT,
    uploaded_by_email VARCHAR(255),
    is_active         TINYINT(1)    NOT NULL DEFAULT 1,
    uploaded_at       TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
