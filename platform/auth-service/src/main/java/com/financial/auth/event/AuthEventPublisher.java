package com.financial.auth.event;

import com.financial.common.event.GlobalEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    public AuthEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishUserCreatedEvent(UUID userId, String email, Set<String> roles) {
        GlobalEvent<Object> event = new GlobalEvent<>(
                UUID.randomUUID().toString(),
                "USER_CREATED",
                "auth-service",
                Instant.now(),
                UUID.randomUUID().toString(),
                "v1",
                new UserCreatedPayload(userId, email, roles)
        );

        rabbitTemplate.convertAndSend(exchange, "auth.user.created", event);
    }

    public record UserCreatedPayload(UUID userId, String email, Set<String> roles) {}
}
