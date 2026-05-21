CREATE TABLE sales_managers (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    branch_id VARCHAR(50),
    approval_rate DECIMAL(5,2) DEFAULT 0.0,
    tat_score DECIMAL(5,2) DEFAULT 0.0,
    current_capacity INT DEFAULT 0,
    max_capacity INT DEFAULT 100,
    experience_score DECIMAL(5,2) DEFAULT 0.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE routing_history (
    id UUID PRIMARY KEY,
    loan_id UUID NOT NULL,
    assigned_sm_id UUID REFERENCES sales_managers(id),
    routing_score DECIMAL(10,4),
    assigned_at TIMESTAMP NOT NULL
);
