package com.financial.messaging.websocket;

import com.financial.messaging.entity.Conversation;
import com.financial.messaging.repository.ConversationRepository;
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
    private final ConversationRepository conversationRepository;

    @MessageMapping("/chat.send")
    public void handleChatMessage(@Payload ChatMessageRequest request, SimpMessageHeaderAccessor headerAccessor) {
        Principal principal = headerAccessor.getUser();
        if (principal == null) {
            log.warn("Rejected unauthenticated WebSocket message");
            return;
        }
        String username = principal.getName();

        if (request.getConversationId() == null) {
            log.warn("Rejected WebSocket message with null conversationId from {}", username);
            return;
        }

        // Ownership check: caller must be a participant in the conversation
        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElse(null);
        if (conversation == null) {
            log.warn("Rejected message to non-existent conversation {} from {}", request.getConversationId(), username);
            return;
        }
        UUID senderId = UUID.nameUUIDFromBytes(username.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        boolean isParticipant = senderId.equals(conversation.getConnectorId())
                || senderId.equals(conversation.getRmId())
                || senderId.equals(conversation.getAssignedOpsUserId());
        if (!isParticipant) {
            log.warn("Rejected message: {} is not a participant in conversation {}", username, request.getConversationId());
            return;
        }

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
