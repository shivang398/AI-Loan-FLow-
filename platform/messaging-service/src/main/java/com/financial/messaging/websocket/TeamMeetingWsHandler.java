package com.financial.messaging.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.financial.common.security.JwtTokenProvider;
import com.financial.messaging.entity.TeamMeetingMessage;
import com.financial.messaging.entity.TeamMeetingRoom;
import com.financial.messaging.repository.TeamMeetingMessageRepository;
import com.financial.messaging.repository.TeamMeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Slf4j
public class TeamMeetingWsHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final TeamMeetingRoomRepository roomRepository;
    private final TeamMeetingMessageRepository messageRepository;
    private final JwtTokenProvider jwtTokenProvider;

    // roomId → set of open sessions in that room
    private final Map<String, Set<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();
    // sessionId → authenticated username
    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String query = session.getUri() != null ? session.getUri().getQuery() : null;
        String token = extractTokenFromQuery(query);
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            session.close(CloseStatus.POLICY_VIOLATION.withReason("Missing or invalid JWT"));
            return;
        }
        sessionUserMap.put(session.getId(), jwtTokenProvider.getUsernameFromJWT(token));
    }

    private String extractTokenFromQuery(String query) {
        if (query == null) return null;
        for (String param : query.split("&")) {
            if (param.startsWith("token=")) return param.substring(6);
        }
        return null;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (!sessionUserMap.containsKey(session.getId())) {
            session.close(CloseStatus.POLICY_VIOLATION.withReason("Unauthenticated"));
            return;
        }
        JsonNode frame = objectMapper.readTree(message.getPayload());
        String type = frame.path("type").asText();

        switch (type) {
            case "JOIN_ROOM"    -> handleJoinRoom(session, frame);
            case "LEAVE_ROOM"   -> handleLeaveRoom(session, frame);
            case "SEND_MESSAGE" -> handleSendMessage(session, frame);
            case "TYPING_START" -> broadcastTyping(frame, "TYPING_START");
            case "TYPING_STOP"  -> broadcastTyping(frame, "TYPING_STOP");
            case "MARK_READ"    -> handleMarkRead(frame);
            default             -> log.debug("Unknown frame type: {}", type);
        }
    }

    private void handleJoinRoom(WebSocketSession session, JsonNode frame) {
        String roomId = frame.path("roomId").asText();
        // Use authenticated identity — do not trust client-supplied userId
        String userId = sessionUserMap.getOrDefault(session.getId(), frame.path("userId").asText());
        roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);

        // Ensure room row exists in DB
        roomRepository.findByRoomKey(roomId).orElseGet(() ->
            roomRepository.save(TeamMeetingRoom.builder().roomKey(roomId).build())
        );

        broadcastPresence(roomId, userId, true);
        log.debug("User {} joined room {}", userId, roomId);
    }

    private void handleLeaveRoom(WebSocketSession session, JsonNode frame) {
        String roomId = frame.path("roomId").asText();
        String userId = frame.path("userId").asText();

        Set<WebSocketSession> sessions = roomSessions.get(roomId);
        if (sessions != null) sessions.remove(session);

        broadcastPresence(roomId, userId, false);
    }

    private void handleSendMessage(WebSocketSession session, JsonNode frame) {
        String roomId = frame.path("roomId").asText();
        JsonNode payload = frame.path("payload");

        TeamMeetingMessage msg = TeamMeetingMessage.builder()
                .roomKey(roomId)
                .senderId(payload.path("senderId").asText())
                .senderName(payload.path("senderName").asText())
                .senderRole(payload.path("senderRole").asText(null))
                .senderInitials(payload.path("senderInitials").asText(null))
                .body(payload.path("body").asText())
                .messageType(payload.path("type").asText("TEXT"))
                .status("DELIVERED")
                .build();

        msg = messageRepository.save(msg);

        ObjectNode out = objectMapper.createObjectNode();
        out.put("type", "NEW_MESSAGE");
        out.put("roomId", roomId);
        ObjectNode p = out.putObject("payload");
        p.put("id", msg.getId().toString());
        p.put("roomId", roomId);
        p.put("senderId", msg.getSenderId());
        p.put("senderName", msg.getSenderName());
        p.put("senderRole", msg.getSenderRole());
        p.put("senderInitials", msg.getSenderInitials());
        p.put("body", msg.getBody());
        p.put("timestamp", msg.getCreatedAt() != null ? msg.getCreatedAt().toString() : Instant.now().toString());
        p.put("status", msg.getStatus());
        p.put("type", msg.getMessageType());

        broadcast(roomId, out);

        // Confirm DELIVERED back to sender
        ObjectNode statusFrame = objectMapper.createObjectNode();
        statusFrame.put("type", "MESSAGE_STATUS");
        statusFrame.put("roomId", roomId);
        statusFrame.put("messageId", msg.getId().toString());
        statusFrame.put("status", "DELIVERED");
        sendTo(session, statusFrame);
    }

    private void broadcastTyping(JsonNode frame, String outType) {
        String roomId = frame.path("roomId").asText();
        String senderId = frame.path("userId").asText();

        ObjectNode out = objectMapper.createObjectNode();
        out.put("type", outType);
        out.put("roomId", roomId);
        out.put("senderId", senderId);
        broadcast(roomId, out);
    }

    private void handleMarkRead(JsonNode frame) {
        // Optionally persist read receipts; broadcast status update
        String roomId = frame.path("roomId").asText();
        String messageId = frame.path("messageId").asText();

        ObjectNode out = objectMapper.createObjectNode();
        out.put("type", "MESSAGE_STATUS");
        out.put("roomId", roomId);
        out.put("messageId", messageId);
        out.put("status", "READ");
        broadcast(roomId, out);
    }

    private void broadcastPresence(String roomId, String userId, boolean isOnline) {
        ObjectNode out = objectMapper.createObjectNode();
        out.put("type", "PRESENCE_UPDATE");
        out.put("roomId", roomId);
        out.put("userId", userId);
        out.put("isOnline", isOnline);
        broadcast(roomId, out);
    }

    private void broadcast(String roomId, ObjectNode frame) {
        Set<WebSocketSession> sessions = roomSessions.getOrDefault(roomId, Set.of());
        String text;
        try { text = objectMapper.writeValueAsString(frame); } catch (JsonProcessingException e) { return; }
        for (WebSocketSession s : sessions) {
            sendRaw(s, text);
        }
    }

    private void sendTo(WebSocketSession session, ObjectNode frame) {
        try { sendRaw(session, objectMapper.writeValueAsString(frame)); } catch (JsonProcessingException ignored) { /* serialization failed — nothing to send */ }
    }

    private void sendRaw(WebSocketSession session, String text) {
        if (!session.isOpen()) return;
        try {
            synchronized (session) {
                session.sendMessage(new TextMessage(text));
            }
        } catch (IOException e) {
            log.warn("Failed to send to session {}: {}", session.getId(), e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String userId = sessionUserMap.remove(session.getId());
        roomSessions.forEach((roomId, sessions) -> {
            if (sessions.remove(session) && userId != null) {
                broadcastPresence(roomId, userId, false);
            }
        });
    }
}
