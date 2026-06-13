package com.financial.messaging.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import com.financial.messaging.entity.Message;
import com.financial.messaging.repository.ConversationRepository;
import com.financial.messaging.repository.MessageRepository;
import com.financial.messaging.service.MessagingService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messaging")
@RequiredArgsConstructor
public class MessagingController {

    private final MessagingService messagingService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','RM','PARTNER_MANAGER','TEAM_LEADER','CONNECTOR')")
    @GetMapping("/conversations")
    public ResponseEntity<ApiResponse<List<Conversation>>> getConversations(@RequestParam("type") ConversationType type) {
        List<Conversation> conversations = conversationRepository.findByConversationType(type);
        return ResponseEntity.ok(ApiResponse.success("Conversations fetched", conversations, UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','RM','PARTNER_MANAGER','TEAM_LEADER','CONNECTOR')")
    @PostMapping("/conversations")
    public ResponseEntity<ApiResponse<Conversation>> createConversation(@Valid @RequestBody CreateConversationRequest request) {
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

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','RM','PARTNER_MANAGER')")
    @PostMapping("/status-update")
    public ResponseEntity<ApiResponse<String>> sendStatusUpdate(@Valid @RequestBody StatusUpdateRequest request) {
        messagingService.sendStatusToWhatsApp(request.getLoanId(), request.getStatus(), request.getConnectorPhone());
        return ResponseEntity.ok(ApiResponse.success("Status update sent via WhatsApp", "SENT", UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','RM','PARTNER_MANAGER','TEAM_LEADER','CONNECTOR')")
    @GetMapping("/conversations/{id}/messages")
    public ResponseEntity<ApiResponse<List<Message>>> getMessages(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            Authentication auth) {
        if (auth == null || auth.getName() == null) {
            throw new AccessDeniedException("Authentication required");
        }

        boolean isPrivileged = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("OPERATIONS") || a.equals("ROLE_OPERATIONS")
                            || a.equals("RM") || a.equals("PARTNER_MANAGER") || a.equals("TEAM_LEADER"));

        if (!isPrivileged) {
            // CONNECTOR: validate they are a participant in this conversation
            UUID callerId = UUID.nameUUIDFromBytes(
                    auth.getName().getBytes(java.nio.charset.StandardCharsets.UTF_8));
            Conversation conv = conversationRepository.findById(id)
                    .orElseThrow(() -> new AccessDeniedException("Not authorized to view this conversation"));
            boolean isParticipant = callerId.equals(conv.getConnectorId())
                    || callerId.equals(conv.getRmId())
                    || callerId.equals(conv.getAssignedOpsUserId());
            if (!isParticipant) {
                throw new AccessDeniedException("Not authorized to view this conversation");
            }
        }

        var pageResult = messageRepository.findByConversationIdOrderByCreatedAtDesc(
                id, PageRequest.of(page, size));
        List<Message> messages = new ArrayList<>(pageResult.getContent());
        java.util.Collections.reverse(messages); // return in chronological order
        return ResponseEntity.ok(ApiResponse.success("Messages fetched", messages, UUID.randomUUID().toString()));
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Message>> sendMessage(
            @Valid @RequestBody SendMessageRequest request,
            Authentication auth) {
        if (auth == null || auth.getName() == null) {
            throw new AccessDeniedException("Authentication required");
        }
        // Derive sender ID from authenticated identity — never trust client-supplied IDs
        UUID senderId = UUID.nameUUIDFromBytes(
                auth.getName().getBytes(java.nio.charset.StandardCharsets.UTF_8));

        // Ownership check: must be a participant or privileged role
        Conversation conv = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        boolean isPrivileged = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("OPERATIONS") || a.equals("ROLE_OPERATIONS"));
        boolean isParticipant = senderId.equals(conv.getConnectorId())
                || senderId.equals(conv.getRmId())
                || senderId.equals(conv.getAssignedOpsUserId());
        if (!isPrivileged && !isParticipant) {
            throw new AccessDeniedException("Not a participant in this conversation");
        }

        Message message = messagingService.sendMessage(
                request.getConversationId(),
                request.getBody(),
                senderId,
                auth.getName(),
                request.getChannel()
        );
        return ResponseEntity.ok(ApiResponse.success("Message sent", message, UUID.randomUUID().toString()));
    }

    /* ── WhatsApp Ops: list conversations ── */
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS')")
    @GetMapping("/whatsapp/conversations")
    public ResponseEntity<ApiResponse<List<Conversation>>> getWhatsAppConversations() {
        List<Conversation> conversations = conversationRepository
                .findByConversationTypeOrderByUpdatedAtDesc(ConversationType.EXTERNAL_CUSTOMER_OPS);
        return ResponseEntity.ok(ApiResponse.success("WhatsApp conversations fetched", conversations, UUID.randomUUID().toString()));
    }

    /* ── WhatsApp Ops: create conversation with customer info ── */
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS')")
    @PostMapping("/whatsapp/conversations")
    public ResponseEntity<ApiResponse<Conversation>> createWhatsAppConversation(
            @Valid @RequestBody CreateWhatsAppConversationRequest request) {
        Conversation conversation = Conversation.builder()
                .customerName(request.getCustomerName())
                .customerPhone(request.getCustomerPhone())
                .assignedOpsUserId(request.getAssignedOpsUserId())
                .conversationType(ConversationType.EXTERNAL_CUSTOMER_OPS)
                .conversationStatus(request.getCaseStatus() != null ? request.getCaseStatus() : "ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
        conversation = conversationRepository.save(conversation);
        return ResponseEntity.ok(ApiResponse.success("WhatsApp conversation created", conversation, UUID.randomUUID().toString()));
    }

    /* ── WhatsApp Ops: message templates ── */
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS')")
    @GetMapping("/whatsapp/templates")
    public ResponseEntity<ApiResponse<List<java.util.Map<String, String>>>> getWhatsAppTemplates() {
        var templates = List.of(
            java.util.Map.of("name", "docs_pending",  "label", "Docs Pending",      "body", "Hi {{name}}, your loan application {{case_id}} requires additional documents."),
            java.util.Map.of("name", "under_review",  "label", "Under Review",       "body", "Hi {{name}}, application {{case_id}} is under review. We will update you soon."),
            java.util.Map.of("name", "approved",      "label", "Sanction Approved",  "body", "Congratulations {{name}}! Application {{case_id}} has been approved."),
            java.util.Map.of("name", "disbursed",     "label", "Loan Disbursed",     "body", "Hi {{name}}, the loan for {{case_id}} has been disbursed. Check your account."),
            java.util.Map.of("name", "rejected",      "label", "Application Rejected","body", "Hi {{name}}, application {{case_id}} could not be processed. Contact us for details."),
            java.util.Map.of("name", "emi_reminder",  "label", "EMI Reminder",       "body", "Hi {{name}}, your EMI for {{case_id}} is due soon. Ensure sufficient balance.")
        );
        return ResponseEntity.ok(ApiResponse.success("Templates fetched", templates, UUID.randomUUID().toString()));
    }

    @Data
    public static class CreateWhatsAppConversationRequest {
        @NotNull @Size(min = 1, max = 255) private String customerName;
        @NotNull @Size(min = 10, max = 20)  private String customerPhone;
        private UUID assignedOpsUserId;
        private String caseStatus;
    }

    @Data
    public static class CreateConversationRequest {
        @NotNull private UUID connectorId;
        private UUID rmId;
        private UUID loanApplicationId;
        private ConversationType type;
    }

    @Data
    public static class SendMessageRequest {
        @NotNull private UUID conversationId;
        @NotNull @Size(min = 1, max = 4000) private String body;
        @jakarta.validation.constraints.Pattern(regexp = "^(INTERNAL|WHATSAPP)$") private String channel;
    }

    @Data
    public static class StatusUpdateRequest {
        @NotNull private UUID loanId;
        @NotNull @Size(min = 1, max = 100) private String status;
        private String connectorPhone;
    }
}
