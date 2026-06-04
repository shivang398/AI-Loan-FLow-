package com.financial.messaging.config;

import com.financial.messaging.websocket.TeamMeetingWsHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.support.WebSocketHttpRequestHandler;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;

import java.util.Map;

// Registers /ws/team-meeting as a raw WebSocket endpoint without @EnableWebSocket,
// which would conflict with @EnableWebSocketMessageBroker (both define webSocketHandlerMapping).
@Configuration
@RequiredArgsConstructor
public class TeamMeetingWsConfig {

    private final TeamMeetingWsHandler teamMeetingWsHandler;

    @Bean
    public SimpleUrlHandlerMapping teamMeetingWsHandlerMapping() {
        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setUrlMap(Map.of("/ws/team-meeting",
                new WebSocketHttpRequestHandler(teamMeetingWsHandler)));
        mapping.setOrder(1);
        return mapping;
    }
}
