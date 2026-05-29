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

    private record Window(AtomicInteger count, long resetAt) {}
    private final ConcurrentHashMap<String, Window> loginWindows    = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Window> registerWindows = new ConcurrentHashMap<>();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return !path.equals("/auth/login") && !path.equals("/auth/register/partner");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
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

    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
