package com.financial.customer.repository;

import com.financial.customer.entity.CustomerKyc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerKycRepository extends JpaRepository<CustomerKyc, UUID> {
    Optional<CustomerKyc> findByPanNumber(String panNumber);
    Optional<CustomerKyc> findByAadhaarNumber(String aadhaarNumber);
}
