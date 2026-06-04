package com.financial.messaging.service;

import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final SimpMessagingTemplate wsTemplate;
    private final WhatsAppService whatsappService;

    @Transactional
    public Message sendMessage(UUID conversationId, String body, UUID senderId, String senderUsername, String channel) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        Message message = Message.builder()
                .conversation(conversation)
                .messageBody(body)
                .senderType(senderUsername)
                .internalSenderId(senderId)
                .messageChannel(channel)
                .messageType("TEXT")
                .deliveryStatus("SENT")
                .build();

        message = messageRepository.save(message);

        // Broadcast to the conversation topic — all subscribers (both participants) receive it
        wsTemplate.convertAndSend("/topic/conversations/" + conversationId, message);

        // Only proxy to WhatsApp when the caller explicitly requests it
        if ("WHATSAPP".equals(channel)) {
            String recipientPhone = conversation.getCustomerPhone();
            if (recipientPhone == null || recipientPhone.isBlank()) {
                log.warn("No customer phone on conversation {}; skipping WhatsApp delivery", conversationId);
            } else {
                log.info("Proxying message to WhatsApp: {} -> {}", body, recipientPhone);
                whatsappService.sendMessage(recipientPhone, body);
                message.setDeliveryStatus("SENT_TO_WHATSAPP");
                messageRepository.save(message);
            }
        }

        return message;
    }

    /** Overload used by the REST endpoint (no senderUsername needed) */
    @Transactional
    public Message sendMessage(UUID conversationId, String body, UUID senderId, String channel) {
        return sendMessage(conversationId, body, senderId, "INTERNAL", channel);
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
