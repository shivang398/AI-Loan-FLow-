package com.financial.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private static final String KEY_PREFIX  = "pwd_reset:";
    private static final long   TTL_MINUTES = 15L;

    private final StringRedisTemplate redis;

    /**
     * Generates a UUID reset token, stores {@code email} under
     * {@code pwd_reset:<token>} with a 15-minute TTL, and returns the token.
     */
    public String createResetToken(String email) {
        String token = UUID.randomUUID().toString();
        redis.opsForValue().set(KEY_PREFIX + token, email, Duration.ofMinutes(TTL_MINUTES));
        log.debug("[PASSWORD_RESET] Stored reset token in Redis for {}", email);
        return token;
    }

    /**
     * Looks up the email mapped to the given token, atomically deletes the key
     * (one-time use), and returns the email wrapped in an Optional.
     * Returns {@link Optional#empty()} if the token is missing or expired.
     */
    public Optional<String> validateAndConsumeToken(String token) {
        String key   = KEY_PREFIX + token;
        String email = redis.opsForValue().get(key);
        if (email == null) {
            return Optional.empty();
        }
        redis.delete(key);
        return Optional.of(email);
    }
}
