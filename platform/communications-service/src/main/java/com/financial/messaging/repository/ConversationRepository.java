package com.financial.messaging.repository;

import com.financial.messaging.entity.Conversation;
import com.financial.messaging.entity.ConversationType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    Optional<Conversation> findByConnectorIdAndLoanApplicationId(UUID connectorId, UUID loanApplicationId);
    List<Conversation> findByConversationType(ConversationType type);
    List<Conversation> findByConversationTypeOrderByUpdatedAtDesc(ConversationType type);
    Optional<Conversation> findFirstByCustomerPhoneOrderByCreatedAtDesc(String customerPhone);
}
