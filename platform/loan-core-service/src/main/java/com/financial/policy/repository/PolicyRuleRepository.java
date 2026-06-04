package com.financial.policy.repository;

import com.financial.policy.entity.PolicyRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PolicyRuleRepository extends JpaRepository<PolicyRule, UUID> {
}
