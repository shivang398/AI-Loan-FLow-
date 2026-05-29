package com.financial.eligibility;

import com.financial.eligibility.repository.EligibilityRuleRepository;
import com.financial.eligibility.service.EligibilityService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Context load test — verifies the full eligibility-service wires up correctly.
 * No RabbitMQ needed (eligibility-service has no AMQP dependency).
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
class EligibilityIntegrationTest {

    @Autowired EligibilityService eligibilityService;
    @Autowired EligibilityRuleRepository ruleRepository;

    @Test
    void contextLoads_allBeansPresent() {
        assertThat(eligibilityService).isNotNull();
        assertThat(ruleRepository).isNotNull();
    }

    @Test
    void ruleRepository_accessible() {
        // Confirms JPA context is up and the repository works
        long count = ruleRepository.count();
        assertThat(count).isGreaterThanOrEqualTo(0);
    }
}
