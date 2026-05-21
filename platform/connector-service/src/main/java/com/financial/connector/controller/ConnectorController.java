package com.financial.connector.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.connector.dto.ConnectorRequests;
import com.financial.connector.entity.Connector;
import com.financial.connector.service.ConnectorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/connectors")
@RequiredArgsConstructor
public class ConnectorController {

    private final ConnectorService connectorService;

    @PostMapping
    public ResponseEntity<ApiResponse<Connector>> createConnector(@Valid @RequestBody ConnectorRequests.CreateConnectorRequest request) {
        Connector connector = connectorService.createConnector(request);
        return ResponseEntity.ok(ApiResponse.success("Connector created successfully", connector, UUID.randomUUID().toString()));
    }

    @PostMapping("/{id}/assign-manager")
    public ResponseEntity<ApiResponse<String>> assignManager(@PathVariable UUID id, @Valid @RequestBody ConnectorRequests.AssignManagerRequest request) {
        connectorService.assignManager(id, request);
        return ResponseEntity.ok(ApiResponse.success("Manager assigned successfully", null, UUID.randomUUID().toString()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<Connector>>> listConnectors(@RequestParam(required = false) String roles) {
        java.util.List<Connector> connectors = connectorService.listConnectors(roles);
        return ResponseEntity.ok(ApiResponse.success("Connectors fetched successfully", connectors, UUID.randomUUID().toString()));
    }

    @GetMapping("/managers")
    public ResponseEntity<ApiResponse<java.util.List<Connector>>> listManagersByRole(@RequestParam(defaultValue = "RM") String role) {
        java.util.List<Connector> managers = connectorService.getManagersByRole(role);
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
}
