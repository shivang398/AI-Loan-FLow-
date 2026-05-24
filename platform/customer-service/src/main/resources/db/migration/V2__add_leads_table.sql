CREATE TABLE leads (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    pan_number VARCHAR(20) NOT NULL,
    loan_type VARCHAR(50),
    loan_amount NUMERIC(15, 2),
    assigned_to VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    customer_id UUID REFERENCES customers(id),
    created_at TIMESTAMP NOT NULL
);
