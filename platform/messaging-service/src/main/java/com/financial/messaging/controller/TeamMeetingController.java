package com.financial.messaging.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.messaging.entity.TeamMeetingMessage;
import com.financial.messaging.repository.TeamMeetingMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/team-meeting")
@RequiredArgsConstructor
public class TeamMeetingController {

    private final TeamMeetingMessageRepository messageRepository;

    /** Load message history for a room (most recent 100, chronological order). */
    @GetMapping("/rooms/{roomKey}/messages")
    public ResponseEntity<ApiResponse<List<TeamMeetingMessage>>> getRoomMessages(
            @PathVariable String roomKey) {
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
