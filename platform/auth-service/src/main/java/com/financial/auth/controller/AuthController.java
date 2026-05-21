package com.financial.auth.controller;

import com.financial.auth.dto.AuthRequests;
import com.financial.auth.service.AuthService;
import com.financial.common.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

/**
 * Modern Java 26 AuthController.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, String>>> register(@Valid @RequestBody AuthRequests.RegisterRequest request) {
        Map<String, String> result = authService.registerUser(request);
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", result, UUID.randomUUID().toString()));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@Valid @RequestBody AuthRequests.LoginRequest request) {
        Map<String, String> result = authService.authenticateUser(request);
        return ResponseEntity.ok(ApiResponse.success("Operation successful", result, UUID.randomUUID().toString()));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh(@Valid @RequestBody AuthRequests.RefreshRequest request) {
        Map<String, String> result = authService.refreshToken(request.refreshToken());
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", result, UUID.randomUUID().toString()));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(ApiResponse.success("Operation successful", "Logged out", UUID.randomUUID().toString()));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<String>> me() {
        return ResponseEntity.ok(ApiResponse.success("Operation successful", "Current User Info", UUID.randomUUID().toString()));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<String>> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody AuthRequests.UpdateStatusRequest request) {
        authService.updateUserStatus(id, request.status());
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", "SUCCESS", UUID.randomUUID().toString()));
    }
}
