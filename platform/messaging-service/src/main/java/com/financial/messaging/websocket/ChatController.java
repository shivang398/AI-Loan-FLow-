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

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final MessagingService messagingService;

    @MessageMapping("/chat.send")
    public void handleChatMessage(@Payload ChatMessageRequest request, SimpMessageHeaderAccessor headerAccessor) {
        Principal principal = headerAccessor.getUser();
        String username = principal != null ? principal.getName() : "anonymous";
        log.info("WebSocket message from {} for conversation: {}", username, request.getConversationId());

        // Derive a stable UUID from the username so the same user always gets the same ID
        UUID senderId = UUID.nameUUIDFromBytes(username.getBytes());

        messagingService.sendMessage(
                request.getConversationId(),
                request.getBody(),
                senderId,
                username,
                request.getChannel()
        );
    }

    @Data
    public static class ChatMessageRequest {
        private UUID conversationId;
        private String body;
        private String channel;
    }
}
