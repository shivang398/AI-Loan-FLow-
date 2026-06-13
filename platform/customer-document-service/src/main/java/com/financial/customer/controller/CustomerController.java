package com.financial.customer.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.Lead;
import com.financial.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("status is required", List.of(), UUID.randomUUID().toString()));
        }
        if (newStatus.length() > 50 || !newStatus.matches("^[A-Z_]+$")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid status: must be ≤ 50 characters and contain only uppercase letters and underscores",
                            List.of(), UUID.randomUUID().toString()));
        }
        String email = auth.getName();
        boolean isAdmin = hasAdminAccess(auth);
        Lead updated = customerService.updateLeadStatus(id, newStatus, email, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Lead status updated", updated, UUID.randomUUID().toString()));
    }

    @PutMapping("/leads/{id}/notes")
    public ResponseEntity<ApiResponse<Lead>> updateLeadNotes(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body,
            Authentication auth) {
        String notes = body.get("notes");
        if (notes == null) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("notes field is required", List.of(), UUID.randomUUID().toString()));
        }
        if (notes.length() > 2000) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid notes: must be ≤ 2000 characters",
                            List.of(), UUID.randomUUID().toString()));
        }
        String email = auth.getName();
        boolean isAdmin = hasAdminAccess(auth);
        Lead updated = customerService.updateLeadNotes(id, notes, email, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Notes saved", updated, UUID.randomUUID().toString()));
    }

    /**
     * Reassign open leads from an offboarded ops user to remaining active ops team.
     * Called by admin when offboarding an OPERATIONS employee.
     */
    @PostMapping("/leads/reassign")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'ROLE_ADMIN', 'PARTNER_MANAGER', 'ROLE_PARTNER_MANAGER')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> reassignLeads(
            @RequestBody Map<String, String> body) {
        String fromEmail = body.get("fromEmail");
        if (fromEmail == null || fromEmail.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("fromEmail is required", List.of(), UUID.randomUUID().toString()));
        }
        if (fromEmail.length() > 254 || !fromEmail.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid fromEmail format", List.of(), UUID.randomUUID().toString()));
        }
        int count = customerService.reassignLeads(fromEmail);
        return ResponseEntity.ok(ApiResponse.success(
                "Leads reassigned",
                Map.of("reassigned", count, "fromEmail", fromEmail),
                UUID.randomUUID().toString()
        ));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyAuthority('ADMIN','ROLE_ADMIN','OPERATIONS','ROLE_OPERATIONS','PARTNER_MANAGER','ROLE_PARTNER_MANAGER')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> bulkImport(
            @RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("File is empty", List.of(), UUID.randomUUID().toString()));
        }
        if (file.getSize() > 2L * 1024 * 1024) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("File too large (max 2 MB)", List.of(), UUID.randomUUID().toString()));
        }
        String name = file.getOriginalFilename();
        if (name == null || (!name.toLowerCase().endsWith(".csv"))) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Only CSV files are supported", List.of(), UUID.randomUUID().toString()));
        }
        Map<String, Object> result = customerService.bulkImportLeads(file);
        return ResponseEntity.ok(ApiResponse.success("Bulk import complete", result, UUID.randomUUID().toString()));
    }

    private boolean hasAdminAccess(Authentication auth) {
        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("ROLE_ADMIN")
                            || a.equals("OPERATIONS") || a.equals("ROLE_OPERATIONS")
                            || a.equals("TEAM_LEADER") || a.equals("ROLE_TEAM_LEADER")
                            || a.equals("PARTNER_MANAGER") || a.equals("ROLE_PARTNER_MANAGER"));
    }
}
