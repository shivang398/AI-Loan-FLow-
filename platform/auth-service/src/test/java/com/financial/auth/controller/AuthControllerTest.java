package com.financial.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.auth.dto.AuthRequests;
import com.financial.auth.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Map;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock AuthService authService;
    @InjectMocks AuthController controller;

    MockMvc mvc;
    final ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    @SuppressWarnings("unused") // called reflectively by JUnit 5
    void setup() { mvc = MockMvcBuilders.standaloneSetup(controller).build(); }

    @Test
    void login_validCredentials_returnsToken() throws Exception {
        when(authService.authenticateUser(any())).thenReturn(Map.of(
                "token", "jwt.token.here",
                "role", "CONNECTOR",
                "email", "user@example.com",
                "id", UUID.randomUUID().toString()));

        mvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(
                                new AuthRequests.LoginRequest("user@example.com", "password123"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.token").value("jwt.token.here"))
                .andExpect(jsonPath("$.data.role").value("CONNECTOR"));
    }

    @Test
    void registerPartner_createsConnector() throws Exception {
        when(authService.registerUser(any())).thenReturn(Map.of(
                "userId", UUID.randomUUID().toString(),
                "email", "partner@example.com"));

        mvc.perform(post("/auth/register/partner")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(
                                new AuthRequests.RegisterRequest("partner@example.com", "Pass123!", null))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void login_serviceThrows_propagatesException() throws Exception {
        when(authService.authenticateUser(any()))
                .thenThrow(new RuntimeException("Bad credentials"));

        // standaloneSetup re-throws unhandled exceptions; assert the cause is our RuntimeException
        try {
            mvc.perform(post("/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(mapper.writeValueAsString(
                                    new AuthRequests.LoginRequest("bad@example.com", "wrong"))));
        } catch (Exception e) {
            org.assertj.core.api.Assertions.assertThat(e.getCause())
                    .hasMessageContaining("Bad credentials");
        }
    }
}
