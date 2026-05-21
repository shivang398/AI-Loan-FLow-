CREATE TABLE documents (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    uploaded_by UUID NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size_bytes BIGINT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE document_versions (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    version_number INT NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL,
    uploaded_by UUID
);

CREATE TABLE document_access_logs (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    accessed_by UUID NOT NULL,
    access_type VARCHAR(50) NOT NULL,
    accessed_at TIMESTAMP NOT NULL
);
