package com.financial.loan;

import com.financial.loan.repository.LoanApplicationRepository;
import com.financial.loan.service.LoanService;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Context load test — verifies all beans wire correctly including
 * the LoanService → Repository → EventPublisher chain.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
class LoanServiceIntegrationTest {

    @MockitoBean RabbitTemplate rabbitTemplate;

    @Autowired LoanService loanService;
    @Autowired LoanApplicationRepository loanApplicationRepository;

    @Test
    void contextLoads() {
        assertThat(loanService).isNotNull();
    }

    @Test
    void loanRepository_emptyOnStart() {
        assertThat(loanApplicationRepository.count()).isZero();
    }
}
