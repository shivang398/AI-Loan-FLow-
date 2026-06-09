package com.financial.connector.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.connector.dto.ConnectorRequests;
import com.financial.connector.entity.Connector;
import com.financial.connector.entity.HierarchyMapping;
import com.financial.connector.service.ConnectorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    // Fix 1: shared secret for inter-service calls — never exposed to internet
    @Value("${app.internal-token}")
    private String internalToken;

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
     * Fix 1: Internal service-to-service endpoint — requires X-Internal-Token header.
     * permitAll() in SecurityConfig because no JWT is available for inter-service calls,
     * but the shared secret still authenticates the caller.
     */
    @GetMapping("/internal/active-ops")
    public ResponseEntity<ApiResponse<List<String>>> getActiveOpsEmails(
            @RequestHeader(value = "X-Internal-Token", required = false) String token) {
        if (!internalToken.equals(token)) {
            return ResponseEntity.status(403).build();
        }
        List<String> emails = connectorService.getActiveOpsEmails();
        return ResponseEntity.ok(ApiResponse.success("Active ops emails", emails, UUID.randomUUID().toString()));
    }

    /**
     * Returns the manager chain for a connector — who they report to.
     * e.g. Channel Partner → Team Leader, Team Leader → RM
     */
    @GetMapping("/{id}/hierarchy")
    public ResponseEntity<ApiResponse<List<HierarchyMapping>>> getHierarchy(
            @PathVariable UUID id,
            Authentication authentication) {
        boolean isPrivileged = authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER")
                            || a.equals("RM") || a.equals("ROLE_RM"));
        if (!isPrivileged) {
            // Non-privileged users may only view their own hierarchy
            UUID callerId = connectorService.getMe(authentication.getName()).getId();
            if (!callerId.equals(id)) {
                throw new org.springframework.security.access.AccessDeniedException(
                        "Cannot view another connector's hierarchy");
            }
        }
        List<HierarchyMapping> chain = connectorService.getHierarchy(id);
        return ResponseEntity.ok(ApiResponse.success("Hierarchy fetched", chain, UUID.randomUUID().toString()));
    }

    @GetMapping("/{id}/reportees")
    public ResponseEntity<ApiResponse<List<HierarchyMapping>>> getReportees(
            @PathVariable UUID id,
            Authentication authentication) {
        boolean isPrivileged = authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER")
                            || a.equals("RM") || a.equals("ROLE_RM"));
        if (!isPrivileged) {
            UUID callerId = connectorService.getMe(authentication.getName()).getId();
            if (!callerId.equals(id)) {
                throw new org.springframework.security.access.AccessDeniedException(
                        "Cannot view another connector's reportees");
            }
        }
        List<HierarchyMapping> reportees = connectorService.getReportees(id);
        return ResponseEntity.ok(ApiResponse.success("Reportees fetched", reportees, UUID.randomUUID().toString()));
    }
}
