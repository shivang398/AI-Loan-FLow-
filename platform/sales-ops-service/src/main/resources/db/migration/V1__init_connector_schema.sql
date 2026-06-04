CREATE TABLE connectors (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    region VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE TABLE hierarchy_mapping (
    id UUID PRIMARY KEY,
    connector_id UUID REFERENCES connectors(id),
    manager_id UUID REFERENCES connectors(id),
    role VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP NOT NULL,
    assigned_by UUID
);

CREATE TABLE connector_status_history (
    id UUID PRIMARY KEY,
    connector_id UUID REFERENCES connectors(id),
    status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP NOT NULL,
    changed_by UUID,
    remarks TEXT
);

CREATE TABLE connector_performance (
    id UUID PRIMARY KEY,
    connector_id UUID REFERENCES connectors(id),
    total_leads INT DEFAULT 0,
    converted_leads INT DEFAULT 0,
    total_commission DECIMAL(15,2) DEFAULT 0,
    last_calculated_at TIMESTAMP
);
