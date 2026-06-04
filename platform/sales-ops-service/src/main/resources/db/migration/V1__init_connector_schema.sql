CREATE TABLE connectors (
    id         CHAR(36)     PRIMARY KEY,
    user_id    CHAR(36)     UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    phone      VARCHAR(20)  UNIQUE NOT NULL,
    region     VARCHAR(100),
    status     VARCHAR(50)  NOT NULL,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NULL,
    created_by CHAR(36),
    updated_by CHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE hierarchy_mapping (
    id           CHAR(36)  PRIMARY KEY,
    connector_id CHAR(36),
    manager_id   CHAR(36),
    role         VARCHAR(50) NOT NULL,
    assigned_at  TIMESTAMP   NOT NULL,
    assigned_by  CHAR(36),
    CONSTRAINT fk_hm_connector FOREIGN KEY (connector_id) REFERENCES connectors(id),
    CONSTRAINT fk_hm_manager   FOREIGN KEY (manager_id)   REFERENCES connectors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE connector_status_history (
    id           CHAR(36)    PRIMARY KEY,
    connector_id CHAR(36),
    status       VARCHAR(50) NOT NULL,
    changed_at   TIMESTAMP   NOT NULL,
    changed_by   CHAR(36),
    remarks      TEXT,
    CONSTRAINT fk_csh_connector FOREIGN KEY (connector_id) REFERENCES connectors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE connector_performance (
    id                 CHAR(36)        PRIMARY KEY,
    connector_id       CHAR(36),
    total_leads        INT             DEFAULT 0,
    converted_leads    INT             DEFAULT 0,
    total_commission   DECIMAL(15,2)   DEFAULT 0,
    last_calculated_at TIMESTAMP       NULL,
    CONSTRAINT fk_cp_connector FOREIGN KEY (connector_id) REFERENCES connectors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
