package com.financial.messaging.consumer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class WhatsAppWebhookConsumer {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate wsTemplate;
    private final ObjectMapper objectMapper;

    @RabbitListener(queues = "whatsapp.webhook.queue")
    @Transactional
    public void processWebhook(String payload) {
        try {
            JsonNode root = objectMapper.readTree(payload);
            JsonNode entries = root.path("entry");
            if (!entries.isArray()) return;

            for (JsonNode entry : entries) {
                for (JsonNode change : entry.path("changes")) {
                    JsonNode value = change.path("value");
                    JsonNode messages = value.path("messages");
                    if (!messages.isArray() || messages.isEmpty()) continue;

                    JsonNode msgNode = messages.get(0);
                    String senderPhone = msgNode.path("from").asText();
                    String waMessageId = msgNode.path("id").asText();
                    String type = msgNode.path("type").asText("text");

                    String body;
                    if ("text".equals(type)) {
                        body = msgNode.path("text").path("body").asText();
                    } else {
                        body = "[" + type.toUpperCase() + " message]";
                    }

                    String customerName = value.path("contacts").path(0)
                            .path("profile").path("name").asText(senderPhone);

                    Conversation conversation = conversationRepository
                            .findFirstByCustomerPhoneOrderByCreatedAtDesc(senderPhone)
                            .orElseGet(() -> {
                                Conversation c = Conversation.builder()
                                        .customerPhone(senderPhone)
                                        .customerName(customerName)
                                        .conversationType(ConversationType.EXTERNAL_CONNECTOR_OPS)
                                        .conversationStatus("OPEN")
                                        .build();
                                return conversationRepository.save(c);
                            });

                    Message message = Message.builder()
                            .conversation(conversation)
                            .senderType("CUSTOMER")
                            .messageBody(body)
                            .messageChannel("WHATSAPP")
                            .messageType(type.toUpperCase())
                            .deliveryStatus("RECEIVED")
                            .whatsappMessageId(waMessageId)
                            .build();
                    message = messageRepository.save(message);

                    wsTemplate.convertAndSend("/topic/conversations/" + conversation.getId(), message);
                    log.info("Inbound WhatsApp message from {} saved to conversation {}", senderPhone, conversation.getId());
                }
            }
        } catch (Exception e) {
            log.error("Failed to process WhatsApp webhook payload", e);
            throw new RuntimeException(e); // re-throw to trigger RabbitMQ retry
        }
    }
}
