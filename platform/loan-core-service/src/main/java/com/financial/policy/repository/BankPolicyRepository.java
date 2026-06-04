package com.financial.policy.repository;

import com.financial.policy.entity.BankPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BankPolicyRepository extends JpaRepository<BankPolicy, UUID> {
    List<BankPolicy> findByBankNameAndStatus(String bankName, String status);
}
