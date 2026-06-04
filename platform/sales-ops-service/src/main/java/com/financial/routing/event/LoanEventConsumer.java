package com.financial.routing.event;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.common.event.GlobalEvent;
import com.financial.routing.dto.RoutingRequests;
import com.financial.routing.service.RoutingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanEventConsumer {

    private final ObjectMapper objectMapper;
    private final RoutingService routingService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "routing.loan.status.queue", durable = "true"),
            exchange = @Exchange(value = "${app.rabbitmq.exchange:platform.exchange}", type = "topic", durable = "true"),
            key = "loan.status.updated"
    ))
    public void handleLoanStatusEvent(GlobalEvent<?> event) {
        try {
            Map<String, Object> payload = objectMapper.convertValue(event.getPayload(), new TypeReference<>() {});
            String status = (String) payload.get("status");
            String loanIdStr = (String) payload.get("loanId");

            if ("POLICY_MATCHED".equals(status) || "ELIGIBILITY_PASSED".equals(status)) {
                log.info("Auto-triggering SM Routing for Loan ID: {}", loanIdStr);
                
                RoutingRequests.AssignRequest request = new RoutingRequests.AssignRequest();
                request.setLoanId(UUID.fromString(loanIdStr));
                
                routingService.assignSalesManager(request);
            }
        } catch (Exception e) {
            log.error("Failed to process loan status event for routing: {}", event.getEventId(), e);
        }
    }
}
