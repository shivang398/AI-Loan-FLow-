package com.financial.auth.service;

import com.financial.auth.dto.AuthRequests;
import com.financial.auth.entity.Role;
import com.financial.auth.entity.User;
import com.financial.auth.event.AuthEventPublisher;
import com.financial.auth.repository.RoleRepository;
import com.financial.auth.repository.UserRepository;
import com.financial.common.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.financial.auth.config.SecurityAuditLog;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private static final Set<String> ALLOWED_DOMAINS = Set.of("realmoneygroups.in", "realfinserv.com");

    public static final String ROLE_CONNECTOR        = "CONNECTOR";
    public static final String ROLE_ADMIN            = "ADMIN";
    public static final String ROLE_RM               = "RM";
    public static final String ROLE_OPERATIONS       = "OPERATIONS";
    public static final String ROLE_TEAM_LEADER      = "TEAM_LEADER";
    public static final String ROLE_PARTNER_MANAGER  = "PARTNER_MANAGER";

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthEventPublisher eventPublisher;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       AuthEventPublisher eventPublisher) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.eventPublisher = eventPublisher;
    }

    private void validateEmailDomain(String email) {
        int atIndex = email.lastIndexOf('@');
        if (atIndex <= 0) throw new RuntimeException("Invalid email address");
        String domain = email.substring(atIndex + 1).toLowerCase(java.util.Locale.ROOT);
        if (!ALLOWED_DOMAINS.contains(domain)) {
            SecurityAuditLog.registrationBlocked(email, "domain-not-allowed:" + domain);
            throw new RuntimeException("Registration is restricted to authorised domains");
        }
    }

    private String currentIp() {
        try {
            var attrs = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            String xff = attrs.getRequest().getHeader("X-Forwarded-For");
            if (xff != null && !xff.isBlank()) {
                String[] parts = xff.split(",");
                return parts[parts.length - 1].trim();
            }
            return attrs.getRequest().getRemoteAddr();
        } catch (IllegalStateException | NullPointerException e) {
            return "UNKNOWN";
        }
    }

    @Transactional
    public Map<String, String> registerUser(AuthRequests.RegisterRequest request) {
        validateEmailDomain(request.email());
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setStatus("ACTIVE");

        String roleName = request.role() != null ? request.role() : ROLE_CONNECTOR;
        Role userRole = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    return roleRepository.save(newRole);
                });

        user.setRoles(new HashSet<>(Set.of(userRole)));
        User savedUser = userRepository.save(user);

        Set<String> roleNames = savedUser.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
        eventPublisher.publishUserCreatedEvent(savedUser.getId(), savedUser.getEmail(), roleNames);

        SecurityAuditLog.registrationSuccess(savedUser.getEmail(), roleName);
        return Map.of(
            "userId", savedUser.getId().toString(),
            "email", savedUser.getEmail(),
            "message", "User registered successfully"
        );
    }

    private static final int    MAX_FAILED_ATTEMPTS  = 5;
    private static final long   LOCKOUT_DURATION_MIN = 15L;

    @Transactional
    public Map<String, String> authenticateUser(AuthRequests.LoginRequest loginRequest) {
        validateEmailDomain(loginRequest.email());

        // Pre-auth: check account lockout
        User user = userRepository.findByEmail(loginRequest.email()).orElse(null);
        if (user != null && user.getLockedUntil() != null && Instant.now().isBefore(user.getLockedUntil())) {
            throw new RuntimeException("Account temporarily locked due to too many failed attempts. Try again in 15 minutes.");
        }

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        } catch (org.springframework.security.core.AuthenticationException ex) {
            if (user != null) {
                int attempts = user.getFailedLoginAttempts() + 1;
                user.setFailedLoginAttempts(attempts);
                if (attempts >= MAX_FAILED_ATTEMPTS) {
                    user.setLockedUntil(Instant.now().plusSeconds(LOCKOUT_DURATION_MIN * 60));
                    user.setFailedLoginAttempts(0);
                    SecurityAuditLog.accountLocked(loginRequest.email(), currentIp());
                } else {
                    SecurityAuditLog.loginFailure(loginRequest.email(), currentIp(), attempts);
                }
                userRepository.save(user);
            } else {
                SecurityAuditLog.loginFailure(loginRequest.email(), currentIp(), 0);
            }
            throw ex;
        }

        // Successful login — reset failure counter
        if (user != null && (user.getFailedLoginAttempts() > 0 || user.getLockedUntil() != null)) {
            user.setFailedLoginAttempts(0);
            user.setLockedUntil(null);
            userRepository.save(user);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User freshUser = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));
        String role = freshUser.getRoles().iterator().next().getName();

        SecurityAuditLog.loginSuccess(freshUser.getEmail(), role, currentIp());
        return Map.of(
            "token", jwt,
            "role", role,
            "email", freshUser.getEmail(),
            "id", freshUser.getId().toString()
        );
    }

    @Transactional(readOnly = true)
    public Map<String, String> refreshToken(String token) {
        String[] parts;
        try {
            parts = tokenProvider.getUsernameAndRolesIgnoreExpiry(token);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or tampered token");
        }
        String username = parts[0];
        String roles = parts[1];

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!"ACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("User account is not active");
        }

        String newToken = tokenProvider.generateTokenForUser(username, roles != null ? roles : "");
        String role = user.getRoles().isEmpty() ? "UNKNOWN" : user.getRoles().iterator().next().getName();
        return Map.of("token", newToken, "role", role, "email", username);
    }

    @Transactional
    public void updateUserStatus(java.util.UUID userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(status);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Map<String, String> lookupUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String role = user.getRoles().isEmpty() ? "UNKNOWN" : user.getRoles().iterator().next().getName();
        return Map.of(
            "userId", user.getId().toString(),
            "email", user.getEmail(),
            "role", role,
            "status", user.getStatus()
        );
    }
}
