package com.financial.messaging.repository;

import com.financial.messaging.entity.TeamMeetingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeamMeetingRoomRepository extends JpaRepository<TeamMeetingRoom, UUID> {
    Optional<TeamMeetingRoom> findByRoomKey(String roomKey);
}
