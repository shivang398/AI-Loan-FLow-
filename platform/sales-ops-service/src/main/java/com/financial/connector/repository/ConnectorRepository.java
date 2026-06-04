package com.financial.connector.repository;

import com.financial.connector.entity.Connector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConnectorRepository extends JpaRepository<Connector, UUID> {
    Optional<Connector> findByUserId(UUID userId);
    Optional<Connector> findByEmail(String email);
    List<Connector> findAllByRole(String role);
    List<Connector> findAllByRoleIn(List<String> roles);
    List<Connector> findAllByRoleAndStatus(String role, String status);
}
