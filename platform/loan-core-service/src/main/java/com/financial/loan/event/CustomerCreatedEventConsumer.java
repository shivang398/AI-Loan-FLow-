package com.financial.loan.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.common.event.GlobalEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerCreatedEventConsumer {

    private final ObjectMapper objectMapper;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "loan.customer.created.queue", durable = "true"),
            exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
            key = "customer.created"
    ))
    public void handleCustomerCreatedEvent(GlobalEvent<?> event) {
        log.info("Received CUSTOMER_CREATED event in loan-service: {}", event.getEventId());
        
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String customerIdStr = (String) payload.get("customerId");
            
            if (customerIdStr != null) {
                log.info("Caching/processing new customer for pre-approved loan checks. ID: {}", customerIdStr);
            }
        } catch (Exception e) {
            log.error("Failed to process CUSTOMER_CREATED event: {}", event.getEventId(), e);
        }
    }
}
