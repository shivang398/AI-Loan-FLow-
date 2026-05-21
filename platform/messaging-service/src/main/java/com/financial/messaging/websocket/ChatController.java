package com.financial.messaging.websocket;

import com.financial.messaging.entity.Message;
import com.financial.messaging.service.MessagingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessagingService messagingService;

    @MessageMapping("/chat.send")
    public void handleChatMessage(@Payload ChatMessageRequest request, SimpMessageHeaderAccessor headerAccessor) {
        log.info("Received WebSocket message for conversation: {}", request.getConversationId());
        
        // In a real app, we would get the user ID from the principal
        UUID senderId = UUID.randomUUID(); 
        
        messagingService.sendMessage(
                request.getConversationId(),
                request.getMessage(),
                senderId,
                request.getChannel() // "INTERNAL" or "WHATSAPP"
        );
    }

    @Data
    public static class ChatMessageRequest {
        private UUID conversationId;
        private String message;
        private String channel;
    }
}
