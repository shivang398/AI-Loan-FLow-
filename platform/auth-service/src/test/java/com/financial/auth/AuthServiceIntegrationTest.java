package com.financial.auth;

import com.financial.auth.repository.UserRepository;
import com.financial.auth.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Verifies the full Spring application context loads correctly with H2.
 * Catches missing beans, circular dependencies, and misconfigured security.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
class AuthServiceIntegrationTest {

    // Mock RabbitMQ to avoid requiring a broker during tests
    @MockitoBean RabbitTemplate rabbitTemplate;

    @Autowired AuthService authService;
    @Autowired UserRepository userRepository;

    @Test
    void contextLoads_allBeansPresent() {
        assertThat(authService).isNotNull();
        assertThat(userRepository).isNotNull();
    }

    @Test
    void userRepository_isEmptyOnStart() {
        // DB is created fresh via ddl-auto=create-drop for each test run
        assertThat(userRepository.count()).isZero();
    }
}
