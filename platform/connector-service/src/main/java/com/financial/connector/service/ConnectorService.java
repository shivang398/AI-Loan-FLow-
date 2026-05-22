package com.financial.connector.service;

import com.financial.connector.dto.ConnectorRequests;
import com.financial.connector.entity.Connector;
import com.financial.connector.entity.HierarchyMapping;
import com.financial.connector.repository.ConnectorRepository;
import com.financial.connector.repository.HierarchyMappingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConnectorService {

    private final ConnectorRepository connectorRepository;
    private final HierarchyMappingRepository hierarchyMappingRepository;

    @Transactional
    public Connector createConnector(ConnectorRequests.CreateConnectorRequest request) {
        Connector connector = Connector.builder()
                .userId(request.getUserId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone() != null ? request.getPhone() : "")
                .region(request.getRegion())
                .status("PENDING_APPROVAL")
                .role(request.getRole() != null ? request.getRole() : "CONNECTOR")
                .email(request.getEmail())
                .build();

        return connectorRepository.save(connector);
    }

    @Transactional
    public void assignManager(UUID connectorId, ConnectorRequests.AssignManagerRequest request) {
        Connector connector = connectorRepository.findById(connectorId)
                .orElseThrow(() -> new RuntimeException("Connector not found"));

        Connector manager = connectorRepository.findById(request.getManagerId())
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        HierarchyMapping mapping = HierarchyMapping.builder()
                .connector(connector)
                .manager(manager)
                .role(request.getRole())
                .assignedAt(Instant.now())
                .build();

        hierarchyMappingRepository.save(mapping);
    }

    @Transactional
    public Connector updateStatus(UUID id, String status) {
        Connector connector = connectorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Connector not found"));
        connector.setStatus(status);
        return connectorRepository.save(connector);
    }

    @Transactional
    public Connector updateConnector(UUID id, ConnectorRequests.CreateConnectorRequest request) {
        Connector connector = connectorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Connector not found"));
        connector.setFirstName(request.getFirstName());
        connector.setLastName(request.getLastName());
        connector.setPhone(request.getPhone() != null ? request.getPhone() : "");
        connector.setRegion(request.getRegion());
        if (request.getRole() != null) {
            connector.setRole(request.getRole());
        }
        if (request.getEmail() != null) {
            connector.setEmail(request.getEmail());
        }
        return connectorRepository.save(connector);
    }

    public List<Connector> getManagersByRole(String role) {
        return connectorRepository.findAllByRole(role);
    }

    public List<Connector> listConnectors(String roles) {
        if (roles == null || roles.isBlank()) {
            return connectorRepository.findAll();
        }
        List<String> roleList = java.util.Arrays.asList(roles.split(","));
        return connectorRepository.findAllByRoleIn(roleList);
    }

    public Connector getMe(String email) {
        return connectorRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Connector not found for email: " + email));
    }

    /** Returns the manager chain for a given connector (who they report to). */
    public List<HierarchyMapping> getHierarchy(UUID connectorId) {
        connectorRepository.findById(connectorId)
                .orElseThrow(() -> new RuntimeException("Connector not found"));
        return hierarchyMappingRepository.findByConnectorId(connectorId);
    }

    /** Returns everyone who reports directly to this connector (as their manager). */
    public List<HierarchyMapping> getReportees(UUID managerId) {
        connectorRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Connector not found"));
        return hierarchyMappingRepository.findByManagerId(managerId);
    }
}
