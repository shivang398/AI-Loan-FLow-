package com.financial.auth.controller;

import com.financial.auth.dto.AuthRequests;
import com.financial.auth.service.AuthService;
import com.financial.common.dto.ApiResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final String REFRESH_COOKIE = "refreshToken";
    private static final int REFRESH_COOKIE_MAX_AGE = 7 * 24 * 3600; // 7 days

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, String>>> register(@Valid @RequestBody AuthRequests.RegisterRequest request) {
        Map<String, String> result = authService.registerUser(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", result, UUID.randomUUID().toString()));
    }

    // Public self-registration — only CONNECTOR role allowed
    @PostMapping("/register/partner")
    public ResponseEntity<ApiResponse<Map<String, String>>> registerPartner(@Valid @RequestBody AuthRequests.RegisterRequest request) {
        AuthRequests.RegisterRequest connectorRequest = new AuthRequests.RegisterRequest(
                request.email(), request.password(), "CONNECTOR"
        );
        Map<String, String> result = authService.registerUser(connectorRequest);
        return ResponseEntity.ok(ApiResponse.success("Partner registered successfully", result, UUID.randomUUID().toString()));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(
            @Valid @RequestBody AuthRequests.LoginRequest request,
            HttpServletResponse response) {
        Map<String, String> result = authService.authenticateUser(request);
        // Set refresh token as httpOnly, Secure, SameSite=Strict cookie
        String refreshToken = result.get("token"); // reuse same token as refresh for now
        addRefreshCookie(response, refreshToken);
        // Return only access token and user info — not the refresh token
        return ResponseEntity.ok(ApiResponse.success("Login successful",
                Map.of("token", result.get("token"), "role", result.get("role"), "email", result.get("email"), "id", result.get("id")),
                UUID.randomUUID().toString()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh(
            HttpServletRequest request,
            HttpServletResponse response) {
        // Read refresh token from httpOnly cookie instead of request body
        String refreshToken = extractRefreshCookie(request);
        if (refreshToken == null) {
            return ResponseEntity.status(401).body(
                    ApiResponse.error("No refresh token", java.util.List.of(), UUID.randomUUID().toString()));
        }
        Map<String, String> result = authService.refreshToken(refreshToken);
        addRefreshCookie(response, result.get("token"));
        return ResponseEntity.ok(ApiResponse.success("Token refreshed",
                Map.of("token", result.get("token"), "role", result.get("role"), "email", result.get("email")),
                UUID.randomUUID().toString()));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        // Clear the refresh token cookie
        Cookie cookie = new Cookie(REFRESH_COOKIE, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(ApiResponse.success("Logged out", "OK", UUID.randomUUID().toString()));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<String>> me() {
        return ResponseEntity.ok(ApiResponse.success("OK", "Current User Info", UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @GetMapping("/users/lookup")
    public ResponseEntity<ApiResponse<Map<String, String>>> lookupUser(
            @RequestParam String email) {
        Map<String, String> result = authService.lookupUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success("User found", result, UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN')")
    @PutMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<String>> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody AuthRequests.UpdateStatusRequest request) {
        authService.updateUserStatus(id, request.status());
        return ResponseEntity.ok(ApiResponse.success("User status updated", "SUCCESS", UUID.randomUUID().toString()));
    }

    private void addRefreshCookie(HttpServletResponse response, String token) {
        // Path=/api/auth matches the browser-visible URL (Vite proxy: /api/auth/* → /auth/*)
        // SameSite=Strict prevents CSRF; Secure is a no-op on localhost but enforced in production
        response.addHeader("Set-Cookie",
                REFRESH_COOKIE + "=" + token
                        + "; Path=/api/auth; HttpOnly; Secure; SameSite=Strict; Max-Age=" + REFRESH_COOKIE_MAX_AGE);
    }

    private String extractRefreshCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> REFRESH_COOKIE.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
