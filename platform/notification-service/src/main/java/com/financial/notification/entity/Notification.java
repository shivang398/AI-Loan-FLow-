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
    private String channel;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String title;

    @Column(nullable = false)
    private boolean read = false;

    @Column(name = "idempotency_key", unique = true)
    private String idempotencyKey;

    @Column(name = "retry_count")
    private Integer retryCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    public Notification() {}

    // Getters
    public UUID getId() { return id; }
    public UUID getRecipientId() { return recipientId; }
    public String getChannel() { return channel; }
    public String getType() { return type; }
    public String getStatus() { return status; }
    public String getContent() { return content; }
    public String getTitle() { return title; }
    public boolean isRead() { return read; }
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
    public void setTitle(String title) { this.title = title; }
    public void setRead(boolean read) { this.read = read; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }
    public void setRetryCount(Integer retryCount) { this.retryCount = retryCount; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static NotificationBuilder builder() { return new NotificationBuilder(); }

    public static class NotificationBuilder {
        private UUID id;
        private UUID recipientId;
        private String channel;
        private String type;
        private String status;
        private String content;
        private String title;
        private boolean read = false;
        private String idempotencyKey;
        private Integer retryCount = 0;
        private Instant createdAt;

        public NotificationBuilder id(UUID id) { this.id = id; return this; }
        public NotificationBuilder recipientId(UUID recipientId) { this.recipientId = recipientId; return this; }
        public NotificationBuilder channel(String channel) { this.channel = channel; return this; }
        public NotificationBuilder type(String type) { this.type = type; return this; }
        public NotificationBuilder status(String status) { this.status = status; return this; }
        public NotificationBuilder content(String content) { this.content = content; return this; }
        public NotificationBuilder title(String title) { this.title = title; return this; }
        public NotificationBuilder read(boolean read) { this.read = read; return this; }
        public NotificationBuilder idempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; return this; }
        public NotificationBuilder retryCount(Integer retryCount) { this.retryCount = retryCount; return this; }
        public NotificationBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Notification build() {
            Notification n = new Notification();
            n.id = id; n.recipientId = recipientId; n.channel = channel;
            n.type = type; n.status = status; n.content = content;
            n.title = title; n.read = read; n.idempotencyKey = idempotencyKey;
            n.retryCount = retryCount; n.createdAt = createdAt;
            return n;
        }
    }
}
