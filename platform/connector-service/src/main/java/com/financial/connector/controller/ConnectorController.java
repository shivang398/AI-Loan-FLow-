package com.financial.connector.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.connector.dto.ConnectorRequests;
import com.financial.connector.entity.Connector;
import com.financial.connector.entity.HierarchyMapping;
import com.financial.connector.service.ConnectorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/connectors")
@RequiredArgsConstructor
public class ConnectorController {

    private final ConnectorService connectorService;

    @PostMapping
    public ResponseEntity<ApiResponse<Connector>> createConnector(
            @Valid @RequestBody ConnectorRequests.CreateConnectorRequest request) {
        Connector connector = connectorService.createConnector(request);
        return ResponseEntity.ok(ApiResponse.success("Connector created successfully", connector, UUID.randomUUID().toString()));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Connector>> getMe(Authentication authentication) {
        Connector connector = connectorService.getMe(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Connector profile fetched successfully", connector, UUID.randomUUID().toString()));
    }

    @PostMapping("/{id}/assign-manager")
    public ResponseEntity<ApiResponse<String>> assignManager(
            @PathVariable UUID id,
            @Valid @RequestBody ConnectorRequests.AssignManagerRequest request) {
        connectorService.assignManager(id, request);
        return ResponseEntity.ok(ApiResponse.success("Manager assigned successfully", null, UUID.randomUUID().toString()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Connector>>> listConnectors(
            @RequestParam(required = false) String roles) {
        List<Connector> connectors = connectorService.listConnectors(roles);
        return ResponseEntity.ok(ApiResponse.success("Connectors fetched successfully", connectors, UUID.randomUUID().toString()));
    }

    @GetMapping("/managers")
    public ResponseEntity<ApiResponse<List<Connector>>> listManagersByRole(
            @RequestParam(defaultValue = "RM") String role) {
        List<Connector> managers = connectorService.getManagersByRole(role);
        return ResponseEntity.ok(ApiResponse.success("Managers fetched successfully", managers, UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Connector>> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody ConnectorRequests.UpdateStatusRequest request) {
        Connector connector = connectorService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.success("Connector status updated successfully", connector, UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Connector>> updateConnector(
            @PathVariable UUID id,
            @Valid @RequestBody ConnectorRequests.CreateConnectorRequest request) {
        Connector connector = connectorService.updateConnector(id, request);
        return ResponseEntity.ok(ApiResponse.success("Connector updated successfully", connector, UUID.randomUUID().toString()));
    }

    /**
     * Internal service-to-service endpoint — returns emails of ACTIVE OPERATIONS users.
     * No auth required; only accessible within the internal network.
     */
    @GetMapping("/internal/active-ops")
    public ResponseEntity<ApiResponse<List<String>>> getActiveOpsEmails() {
        List<String> emails = connectorService.getActiveOpsEmails();
        return ResponseEntity.ok(ApiResponse.success("Active ops emails", emails, UUID.randomUUID().toString()));
    }

    /**
     * Returns the manager chain for a connector — who they report to.
     * e.g. Channel Partner → Team Leader, Team Leader → RM
     */
    @GetMapping("/{id}/hierarchy")
    public ResponseEntity<ApiResponse<List<HierarchyMapping>>> getHierarchy(@PathVariable UUID id) {
        List<HierarchyMapping> chain = connectorService.getHierarchy(id);
        return ResponseEntity.ok(ApiResponse.success("Hierarchy fetched", chain, UUID.randomUUID().toString()));
    }

    /**
     * Returns everyone who directly reports to this connector (as their manager).
     * e.g. for an RM → returns all Team Leaders; for a Team Leader → returns Channel Partners
     */
    @GetMapping("/{id}/reportees")
    public ResponseEntity<ApiResponse<List<HierarchyMapping>>> getReportees(@PathVariable UUID id) {
        List<HierarchyMapping> reportees = connectorService.getReportees(id);
        return ResponseEntity.ok(ApiResponse.success("Reportees fetched", reportees, UUID.randomUUID().toString()));
    }
}
