package com.financial.routing.event;

import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoutingEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    public void publishSmAssignedEvent(UUID loanId, UUID smId) {
        GlobalEvent<Object> event = GlobalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType("SM_ASSIGNED")
                .sourceService("sm-routing-service")
                .timestamp(Instant.now())
                .traceId(UUID.randomUUID().toString())
                .payloadVersion("v1")
                .payload(new SmAssignedPayload(loanId, smId))
                .build();

        rabbitTemplate.convertAndSend(exchange, "routing.sm.assigned", event);
    }

    public record SmAssignedPayload(UUID loanId, UUID smId) {}
}
