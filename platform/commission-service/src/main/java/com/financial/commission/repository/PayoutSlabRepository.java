package com.financial.commission.repository;

import com.financial.commission.entity.PayoutSlab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PayoutSlabRepository extends JpaRepository<PayoutSlab, UUID> {
    List<PayoutSlab> findByConnectorId(UUID connectorId);
    List<PayoutSlab> findByConnectorIdIsNull(); // For global slabs
}
