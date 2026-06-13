package com.financial.auth.exception;

import com.financial.common.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AuthExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(AuthExceptionHandler.class);

    // Messages safe to expose to clients.
    // "Email is already taken!" is included because it is shown only after authentication
    // succeeds (the protected /auth/register endpoint requires ADMIN or PARTNER_MANAGER) —
    // it is not a user-enumeration risk in that context.
    private static final Set<String> CLIENT_SAFE_MESSAGES = Set.of(
        "User account is not active",
        "Invalid or tampered token",
        "Refresh token has expired",
        "Role not permitted for self-registration",
        "Registration is restricted to authorised domains",
        "Account temporarily locked due to too many failed attempts. Try again in 15 minutes.",
        "Email is already taken!"
    );

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleAuthException(Exception ex) {
        String traceId = UUID.randomUUID().toString();

        return switch (ex) {
            case NoResourceFoundException nrfe -> {
                log.warn("Resource not found [TraceID: {}]: {}", traceId, nrfe.getMessage());
                yield ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Endpoint not found", Collections.emptyList(), traceId));
            }
            case HttpRequestMethodNotSupportedException hmns -> {
                log.warn("Method not allowed [TraceID: {}]: {}", traceId, hmns.getMessage());
                yield ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                        .body(ApiResponse.error("HTTP method not allowed", Collections.emptyList(), traceId));
            }
            case MethodArgumentNotValidException manv -> {
                List<String> errors = manv.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                log.warn("Validation failed [TraceID: {}]: {}", traceId, errors);
                yield ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Validation failed", errors, traceId));
            }
            case BadCredentialsException bce -> {
                log.warn("Invalid credentials [TraceID: {}]: {}", traceId, bce.getMessage());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password", Collections.emptyList(), traceId));
            }
            case DisabledException de -> {
                log.warn("Disabled account [TraceID: {}]: {}", traceId, de.getMessage());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password.", Collections.emptyList(), traceId));
            }
            case LockedException le -> {
                log.warn("Locked account [TraceID: {}]: {}", traceId, le.getMessage());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid email or password.", Collections.emptyList(), traceId));
            }
            case AuthenticationException ae -> {
                log.warn("Authentication error [TraceID: {}]: {}", traceId, ae.getClass().getSimpleName());
                yield ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Authentication failed", Collections.emptyList(), traceId));
            }
            case RuntimeException re -> {
                String msg = re.getMessage();
                log.warn("Auth business error [TraceID: {}]: {}", traceId, msg);
                // Only expose messages that are safe and meaningful for the client
                boolean safe = msg != null && CLIENT_SAFE_MESSAGES.contains(msg);
                HttpStatus status = resolveRuntimeStatus(msg);
                yield ResponseEntity.status(status)
                        .body(ApiResponse.error(safe ? msg : "Request could not be processed", Collections.emptyList(), traceId));
            }
            default -> {
                log.error("Unexpected auth error [TraceID: {}]: {}", traceId, ex.getClass().getName(), ex);
                yield ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.error("An unexpected error occurred", Collections.emptyList(), traceId));
            }
        };
    }

    private HttpStatus resolveRuntimeStatus(String message) {
        if (message == null) return HttpStatus.BAD_REQUEST;
        return switch (message) {
            case "User not found" -> HttpStatus.NOT_FOUND;
            case "Invalid or tampered token", "Refresh token has expired" -> HttpStatus.UNAUTHORIZED;
            case "User account is not active" -> HttpStatus.FORBIDDEN;
            case "Registration is restricted to authorised domains" -> HttpStatus.FORBIDDEN;
            case "Account temporarily locked due to too many failed attempts. Try again in 15 minutes." -> HttpStatus.LOCKED;
            default -> HttpStatus.BAD_REQUEST;
        };
    }
}
