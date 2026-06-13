package com.financial.loancore.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class WriteRateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_PER_MINUTE = 60;
    private final ConcurrentHashMap<String, AtomicInteger> counters = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor(
            r -> { Thread t = new Thread(r, "write-rl-reset"); t.setDaemon(true); return t; });

    public WriteRateLimitFilter() {
        scheduler.scheduleAtFixedRate(counters::clear, 1, 1, TimeUnit.MINUTES);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String method = req.getMethod();
        if ("POST".equals(method) || "PUT".equals(method) || "DELETE".equals(method)) {
            String ip = clientIp(req);
            if (counters.computeIfAbsent(ip, k -> new AtomicInteger()).incrementAndGet() > MAX_PER_MINUTE) {
                res.setStatus(429);
                res.setContentType("application/json;charset=UTF-8");
                res.getWriter().write("{\"error\":\"Too many write requests. Slow down.\"}");
                return;
            }
        }
        chain.doFilter(req, res);
    }

    private String clientIp(HttpServletRequest req) {
        String xff = req.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            String[] parts = xff.split(",");
            return parts[parts.length - 1].trim();
        }
        return req.getRemoteAddr();
    }

    @Override
    public void destroy() {
        scheduler.shutdownNow();
        super.destroy();
    }
}
