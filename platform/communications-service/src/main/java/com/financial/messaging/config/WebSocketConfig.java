package com.financial.messaging.config;

import com.financial.common.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtTokenProvider tokenProvider;

    @Value("${app.websocket.allowed-origins:http://localhost:3000,http://localhost:80}")
    private String allowedOriginsRaw;

    // Rate limiting: max 60 SEND frames per user per minute
    private static final int MSG_LIMIT = 60;
    private static final long MSG_WINDOW_MS = 60_000L;
    private record RateWindow(java.util.concurrent.atomic.AtomicInteger count, long resetAt) {}
    private final ConcurrentHashMap<String, RateWindow> msgRateMap = new ConcurrentHashMap<>();

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        String[] origins = allowedOriginsRaw.split(",");
        registry.addEndpoint("/ws-messaging")
                .setAllowedOriginPatterns(origins)
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                
                if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String token = authHeader.substring(7);
                        if (tokenProvider.validateToken(token)) {
                            String username = tokenProvider.getUsernameFromJWT(token);
                            String rolesStr = tokenProvider.getRolesFromJWT(token);
                            List<SimpleGrantedAuthority> authorities = (rolesStr != null && !rolesStr.isBlank())
                                    ? Arrays.stream(rolesStr.split(","))
                                            .map(String::trim).filter(r -> !r.isBlank())
                                            .map(SimpleGrantedAuthority::new)
                                            .collect(Collectors.toList())
                                    : List.of();
                            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                                    username, null, authorities);
                            accessor.setUser(auth);
                        }
                    }
                }

                // Rate limit SEND frames
                if (accessor != null && StompCommand.SEND.equals(accessor.getCommand())) {
                    java.security.Principal user = accessor.getUser();
                    String key = user != null ? user.getName() : "anonymous";
                    long now = System.currentTimeMillis();
                    RateWindow w = msgRateMap.compute(key, (k, existing) -> {
                        if (existing == null || now >= existing.resetAt()) {
                            return new RateWindow(new java.util.concurrent.atomic.AtomicInteger(0), now + MSG_WINDOW_MS);
                        }
                        return existing;
                    });
                    if (w.count().incrementAndGet() > MSG_LIMIT) {
                        throw new org.springframework.messaging.MessageDeliveryException(message, "Rate limit exceeded");
                    }
                }

                return message;
            }
        });
    }
}
