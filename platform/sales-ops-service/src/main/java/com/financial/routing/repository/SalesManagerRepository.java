package com.financial.routing.repository;

import com.financial.routing.entity.SalesManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SalesManagerRepository extends JpaRepository<SalesManager, UUID> {
    List<SalesManager> findByIsActiveTrueAndCurrentCapacityLessThan(Integer maxCapacity);
}
