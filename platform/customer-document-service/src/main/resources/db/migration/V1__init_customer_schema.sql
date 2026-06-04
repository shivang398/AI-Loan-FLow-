CREATE TABLE customers (
    id         CHAR(36)     PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    mobile     VARCHAR(20)  UNIQUE NOT NULL,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NULL,
    created_by CHAR(36),
    updated_by CHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE customer_kyc (
    id             CHAR(36)    PRIMARY KEY,
    customer_id    CHAR(36),
    pan_number     VARCHAR(512) UNIQUE NOT NULL,
    aadhaar_number VARCHAR(512) UNIQUE,
    kyc_status     VARCHAR(50)  NOT NULL,
    verified_at    TIMESTAMP    NULL,
    CONSTRAINT fk_kyc_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE customer_addresses (
    id           CHAR(36)     PRIMARY KEY,
    customer_id  CHAR(36),
    address_type VARCHAR(50)  NOT NULL,
    street       VARCHAR(255) NOT NULL,
    city         VARCHAR(100) NOT NULL,
    state        VARCHAR(100) NOT NULL,
    pincode      VARCHAR(20)  NOT NULL,
    is_primary   TINYINT(1)   DEFAULT 0,
    CONSTRAINT fk_ca_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE customer_history (
    id          CHAR(36)     PRIMARY KEY,
    customer_id CHAR(36),
    action      VARCHAR(100) NOT NULL,
    description TEXT,
    action_at   TIMESTAMP    NOT NULL,
    action_by   CHAR(36),
    CONSTRAINT fk_ch_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
