package com.financial.customer.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.Lead;
import com.financial.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<ApiResponse<Customer>> createCustomer(@Valid @RequestBody CustomerRequests.CreateCustomerRequest request) {
        Customer customer = customerService.createCustomer(request);
        return ResponseEntity.ok(ApiResponse.success("Customer created successfully", customer, UUID.randomUUID().toString()));
    }

    @GetMapping("/leads")
    public ResponseEntity<ApiResponse<List<Lead>>> getLeads(Authentication auth) {
        String email = auth.getName();
        boolean isAdmin = hasAdminAccess(auth);
        List<Lead> leads = customerService.getLeads(email, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Leads fetched successfully", leads, UUID.randomUUID().toString()));
    }

    @PutMapping("/leads/{id}/status")
    public ResponseEntity<ApiResponse<Lead>> updateLeadStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body,
            Authentication auth) {
        String newStatus = body.get("status");
        if (newStatus == null || newStatus.isBlank()) {
            throw new RuntimeException("status is required");
        }
        String email = auth.getName();
        boolean isAdmin = hasAdminAccess(auth);
        Lead updated = customerService.updateLeadStatus(id, newStatus, email, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Lead status updated", updated, UUID.randomUUID().toString()));
    }

    private boolean hasAdminAccess(Authentication auth) {
        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("TEAM_LEADER") || a.equals("ROLE_TEAM_LEADER"));
    }
}
