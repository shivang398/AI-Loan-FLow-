package com.financial.messaging.repository;

import com.financial.messaging.entity.TeamMeetingMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TeamMeetingMessageRepository extends JpaRepository<TeamMeetingMessage, UUID> {
    List<TeamMeetingMessage> findByRoomKeyOrderByCreatedAtAsc(String roomKey);
}
