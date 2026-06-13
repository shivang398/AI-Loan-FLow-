package com.financial.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

/**
 * Fix 6 — Redis-backed distributed rate limiting.
 * The old ConcurrentHashMap implementation broke with multiple instances;
 * each JVM had its own counter so an attacker got N×5 attempts across N replicas.
 * Redis counters are shared across all instances.
 */
@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    private static final int  LOGIN_MAX          = 5;
    private static final int  REGISTER_MAX        = 3;
    private static final int  FORGOT_PASSWORD_MAX = 3;
    private static final long WINDOW_SECS         = 60L;
    private static final long FORGOT_PASSWORD_WINDOW_SECS = 15L * 60L; // 15 minutes

    @Autowired
    private StringRedisTemplate redis;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.equals("/auth/login")
            && !path.equals("/auth/register/partner")
            && !path.equals("/auth/forgot-password");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String ip   = getClientIp(request);
        String path = request.getRequestURI();

        // Determine rate-limit bucket parameters per endpoint
        final int    max;
        final String bucketName;
        final long   windowSecs;

        if (path.equals("/auth/login")) {
            max        = LOGIN_MAX;
            bucketName = "login";
            windowSecs = WINDOW_SECS;
        } else if (path.equals("/auth/forgot-password")) {
            max        = FORGOT_PASSWORD_MAX;
            bucketName = "forgot-password";
            windowSecs = FORGOT_PASSWORD_WINDOW_SECS;
        } else {
            max        = REGISTER_MAX;
            bucketName = "register";
            windowSecs = WINDOW_SECS;
        }

        String key   = "ratelimit:" + bucketName + ":" + ip;
        Long   count = redis.opsForValue().increment(key);
        if (count != null && count == 1) {
            redis.expire(key, Duration.ofSeconds(windowSecs));
        }

        if (count != null && count > max) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Too many requests. Please wait before retrying.\"}");
            return;
        }
        chain.doFilter(request, response);
    }

    /**
     * Read the LAST entry in X-Forwarded-For — appended by our trusted proxy.
     * Taking the first is unsafe; an attacker can prepend a spoofed IP.
     */
    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            String[] parts = xff.split(",");
            return parts[parts.length - 1].trim();
        }
        return request.getRemoteAddr();
    }
}
