CREATE TABLE report_jobs (
    id UUID PRIMARY KEY,
    report_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    requested_by UUID,
    file_path VARCHAR(500),
    requested_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP
);
