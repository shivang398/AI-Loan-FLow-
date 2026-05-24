package com.financial.customer.repository;

import com.financial.customer.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LeadRepository extends JpaRepository<Lead, UUID> {
    List<Lead> findAllByOrderByCreatedAtDesc();
    boolean existsByEmailOrMobile(String email, String mobile);
}
