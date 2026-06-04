package com.financial.auth.security;

import com.financial.common.security.JwtRevocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * Fix 5 — Redis-backed JWT revocation.
 * Stores revoked jti values with a TTL matching the token's remaining lifetime.
 */
@Service
@RequiredArgsConstructor
public class RedisJwtRevocationService implements JwtRevocationService {

    private static final String PREFIX = "jwt:revoked:";

    private final StringRedisTemplate redis;

    @Override
    public void revoke(String jti, long expiresAtEpochMs) {
        long ttlMs = expiresAtEpochMs - System.currentTimeMillis();
        if (ttlMs > 0) {
            redis.opsForValue().set(PREFIX + jti, "1", Duration.ofMillis(ttlMs));
        }
    }

    @Override
    public boolean isRevoked(String jti) {
        return Boolean.TRUE.equals(redis.hasKey(PREFIX + jti));
    }
}
