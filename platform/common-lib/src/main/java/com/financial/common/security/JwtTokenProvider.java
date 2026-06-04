package com.financial.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration:900000}")
    private long jwtExpirationInMs;

    private static final long REFRESH_GRACE_PERIOD_MS = 5 * 60 * 1000L;

    private Key key;

    // Fix 5: optional revocation checker — wired only in services that configure Redis
    @Autowired(required = false)
    private JwtRevocationService revocationService;

    @PostConstruct
    public void init() {
        if (jwtSecret == null || jwtSecret.isBlank() || jwtSecret.length() < 32) {
            throw new IllegalStateException("app.jwt.secret must be set and at least 32 characters");
        }
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        // Fix 5: every token carries a unique jti for revocation tracking
        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .id(UUID.randomUUID().toString())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String generateTokenForUser(String username, String roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .id(UUID.randomUUID().toString())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        return parseClaims(token).getSubject();
    }

    public String getRolesFromJWT(String token) {
        return parseClaims(token).get("roles", String.class);
    }

    public String getJtiFromJWT(String token) {
        return parseClaims(token).getId();
    }

    public long getExpiryEpochMs(String token) {
        Date exp = parseClaims(token).getExpiration();
        return exp != null ? exp.getTime() : 0L;
    }

    public boolean validateToken(String authToken) {
        try {
            Claims claims = Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(authToken)
                .getPayload();

            // Fix 5: check Redis revocation blocklist if available
            if (revocationService != null) {
                String jti = claims.getId();
                if (jti != null && revocationService.isRevoked(jti)) {
                    return false;
                }
            }
            return true;
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException ex) {
            // expired, malformed, unsupported, or tampered
        }
        return false;
    }

    public String[] getUsernameAndRolesIgnoreExpiry(String token) {
        try {
            Claims claims = parseClaims(token);
            return new String[]{claims.getSubject(), claims.get("roles", String.class)};
        } catch (io.jsonwebtoken.ExpiredJwtException eje) {
            Claims claims = eje.getClaims();
            Date expiration = claims.getExpiration();
            if (expiration != null && System.currentTimeMillis() - expiration.getTime() > REFRESH_GRACE_PERIOD_MS) {
                throw new RuntimeException("Token expired beyond refresh grace period");
            }
            return new String[]{claims.getSubject(), claims.get("roles", String.class)};
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
