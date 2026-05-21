package com.financial.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Modern Java 26 Record implementations for Authentication Requests.
 */
public class AuthRequests {

    public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password
    ) {}

    public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, message = "Password must be at least 8 characters") String password,
        String role
    ) {}

    public record UpdateStatusRequest(
        @NotBlank String status
    ) {}

    public record RefreshRequest(
        @NotBlank String refreshToken
    ) {}
}
