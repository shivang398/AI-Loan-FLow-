package com.financial.messaging.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.messaging.entity.TeamMeetingMessage;
import com.financial.messaging.repository.TeamMeetingMessageRepository;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Validated
@RestController
@RequestMapping("/team-meeting")
@RequiredArgsConstructor
public class TeamMeetingController {

    private final TeamMeetingMessageRepository messageRepository;

    /** Load message history for a room (most recent 100, chronological order). */
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS','RM','PARTNER_MANAGER','TEAM_LEADER')")
    @GetMapping("/rooms/{roomKey}/messages")
    public ResponseEntity<ApiResponse<List<TeamMeetingMessage>>> getRoomMessages(
            @PathVariable
            @Pattern(regexp = "^[a-zA-Z0-9@._%-]{1,200}$", message = "Invalid room key")
            String roomKey) {
        List<TeamMeetingMessage> messages = messageRepository.findByRoomKeyOrderByCreatedAtAsc(roomKey);
        // Return last 100 messages
        int from = Math.max(0, messages.size() - 100);
        return ResponseEntity.ok(ApiResponse.success(
                "Messages fetched",
                messages.subList(from, messages.size()),
                UUID.randomUUID().toString()
        ));
    }
}
