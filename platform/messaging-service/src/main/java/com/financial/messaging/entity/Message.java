package com.financial.messaging.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Column(name = "sender_type", nullable = false)
    private String senderType;

    @Column(name = "internal_sender_id")
    private UUID internalSenderId;

    @Column(name = "message_channel", nullable = false)
    private String messageChannel;

    @Column(name = "message_body", columnDefinition = "TEXT")
    private String messageBody;

    @Column(name = "message_type", nullable = false)
    private String messageType;

    @Column(name = "delivery_status", nullable = false)
    private String deliveryStatus;

    @Column(name = "whatsapp_message_id")
    private String whatsappMessageId;

    @Column(name = "trace_id")
    private String traceId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}
