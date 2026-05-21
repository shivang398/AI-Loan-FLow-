package com.financial.notification.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "recipient_id", nullable = false)
    private UUID recipientId;

    @Column(nullable = false)
    private String channel;   // EMAIL, SMS, WHATSAPP

    @Column(nullable = false)
    private String type;      // APPROVED, REJECTED, QUERY_CREATED, etc.

    @Column(nullable = false)
    private String status;    // PENDING, SENT, FAILED

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "idempotency_key", unique = true)
    private String idempotencyKey;

    @Column(name = "retry_count")
    private Integer retryCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    public Notification() {}

    public Notification(UUID id, UUID recipientId, String channel, String type,
                        String status, String content, String idempotencyKey,
                        Integer retryCount, Instant createdAt) {
        this.id = id;
        this.recipientId = recipientId;
        this.channel = channel;
        this.type = type;
        this.status = status;
        this.content = content;
        this.idempotencyKey = idempotencyKey;
        this.retryCount = retryCount;
        this.createdAt = createdAt;
    }

    // Getters
    public UUID getId() { return id; }
    public UUID getRecipientId() { return recipientId; }
    public String getChannel() { return channel; }
    public String getType() { return type; }
    public String getStatus() { return status; }
    public String getContent() { return content; }
    public String getIdempotencyKey() { return idempotencyKey; }
    public Integer getRetryCount() { return retryCount; }
    public Instant getCreatedAt() { return createdAt; }

    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setRecipientId(UUID recipientId) { this.recipientId = recipientId; }
    public void setChannel(String channel) { this.channel = channel; }
    public void setType(String type) { this.type = type; }
    public void setStatus(String status) { this.status = status; }
    public void setContent(String content) { this.content = content; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }
    public void setRetryCount(Integer retryCount) { this.retryCount = retryCount; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    // Builder
    public static NotificationBuilder builder() { return new NotificationBuilder(); }

    public static class NotificationBuilder {
        private UUID id;
        private UUID recipientId;
        private String channel;
        private String type;
        private String status;
        private String content;
        private String idempotencyKey;
        private Integer retryCount = 0;
        private Instant createdAt;

        public NotificationBuilder id(UUID id) { this.id = id; return this; }
        public NotificationBuilder recipientId(UUID recipientId) { this.recipientId = recipientId; return this; }
        public NotificationBuilder channel(String channel) { this.channel = channel; return this; }
        public NotificationBuilder type(String type) { this.type = type; return this; }
        public NotificationBuilder status(String status) { this.status = status; return this; }
        public NotificationBuilder content(String content) { this.content = content; return this; }
        public NotificationBuilder idempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; return this; }
        public NotificationBuilder retryCount(Integer retryCount) { this.retryCount = retryCount; return this; }
        public NotificationBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Notification build() {
            return new Notification(id, recipientId, channel, type, status, content, idempotencyKey, retryCount, createdAt);
        }
    }
}
