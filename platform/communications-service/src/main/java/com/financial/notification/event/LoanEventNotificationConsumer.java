package com.financial.notification.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.common.event.GlobalEvent;
import com.financial.notification.entity.Notification;
import com.financial.notification.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class LoanEventNotificationConsumer {

    private static final Logger log = LoggerFactory.getLogger(LoanEventNotificationConsumer.class);

    private final NotificationRepository notificationRepository;
    private final ObjectMapper objectMapper;

    public LoanEventNotificationConsumer(NotificationRepository notificationRepository,
                                          ObjectMapper objectMapper) {
        this.notificationRepository = notificationRepository;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "notification.loan.approved.queue", durable = "true"),
            exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
            key = "loan.status.updated"
    ))
    public void handleLoanStatusEvent(GlobalEvent<?> event) {
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String status = (String) payload.get("status");
            String loanId = (String) payload.get("loanId");
            String customerId = (String) payload.get("customerId");

            if ("APPROVED".equals(status) || "REJECTED".equals(status) || "DISBURSED".equals(status)) {
                String idempotencyKey = event.getEventId() + "_notification";

                // Idempotency check
                if (notificationRepository.findByIdempotencyKey(idempotencyKey).isPresent()) {
                    log.warn("Duplicate notification skipped for event: {}", event.getEventId());
                    return;
                }

                UUID recipientId = (customerId != null && !customerId.isBlank())
                        ? UUID.fromString(customerId)
                        : null;

                Notification notification = Notification.builder()
                        .recipientId(recipientId)
                        .channel("EMAIL")
                        .type(status)
                        .status("SENT")
                        .content("Your loan application " + loanId + " has been " + status)
                        .idempotencyKey(idempotencyKey)
                        .build();

                notificationRepository.save(notification);
                log.info("Notification recorded for loan {} with status {}", loanId, status);
            }
        } catch (Exception e) {
            log.error("Failed to process loan event for notification: {}", event.getEventId(), e);
            throw e; // Re-throw to trigger RabbitMQ retry / DLQ
        }
    }

}
