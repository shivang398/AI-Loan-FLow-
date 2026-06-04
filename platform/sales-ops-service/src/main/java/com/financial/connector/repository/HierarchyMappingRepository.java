package com.financial.connector.repository;

import com.financial.connector.entity.HierarchyMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HierarchyMappingRepository extends JpaRepository<HierarchyMapping, UUID> {
    List<HierarchyMapping> findByManagerId(UUID managerId);
    List<HierarchyMapping> findByConnectorId(UUID connectorId);
}
