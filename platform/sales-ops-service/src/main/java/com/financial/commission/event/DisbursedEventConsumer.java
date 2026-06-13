package com.financial.commission.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.commission.service.CommissionService;
import com.financial.common.event.GlobalEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Service
public class DisbursedEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(DisbursedEventConsumer.class);

    private final CommissionService commissionService;
    private final ObjectMapper objectMapper;

    public DisbursedEventConsumer(CommissionService commissionService, ObjectMapper objectMapper) {
        this.commissionService = commissionService;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "commission.loan.disbursed.queue", durable = "true"),
            exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
            key = "loan.status.updated"
    ))
    public void handleDisbursedEvent(GlobalEvent<?> event) {
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String status = (String) payload.get("status");

            if ("DISBURSED".equals(status)) {
                String loanIdStr      = (String) payload.get("loanId");
                String connectorIdStr = (String) payload.get("connectorId");   // may be null for old events
                Object loanAmtRaw     = payload.get("loanAmount");              // may be null for old events

                if (loanIdStr == null) {
                    log.warn("Received DISBURSED event with no loanId, skipping");
                    return;
                }

                if (connectorIdStr == null || loanAmtRaw == null) {
                    log.warn("DISBURSED event for loan {} missing connectorId or loanAmount — skipping commission auto-trigger", loanIdStr);
                    return;
                }

                UUID connectorId = UUID.fromString(connectorIdStr);
                BigDecimal loanAmount = new BigDecimal(loanAmtRaw.toString());

                log.info("Auto-triggering commission for loan={} connector={} amount={}", loanIdStr, connectorIdStr, loanAmount);
                commissionService.calculateAndRecord(UUID.fromString(loanIdStr), connectorId, loanAmount);
            }
        } catch (Exception e) {
            log.error("Failed to process DISBURSED event: {}", event.getEventId(), e);
        }
    }
}
