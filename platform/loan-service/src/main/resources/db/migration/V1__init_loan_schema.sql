CREATE TABLE loan_applications (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL,
    connector_id UUID,
    amount DECIMAL(15,2) NOT NULL,
    tenure_months INT NOT NULL,
    purpose VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE TABLE application_status_history (
    id UUID PRIMARY KEY,
    loan_id UUID REFERENCES loan_applications(id),
    status VARCHAR(50) NOT NULL,
    remarks TEXT,
    changed_at TIMESTAMP NOT NULL,
    changed_by UUID
);
