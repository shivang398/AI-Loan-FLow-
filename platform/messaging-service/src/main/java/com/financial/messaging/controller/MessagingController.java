package com.financial.messaging.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.service.MessagingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messaging")
@RequiredArgsConstructor
public class MessagingController {

    private final MessagingService messagingService;
    private final ConversationRepository conversationRepository;

    @GetMapping("/conversations")
    public ResponseEntity<ApiResponse<List<Conversation>>> getConversations(@RequestParam("type") ConversationType type) {
        List<Conversation> conversations = conversationRepository.findByConversationType(type);
        return ResponseEntity.ok(ApiResponse.success("Conversations fetched", conversations, UUID.randomUUID().toString()));
    }

    @PostMapping("/conversations")
    public ResponseEntity<ApiResponse<Conversation>> createConversation(@RequestBody CreateConversationRequest request) {
        Conversation conversation = Conversation.builder()
                .connectorId(request.getConnectorId())
                .rmId(request.getRmId())
                .conversationType(request.getType() != null ? request.getType() : ConversationType.EXTERNAL_CONNECTOR_OPS)
                .loanApplicationId(request.getLoanApplicationId())
                .conversationStatus("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
        
        conversation = conversationRepository.save(conversation);
        return ResponseEntity.ok(ApiResponse.success("Conversation created", conversation, UUID.randomUUID().toString()));
    }

    @PostMapping("/status-update")
    public ResponseEntity<ApiResponse<String>> sendStatusUpdate(@RequestBody StatusUpdateRequest request) {
        messagingService.sendStatusToWhatsApp(request.getLoanId(), request.getStatus(), request.getConnectorPhone());
        return ResponseEntity.ok(ApiResponse.success("Status update sent via WhatsApp", "SENT", UUID.randomUUID().toString()));
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Message>> sendMessage(@RequestBody SendMessageRequest request) {
        UUID senderId = UUID.randomUUID(); 
        Message message = messagingService.sendMessage(
                request.getConversationId(), 
                request.getBody(), 
                senderId, 
                request.getChannel()
        );
        
        return ResponseEntity.ok(ApiResponse.success("Message sent", message, UUID.randomUUID().toString()));
    }

    @Data
    public static class CreateConversationRequest {
        private UUID connectorId;
        private UUID rmId;
        private UUID loanApplicationId;
        private ConversationType type;
    }

    @Data
    public static class SendMessageRequest {
        private UUID conversationId;
        private String body;
        private String channel; // INTERNAL, WHATSAPP
    }

    @Data
    public static class StatusUpdateRequest {
        private UUID loanId;
        private String status;
        private String connectorPhone;
    }
}
