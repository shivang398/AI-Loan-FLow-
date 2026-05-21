package com.financial.messaging.consumer;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.MessageRepository;
import com.financial.messaging.service.WhatsAppService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class WhatsAppMessageConsumer {

    private static final Logger log = LoggerFactory.getLogger(WhatsAppMessageConsumer.class);
    private final MessageRepository messageRepository;
    private final WhatsAppService whatsAppService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public WhatsAppMessageConsumer(MessageRepository messageRepository, WhatsAppService whatsAppService) {
        this.messageRepository = messageRepository;
        this.whatsAppService = whatsAppService;
    }

    @RabbitListener(queues = "whatsapp.send.queue")
    public void processWhatsAppMessage(UUID messageId) {
        log.info("Processing WhatsApp message delivery for ID: {}", messageId);
        
        Message message = messageRepository.findById(messageId).orElse(null);
        if (message == null) return;

        try {
            String connectorPhone = "919876543210"; 
            String response = whatsAppService.sendMessage(connectorPhone, message.getMessageBody());
            
            log.info("WhatsApp API Response: {}", response);
            
            JsonNode rootNode = objectMapper.readTree(response);
            if (rootNode.has("messages") && rootNode.get("messages").isArray() && rootNode.get("messages").size() > 0) {
                String waMsgId = rootNode.get("messages").get(0).get("id").asText();
                message.setWhatsappMessageId(waMsgId);
                log.info("Extracted WhatsApp Message ID: {}", waMsgId);
            }

            message.setDeliveryStatus("SENT");
            messageRepository.save(message);
            
        } catch (Exception e) {
            log.error("Failed to deliver WhatsApp message", e);
            message.setDeliveryStatus("FAILED");
            messageRepository.save(message);
        }
    }
}
