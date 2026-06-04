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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        if (atIndex < 0) throw new RuntimeException("Invalid email address");
        String domain = email.substring(atIndex + 1).toLowerCase(java.util.Locale.ROOT);
        if (!ALLOWED_DOMAINS.contains(domain)) {
            throw new RuntimeException("Registration is restricted to authorised domains");
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

        return Map.of(
            "userId", savedUser.getId().toString(),
            "email", savedUser.getEmail(),
            "message", "User registered successfully"
        );
    }

    @Transactional(readOnly = true)
    public Map<String, String> authenticateUser(AuthRequests.LoginRequest loginRequest) {
        validateEmailDomain(loginRequest.email());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email(),
                        loginRequest.password()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));
        
        String role = user.getRoles().iterator().next().getName();
        
        return Map.of(
            "token", jwt,
            "role", role,
            "email", user.getEmail(),
            "id", user.getId().toString()
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
