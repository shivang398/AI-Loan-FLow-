CREATE TABLE operational_status (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    rm_id UUID NOT NULL,
    bank_status VARCHAR(50) NOT NULL,
    remarks TEXT,
    updated_at TIMESTAMP NOT NULL,
    updated_by UUID
);

CREATE TABLE workflow_updates (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    notes TEXT,
    performed_at TIMESTAMP NOT NULL,
    performed_by UUID
);

CREATE TABLE rm_actions (
    id UUID PRIMARY KEY,
    rm_id UUID NOT NULL,
    loan_id UUID NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    action_at TIMESTAMP NOT NULL
);
