package com.financial.analyticsreporting.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.analytics.service.AnalyticsService;
import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoanAnalyticsConsumer {

    private static final Logger log = LoggerFactory.getLogger(LoanAnalyticsConsumer.class);
    private final AnalyticsService analyticsService;
    private final ObjectMapper objectMapper;

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "analytics.loan.events.queue", durable = "true"),
        exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
        key = "loan.status.updated"
    ))
    public void handleLoanStatusUpdated(GlobalEvent<?> event) {
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String status = (String) payload.get("status");
            LocalDate today = LocalDate.now();

            analyticsService.incrementSnapshot("TOTAL_LOANS", today, 1.0);

            if ("DISBURSED".equals(status)) {
                Object amtRaw = payload.get("loanAmount");
                if (amtRaw != null) {
                    double amount = new BigDecimal(amtRaw.toString()).doubleValue();
                    analyticsService.incrementSnapshot("DISBURSED_AMOUNT", today, amount);
                }
                // APPROVAL_RATE and REJECTION_RATE are placeholder counters;
                // real rates are computed as a ratio in the summary view.
                analyticsService.incrementSnapshot("APPROVAL_RATE", today, 0.0);
            }
            if ("REJECTED".equals(status)) {
                analyticsService.incrementSnapshot("REJECTION_RATE", today, 0.0);
            }
        } catch (Exception e) {
            log.error("Failed to process loan.status.updated event for analytics: eventId={}", event.getEventId(), e);
        }
    }

    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = "analytics.auth.events.queue", durable = "true"),
        exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
        key = "auth.user.created"
    ))
    public void handleUserCreated(GlobalEvent<?> event) {
        try {
            LocalDate today = LocalDate.now();
            analyticsService.incrementSnapshot("ACTIVE_PARTNERS", today, 1.0);
            analyticsService.incrementSnapshot("TOTAL_PARTNERS", today, 1.0);
        } catch (Exception e) {
            log.error("Failed to process auth.user.created event for analytics: eventId={}", event.getEventId(), e);
        }
    }
}
