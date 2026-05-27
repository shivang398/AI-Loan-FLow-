INSERT INTO roles (id, name) VALUES (gen_random_uuid(), 'PARTNER_MANAGER') ON CONFLICT (name) DO NOTHING;
