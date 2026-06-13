package com.financial.common.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnMissingBean(JwtRevocationService.class)
public class NoOpJwtRevocationService implements JwtRevocationService {

    private static final Logger log = LoggerFactory.getLogger(NoOpJwtRevocationService.class);

    @Override
    public void revoke(String jti, long expiryMs) {
        log.warn("[SECURITY] Token revocation called but no JwtRevocationService configured — token jti={} NOT persisted to blocklist", jti);
    }

    @Override
    public boolean isRevoked(String jti) {
        return false;
    }
}
