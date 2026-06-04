package com.financial.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    // Login: 5 attempts per IP per minute
    private static final int LOGIN_MAX = 5;
    // Partner registration: 3 per IP per minute (bot/spam guard)
    private static final int REGISTER_MAX = 3;
    private static final long WINDOW_MS = 60_000L;
    // Evict stale windows every 10 minutes to prevent unbounded memory growth
    private static final long EVICT_INTERVAL_MS = 10 * 60_000L;

    private record Window(AtomicInteger count, long resetAt) {}
    private final ConcurrentHashMap<String, Window> loginWindows    = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Window> registerWindows = new ConcurrentHashMap<>();
    private volatile long lastEvictAt = System.currentTimeMillis();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.equals("/auth/login") && !path.equals("/auth/register/partner");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        evictExpiredWindows();

        String ip = getClientIp(request);
        String path = request.getRequestURI();

        ConcurrentHashMap<String, Window> map = path.equals("/auth/login") ? loginWindows : registerWindows;
        int max = path.equals("/auth/login") ? LOGIN_MAX : REGISTER_MAX;

        long now = System.currentTimeMillis();
        Window w = map.compute(ip, (k, existing) -> {
            if (existing == null || now >= existing.resetAt()) {
                return new Window(new AtomicInteger(0), now + WINDOW_MS);
            }
            return existing;
        });

        if (w.count().incrementAndGet() > max) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Too many requests. Please wait before retrying.\"}");
            return;
        }
        chain.doFilter(request, response);
    }

    private void evictExpiredWindows() {
        long now = System.currentTimeMillis();
        if (now - lastEvictAt < EVICT_INTERVAL_MS) return;
        lastEvictAt = now;
        loginWindows.entrySet().removeIf(e -> now >= e.getValue().resetAt());
        registerWindows.entrySet().removeIf(e -> now >= e.getValue().resetAt());
    }

    /**
     * When behind a trusted reverse proxy (e.g. AWS ALB), the proxy appends the real
     * client IP as the LAST entry in X-Forwarded-For. Taking the first entry is unsafe
     * because an attacker can inject a spoofed IP before the request hits the proxy.
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
