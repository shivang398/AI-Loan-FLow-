CREATE TABLE documents (
    id             CHAR(36)     PRIMARY KEY,
    loan_id        CHAR(36)     NOT NULL,
    uploaded_by    CHAR(36)     NOT NULL,
    document_type  VARCHAR(100) NOT NULL,
    s3_key         VARCHAR(500) NOT NULL,
    file_name      VARCHAR(255) NOT NULL,
    mime_type      VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT,
    status         VARCHAR(50)  NOT NULL,
    created_at     TIMESTAMP    NOT NULL,
    updated_at     TIMESTAMP    NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE document_versions (
    id             CHAR(36) PRIMARY KEY,
    document_id    CHAR(36),
    version_number INT          NOT NULL,
    s3_key         VARCHAR(500) NOT NULL,
    uploaded_at    TIMESTAMP    NOT NULL,
    uploaded_by    CHAR(36),
    CONSTRAINT fk_dv_doc FOREIGN KEY (document_id) REFERENCES documents(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE document_access_logs (
    id          CHAR(36)    PRIMARY KEY,
    document_id CHAR(36),
    accessed_by CHAR(36)    NOT NULL,
    access_type VARCHAR(50) NOT NULL,
    accessed_at TIMESTAMP   NOT NULL,
    CONSTRAINT fk_dal_doc FOREIGN KEY (document_id) REFERENCES documents(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
