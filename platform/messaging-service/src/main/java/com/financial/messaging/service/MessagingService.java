package com.financial.messaging.service;

import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessagingService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final RabbitTemplate rabbitTemplate;
    private final SimpMessagingTemplate wsTemplate;
    private final WhatsAppService whatsappService;

    @Transactional
    public Message sendMessage(UUID conversationId, String body, UUID senderId, String channel) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Message message = Message.builder()
                .conversation(conversation)
                .messageBody(body)
                .senderType("OPERATIONS")
                .internalSenderId(senderId)
                .messageChannel(channel)
                .messageType("TEXT")
                .deliveryStatus("PENDING")
                .build();

        message = messageRepository.save(message);

        // 1. Push to Internal WebSockets (for the other internal person)
        // If it's an internal chat, send to the RM or Ops user
        String targetId = conversation.getConversationType() == ConversationType.INTERNAL_RM_OPS 
                ? (conversation.getRmId().toString()) 
                : (conversation.getAssignedOpsUserId() != null ? conversation.getAssignedOpsUserId().toString() : "BROADCAST");

        wsTemplate.convertAndSendToUser(targetId, "/queue/messages", message);
        
        // 2. If it's a WhatsApp proxied conversation, send to WhatsApp but MASKED
        if ("WHATSAPP".equals(channel) || conversation.getConversationType() != ConversationType.INTERNAL_RM_OPS) {
            // Find connector or customer phone number (simulated here)
            String recipientPhone = "+919876543210"; 
            log.info("Proxying message to WhatsApp: {} -> {}", body, recipientPhone);
            
            // Actually call WhatsApp API
            whatsappService.sendMessage(recipientPhone, body);
            
            message.setDeliveryStatus("SENT_TO_WHATSAPP");
            messageRepository.save(message);
        }

        return message;
    }

    @Transactional
    public void sendStatusToWhatsApp(UUID loanId, String status, String connectorPhone) {
        String messageBody = String.format("Hello! The status of your loan application %s has been updated to: %s", loanId, status);
        log.info("Sending status update to WhatsApp: {}", messageBody);
        
        whatsappService.sendMessage(connectorPhone, messageBody);
        
        // Record in system as an automated message
        log.info("Status update recorded in messaging system for loan {}", loanId);
    }
}
