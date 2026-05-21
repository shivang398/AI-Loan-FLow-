package com.financial.query.event;

import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QueryEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    public void publishQueryCreatedEvent(UUID queryId, UUID loanId) {
        publish("QUERY_CREATED", "query.created", queryId, loanId);
    }

    public void publishQueryResolvedEvent(UUID queryId, UUID loanId) {
        publish("QUERY_RESOLVED", "query.resolved", queryId, loanId);
    }

    public void publishQueryEscalatedEvent(UUID queryId, UUID loanId) {
        publish("QUERY_ESCALATED", "query.escalated", queryId, loanId);
    }

    private void publish(String eventType, String routingKey, UUID queryId, UUID loanId) {
        GlobalEvent<Object> event = GlobalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType(eventType)
                .sourceService("query-service")
                .timestamp(Instant.now())
                .traceId(UUID.randomUUID().toString())
                .payloadVersion("v1")
                .payload(Map.of("queryId", queryId.toString(), "loanId", loanId.toString()))
                .build();
        rabbitTemplate.convertAndSend(exchange, routingKey, event);
    }
}
