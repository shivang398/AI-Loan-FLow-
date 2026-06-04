package com.financial.common.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationGrantedEvent;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

/**
 * A09: Security Logging and Monitoring — logs authorization decisions so a SIEM
 * can detect privilege-escalation attempts and brute-force path scanning.
 * Included in common-lib so every service gets this automatically.
 */
@Component
public class SecurityEventLogger {

    private static final Logger log = LoggerFactory.getLogger("SECURITY_AUDIT");

    @EventListener
    public void onAccessDenied(AuthorizationDeniedEvent<?> event) {
        Authentication auth = event.getAuthentication().get();
        String principal = auth != null ? auth.getName() : "anonymous";
        String authorities = auth != null ? auth.getAuthorities().toString() : "[]";
        log.warn("ACCESS_DENIED principal={} authorities={} result={}",
                principal, authorities, event.getAuthorizationResult());
    }

    @EventListener
    public void onAccessGranted(AuthorizationGrantedEvent<?> event) {
        // Only log ADMIN grants — otherwise every request floods the audit log
        Authentication auth = event.getAuthentication().get();
        if (auth != null && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            log.info("ACCESS_GRANTED principal={} result={}",
                    auth.getName(), event.getAuthorizationResult());
        }
    }
}
