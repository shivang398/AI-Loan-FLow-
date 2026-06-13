package com.financial.customer.repository;

import com.financial.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByMobile(String mobile);
    boolean existsByIdAndCreatedBy(UUID id, UUID createdBy);
}
