package com.financial.loan.event;

import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    public void publishFileCreatedEvent(UUID loanId, UUID customerId) {
        GlobalEvent<Object> event = GlobalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType("FILE_CREATED")
                .sourceService("loan-service")
                .timestamp(Instant.now())
                .traceId(UUID.randomUUID().toString())
                .payloadVersion("v1")
                .payload(new FileCreatedPayload(loanId, customerId))
                .build();

        rabbitTemplate.convertAndSend(exchange, "loan.file.created", event);
    }

    public void publishStatusUpdatedEvent(UUID loanId, String newStatus) {
        GlobalEvent<Object> event = GlobalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType("STATUS_UPDATED")
                .sourceService("loan-service")
                .timestamp(Instant.now())
                .traceId(UUID.randomUUID().toString())
                .payloadVersion("v1")
                .payload(new StatusUpdatedPayload(loanId, newStatus))
                .build();

        rabbitTemplate.convertAndSend(exchange, "loan.status.updated", event);
    }

    public record FileCreatedPayload(UUID loanId, UUID customerId) {}
    public record StatusUpdatedPayload(UUID loanId, String status) {}
}
