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

    private static final int  LOGIN_MAX    = 5;
    private static final int  REGISTER_MAX = 3;
    private static final long WINDOW_SECS  = 60L;

    @Autowired
    private StringRedisTemplate redis;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.equals("/auth/login") && !path.equals("/auth/register/partner");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String ip   = getClientIp(request);
        String path = request.getRequestURI();
        int    max  = path.equals("/auth/login") ? LOGIN_MAX : REGISTER_MAX;
        String key  = "ratelimit:" + (path.equals("/auth/login") ? "login" : "register") + ":" + ip;

        Long count = redis.opsForValue().increment(key);
        if (count != null && count == 1) {
            redis.expire(key, Duration.ofSeconds(WINDOW_SECS));
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
