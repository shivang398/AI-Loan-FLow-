CREATE TABLE team_meeting_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_key VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE team_meeting_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_key VARCHAR(255) NOT NULL,
    sender_id VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_role VARCHAR(100),
    sender_initials VARCHAR(10),
    body TEXT NOT NULL,
    message_type VARCHAR(50) NOT NULL DEFAULT 'TEXT',
    status VARCHAR(50) NOT NULL DEFAULT 'DELIVERED',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_team_meeting_messages_room_key ON team_meeting_messages(room_key);
