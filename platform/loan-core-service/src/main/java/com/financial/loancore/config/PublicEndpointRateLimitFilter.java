package com.financial.loancore.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Fix H8 — Per-IP rate limit for the public POST /eligibility/submissions endpoint.
 * Allows at most 10 requests per minute per IP. Returns HTTP 429 when exceeded.
 * Uses ConcurrentHashMap + AtomicInteger; counters are reset every 60 seconds by a
 * background scheduler.
 */
@Component
public class PublicEndpointRateLimitFilter extends OncePerRequestFilter {

    private static final int  MAX_REQUESTS_PER_MINUTE = 10;
    private static final long RESET_INTERVAL_SECONDS  = 60L;

    private static final String RATE_LIMITED_PATH   = "/eligibility/submissions";
    private static final String RATE_LIMITED_METHOD = HttpMethod.POST.name();

    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
        Thread t = new Thread(r, "rate-limit-reset");
        t.setDaemon(true);
        return t;
    });

    public PublicEndpointRateLimitFilter() {
        // Reset all counters every 60 seconds
        scheduler.scheduleAtFixedRate(
            requestCounts::clear,
            RESET_INTERVAL_SECONDS,
            RESET_INTERVAL_SECONDS,
            TimeUnit.SECONDS
        );
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !RATE_LIMITED_PATH.equals(request.getRequestURI())
            || !RATE_LIMITED_METHOD.equalsIgnoreCase(request.getMethod());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String ip = getClientIp(request);
        AtomicInteger counter = requestCounts.computeIfAbsent(ip, k -> new AtomicInteger(0));
        int count = counter.incrementAndGet();

        if (count > MAX_REQUESTS_PER_MINUTE) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write(
                "{\"success\":false,\"message\":\"Too many requests. Try again later.\",\"errors\":[]}"
            );
            return;
        }

        chain.doFilter(request, response);
    }

    /**
     * Read the last entry in X-Forwarded-For — appended by the trusted reverse proxy.
     * Taking the first is unsafe; an attacker can prepend a spoofed IP.
     * Falls back to remoteAddr when the header is absent.
     */
    private String getClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            String[] parts = xff.split(",");
            String candidate = parts[parts.length - 1].trim();
            // Accept only basic IPv4/IPv6 chars to guard against header injection
            if (candidate.matches("[0-9a-fA-F:.]+")) {
                return candidate;
            }
        }
        return request.getRemoteAddr();
    }
}
