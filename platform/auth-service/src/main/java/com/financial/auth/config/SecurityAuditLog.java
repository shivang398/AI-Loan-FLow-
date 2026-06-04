package com.financial.auth.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Centralised security audit log.
 * All login outcomes, lockouts, and registration events are written here
 * so a SIEM can tail a single log stream named "SECURITY_AUDIT".
 */
public final class SecurityAuditLog {

    private static final Logger log = LoggerFactory.getLogger("SECURITY_AUDIT");

    private SecurityAuditLog() {}

    public static void loginSuccess(String email, String role, String ip) {
        log.info("LOGIN_SUCCESS email={} role={} ip={}", mask(email), role, ip);
    }

    public static void loginFailure(String email, String ip, int attempts) {
        log.warn("LOGIN_FAILURE email={} ip={} failedAttempts={}", mask(email), ip, attempts);
    }

    public static void accountLocked(String email, String ip) {
        log.warn("ACCOUNT_LOCKED email={} ip={} durationMinutes=15", mask(email), ip);
    }

    public static void registrationSuccess(String email, String role) {
        log.info("REGISTRATION_SUCCESS email={} role={}", mask(email), role);
    }

    public static void registrationBlocked(String email, String reason) {
        log.warn("REGISTRATION_BLOCKED email={} reason={}", mask(email), reason);
    }

    public static void tokenRefreshed(String email) {
        log.info("TOKEN_REFRESHED email={}", mask(email));
    }

    /** Masks everything before @ to avoid PII in logs while keeping the domain for triage */
    private static String mask(String email) {
        if (email == null) return "UNKNOWN";
        int at = email.indexOf('@');
        if (at <= 0) return "***";
        return "***@" + email.substring(at + 1);
    }
}
