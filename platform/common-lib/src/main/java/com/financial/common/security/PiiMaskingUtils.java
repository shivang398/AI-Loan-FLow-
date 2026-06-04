package com.financial.common.security;

/**
 * Fix 10 — PII masking helpers for use in log statements.
 * Never log raw PAN, Aadhaar, or mobile numbers.
 */
public final class PiiMaskingUtils {

    private PiiMaskingUtils() {}

    /** ABCDE1234F → XXXXXX234F */
    public static String maskPan(String pan) {
        if (pan == null || pan.length() < 4) return "****";
        return "XXXXXX" + pan.substring(Math.max(0, pan.length() - 4));
    }

    /** 123456789012 → XXXXXXXX9012 */
    public static String maskAadhaar(String aadhaar) {
        if (aadhaar == null || aadhaar.length() < 4) return "****";
        return "XXXXXXXX" + aadhaar.substring(Math.max(0, aadhaar.length() - 4));
    }

    /** 9876543210 → ******3210 */
    public static String maskMobile(String mobile) {
        if (mobile == null || mobile.length() < 4) return "****";
        return "******" + mobile.substring(Math.max(0, mobile.length() - 4));
    }

    /** john@example.com → j***@example.com */
    public static String maskEmail(String email) {
        if (email == null) return "****";
        int at = email.indexOf('@');
        if (at <= 0) return "***";
        return email.charAt(0) + "***@" + email.substring(at + 1);
    }
}
