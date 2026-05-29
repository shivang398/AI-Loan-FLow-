package com.financial.auth.service;

import com.financial.auth.dto.AuthRequests;
import com.financial.auth.entity.Role;
import com.financial.auth.entity.User;
import com.financial.auth.event.AuthEventPublisher;
import com.financial.auth.repository.RoleRepository;
import com.financial.auth.repository.UserRepository;
import com.financial.common.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock UserRepository userRepository;
    @Mock RoleRepository roleRepository;
    @Mock PasswordEncoder passwordEncoder;
    @Mock JwtTokenProvider tokenProvider;
    @Mock AuthenticationManager authenticationManager;
    @Mock AuthEventPublisher eventPublisher;

    @InjectMocks AuthService authService;

    // ── registerUser ─────────────────────────────────────────────────────────

    @Test
    void registerUser_duplicateEmail_throws() {
        User existing = new User();
        existing.setEmail("dupe@example.com");
        when(userRepository.findByEmail("dupe@example.com")).thenReturn(Optional.of(existing));

        AuthRequests.RegisterRequest req = new AuthRequests.RegisterRequest(
                "dupe@example.com", "password123", "CONNECTOR");

        assertThatThrownBy(() -> authService.registerUser(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("already taken");
    }

    @Test
    void registerUser_newEmail_savesUser() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("hashed");

        Role role = new Role();
        role.setName("CONNECTOR");
        when(roleRepository.findByName("CONNECTOR")).thenReturn(Optional.of(role));

        User saved = new User();
        saved.setId(UUID.randomUUID());
        saved.setEmail("new@example.com");
        saved.setRoles(Set.of(role));
        when(userRepository.save(any())).thenReturn(saved);

        AuthRequests.RegisterRequest req = new AuthRequests.RegisterRequest(
                "new@example.com", "password123", "CONNECTOR");

        var result = authService.registerUser(req);

        assertThat(result).containsKey("userId");
        assertThat(result.get("email")).isEqualTo("new@example.com");
        verify(eventPublisher).publishUserCreatedEvent(any(), anyString(), any());
    }

    // ── refreshToken ─────────────────────────────────────────────────────────

    @Test
    void refreshToken_inactiveUser_throws() {
        when(tokenProvider.getUsernameAndRolesIgnoreExpiry(anyString()))
                .thenReturn(new String[]{"inactive@example.com", "CONNECTOR"});

        User user = new User();
        user.setEmail("inactive@example.com");
        user.setStatus("SUSPENDED");
        user.setRoles(Set.of());
        when(userRepository.findByEmail("inactive@example.com")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> authService.refreshToken("expired.token.here"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("not active");
    }
}
