package com.financial.eligibility.repository;

import com.financial.eligibility.entity.EligibilityRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EligibilityRuleRepository extends JpaRepository<EligibilityRule, UUID> {
    Optional<EligibilityRule> findByRuleType(String ruleType);
}
