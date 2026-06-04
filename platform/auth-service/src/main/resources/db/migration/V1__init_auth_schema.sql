CREATE TABLE users (
    id            CHAR(36) PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status        VARCHAR(50)  NOT NULL,
    created_at    TIMESTAMP    NOT NULL,
    updated_at    TIMESTAMP    NULL,
    created_by    CHAR(36),
    updated_by    CHAR(36)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE roles (
    id   CHAR(36)     PRIMARY KEY,
    name VARCHAR(50)  UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_roles (
    user_id CHAR(36) NOT NULL,
    role_id CHAR(36) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_ur_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE refresh_tokens (
    id         CHAR(36)     PRIMARY KEY,
    user_id    CHAR(36)     NOT NULL,
    token      VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP    NOT NULL,
    revoked    TINYINT(1)   DEFAULT 0,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NULL,
    created_by CHAR(36),
    updated_by CHAR(36),
    CONSTRAINT fk_rt_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE audit_logs (
    id         CHAR(36)     PRIMARY KEY,
    user_id    CHAR(36),
    action     VARCHAR(255) NOT NULL,
    details    JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP    NOT NULL,
    CONSTRAINT fk_al_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (id, name) VALUES (UUID(), 'ADMIN');
INSERT INTO roles (id, name) VALUES (UUID(), 'RM');
INSERT INTO roles (id, name) VALUES (UUID(), 'TEAM_LEADER');
INSERT INTO roles (id, name) VALUES (UUID(), 'CONNECTOR');
INSERT INTO roles (id, name) VALUES (UUID(), 'OPERATIONS');
