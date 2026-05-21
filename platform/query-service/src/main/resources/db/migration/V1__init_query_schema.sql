CREATE TABLE queries (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    raised_by UUID NOT NULL,
    assigned_to UUID,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    sla_deadline TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE query_comments (
    id UUID PRIMARY KEY,
    query_id UUID REFERENCES queries(id),
    comment TEXT NOT NULL,
    commented_by UUID NOT NULL,
    commented_at TIMESTAMP NOT NULL
);

CREATE TABLE escalation_logs (
    id UUID PRIMARY KEY,
    query_id UUID REFERENCES queries(id),
    escalated_to UUID NOT NULL,
    reason TEXT,
    escalated_at TIMESTAMP NOT NULL
);
