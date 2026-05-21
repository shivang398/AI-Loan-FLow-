package com.financial.customer.event;

import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    public void publishCustomerCreatedEvent(UUID customerId, String email) {
        GlobalEvent<Object> event = GlobalEvent.builder()
                .eventId(UUID.randomUUID().toString())
                .eventType("CUSTOMER_CREATED")
                .sourceService("customer-service")
                .timestamp(Instant.now())
                .traceId(UUID.randomUUID().toString())
                .payloadVersion("v1")
                .payload(new CustomerCreatedPayload(customerId, email))
                .build();

        rabbitTemplate.convertAndSend(exchange, "customer.created", event);
    }

    public record CustomerCreatedPayload(UUID customerId, String email) {}
}
