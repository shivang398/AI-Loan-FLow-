package com.financial.common.security;

/**
 * Fix 5 — contract for JWT token revocation.
 * Implemented by auth-service using Redis; other services get an auto-configured
 * no-op implementation unless they also wire up Redis.
 */
public interface JwtRevocationService {
    /** Marks a token (identified by its jti claim) as revoked until its natural expiry. */
    void revoke(String jti, long expiresAtEpochMs);

    /** Returns true if the given jti has been revoked. */
    boolean isRevoked(String jti);
}
