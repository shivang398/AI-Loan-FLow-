package com.financial.connector.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.common.event.GlobalEvent;
import com.financial.connector.entity.Connector;
import com.financial.connector.repository.ConnectorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserCreatedEventConsumer {

    private final ObjectMapper objectMapper;
    private final ConnectorRepository connectorRepository;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "connector.user.created.queue", durable = "true"),
            exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
            key = "auth.user.created"
    ))
    public void handleUserCreatedEvent(GlobalEvent<?> event) {
        log.info("Received USER_CREATED event: {}", event.getEventId());
        
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String userIdStr = (String) payload.get("userId");
            String email = (String) payload.get("email");
            @SuppressWarnings("unchecked")
            Set<String> roles = (Set<String>) payload.get("roles");
            
            if (userIdStr != null && roles != null && !roles.isEmpty()) {
                UUID userId = UUID.fromString(userIdStr);

                if (connectorRepository.findByUserId(userId).isEmpty()) {
                    String primaryRole = roles.stream()
                            .map(r -> r.replace("ROLE_", ""))
                            .filter(r -> !r.isBlank() && !r.equals("FACTOR_PASSWORD"))
                            .findFirst()
                            .orElse("CONNECTOR");

                    log.info("Creating staff profile for user: {} with role: {}", email, primaryRole);
                    String namePart = email.split("@")[0];
                    Connector profile = Connector.builder()
                            .userId(userId)
                            .firstName(namePart)
                            .lastName("")
                            .phone("")
                            .region("NATIONAL")
                            .status("ACTIVE")
                            .role(primaryRole)
                            .email(email)
                            .build();
                    connectorRepository.save(profile);
                    log.info("Profile created for user ID: {} with role: {}", userId, primaryRole);
                } else {
                    log.info("Profile already exists for user ID: {}", userId);
                }
            }
        } catch (Exception e) {
            log.error("Failed to process USER_CREATED event: {}", event.getEventId(), e);
        }
    }
}
