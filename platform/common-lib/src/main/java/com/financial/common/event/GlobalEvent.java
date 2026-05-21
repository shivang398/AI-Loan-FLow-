package com.financial.common.event;

import java.time.Instant;

/**
 * Global event structure for cross-service communication.
 */
public class GlobalEvent<T> {
    private String eventId;
    private String eventType;
    private String sourceService;
    private Instant timestamp;
    private String traceId;
    private String payloadVersion;
    private T payload;

    public GlobalEvent() {}

    public GlobalEvent(String eventId, String eventType, String sourceService, Instant timestamp, String traceId, String payloadVersion, T payload) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.sourceService = sourceService;
        this.timestamp = timestamp;
        this.traceId = traceId;
        this.payloadVersion = payloadVersion;
        this.payload = payload;
    }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getSourceService() { return sourceService; }
    public void setSourceService(String sourceService) { this.sourceService = sourceService; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public String getTraceId() { return traceId; }
    public void setTraceId(String traceId) { this.traceId = traceId; }
    public String getPayloadVersion() { return payloadVersion; }
    public void setPayloadVersion(String payloadVersion) { this.payloadVersion = payloadVersion; }
    public T getPayload() { return payload; }
    public void setPayload(T payload) { this.payload = payload; }

    public static <T> GlobalEventBuilder<T> builder() {
        return new GlobalEventBuilder<>();
    }

    public static class GlobalEventBuilder<T> {
        private String eventId;
        private String eventType;
        private String sourceService;
        private Instant timestamp;
        private String traceId;
        private String payloadVersion;
        private T payload;

        public GlobalEventBuilder<T> eventId(String eventId) { this.eventId = eventId; return this; }
        public GlobalEventBuilder<T> eventType(String eventType) { this.eventType = eventType; return this; }
        public GlobalEventBuilder<T> sourceService(String sourceService) { this.sourceService = sourceService; return this; }
        public GlobalEventBuilder<T> timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }
        public GlobalEventBuilder<T> traceId(String traceId) { this.traceId = traceId; return this; }
        public GlobalEventBuilder<T> payloadVersion(String payloadVersion) { this.payloadVersion = payloadVersion; return this; }
        public GlobalEventBuilder<T> payload(T payload) { this.payload = payload; return this; }

        public GlobalEvent<T> build() {
            return new GlobalEvent<>(eventId, eventType, sourceService, timestamp, traceId, payloadVersion, payload);
        }
    }
}
