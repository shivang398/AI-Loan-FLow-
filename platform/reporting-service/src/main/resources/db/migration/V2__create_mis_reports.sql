CREATE TABLE mis_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rm_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(500),
    volume DECIMAL(18, 2) DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_REVIEW',
    uploaded_at TIMESTAMP NOT NULL DEFAULT now()
);
