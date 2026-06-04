CREATE TABLE customers (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE TABLE customer_kyc (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    pan_number VARCHAR(20) UNIQUE NOT NULL,
    aadhaar_number VARCHAR(20) UNIQUE,
    kyc_status VARCHAR(50) NOT NULL,
    verified_at TIMESTAMP
);

CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    address_type VARCHAR(50) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE customer_history (
    id UUID PRIMARY KEY,
    customer_id UUID REFERENCES customers(id),
    action VARCHAR(100) NOT NULL,
    description TEXT,
    action_at TIMESTAMP NOT NULL,
    action_by UUID
);
