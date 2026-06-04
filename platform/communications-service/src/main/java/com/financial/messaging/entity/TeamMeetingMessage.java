package com.financial.messaging.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "team_meeting_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMeetingMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "room_key", nullable = false)
    private String roomKey;

    @Column(name = "sender_id", nullable = false)
    private String senderId;

    @Column(name = "sender_name", nullable = false)
    private String senderName;

    @Column(name = "sender_role")
    private String senderRole;

    @Column(name = "sender_initials")
    private String senderInitials;

    @Column(name = "body", nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(name = "message_type", nullable = false)
    private String messageType;

    @Column(name = "status", nullable = false)
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
