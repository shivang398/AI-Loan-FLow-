package com.financial.document.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.common.security.FileValidator;
import com.financial.customer.repository.CustomerRepository;
import com.financial.document.entity.Document;
import com.financial.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final CustomerRepository customerRepository;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Document>> upload(
            @RequestParam(required = false) UUID loanId,
            @RequestParam String documentType,
            @RequestParam(defaultValue = "/") String folderPath,
            @RequestParam MultipartFile file,
            Authentication auth) throws IOException {
        FileValidator.validate(file); // Fix 7: MIME type + magic byte check
        UUID uploaderId = resolveUserId(auth);
        Document doc = documentService.uploadDocument(loanId, documentType, folderPath, file, uploaderId);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", doc, UUID.randomUUID().toString()));
    }

    @GetMapping("/folder")
    public ResponseEntity<ApiResponse<java.util.List<Document>>> getByFolder(
            @RequestParam String path,
            Authentication auth) {
        UUID requesterId = resolveUserId(auth);
        java.util.List<Document> docs = documentService.getDocumentsByFolderPath(path, requesterId);
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", docs, UUID.randomUUID().toString()));
    }

    @GetMapping("/{id}/presigned-url")
    public ResponseEntity<ApiResponse<String>> presignedUrl(
            @PathVariable UUID id,
            Authentication auth) {
        UUID requesterId = resolveUserId(auth);
        boolean isStaff = auth.getAuthorities().stream()
                .anyMatch(a -> {
                    String r = a.getAuthority();
                    return r.equals("ADMIN") || r.equals("OPERATIONS") || r.equals("PARTNER_MANAGER") || r.equals("RM");
                });
        String url = documentService.generatePresignedUrl(id, requesterId, isStaff);
        return ResponseEntity.ok(ApiResponse.success("Pre-signed URL generated", url, UUID.randomUUID().toString()));
    }

    /** Public upload — called by unauthenticated landing-page customers after form submission. */
    @PostMapping("/public/upload")
    public ResponseEntity<ApiResponse<Document>> publicUpload(
            @RequestParam UUID customerId,
            @RequestParam String documentType,
            @RequestParam MultipartFile file) throws IOException {
        // SECURITY: verify the customerId actually exists before accepting the upload.
        // Prevents IDOR where an attacker guesses UUIDs and pollutes other customers' records.
        if (!customerRepository.existsById(customerId)) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Customer not found", java.util.List.of(), UUID.randomUUID().toString()));
        }
        FileValidator.validate(file);
        Document doc = documentService.uploadPublicDocument(customerId, documentType, file);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", doc, UUID.randomUUID().toString()));
    }

    /** Returns all KYC documents for a customer — called by authenticated ops users. */
    @GetMapping("/by-customer/{customerId}")
    public ResponseEntity<ApiResponse<java.util.List<Document>>> getByCustomer(
            @PathVariable UUID customerId,
            Authentication auth) {
        if (auth == null) {
            throw new org.springframework.security.access.AccessDeniedException("Not authenticated");
        }
        boolean isPrivileged = auth.getAuthorities().stream()
                .anyMatch(a -> {
                    String r = a.getAuthority();
                    return r.equals("ADMIN") || r.equals("OPERATIONS") || r.equals("PARTNER_MANAGER")
                            || r.equals("TEAM_LEADER") || r.equals("RM");
                });
        if (!isPrivileged) {
            // CONNECTOR (or any other non-privileged role) may only view documents for
            // customers that belong to them.  Derive their stable UUID from their login name
            // the same way resolveUserId() does, then check ownership via the repository.
            UUID callerId = resolveUserId(auth);
            boolean owns = customerRepository.existsByIdAndCreatedBy(customerId, callerId);
            if (!owns) {
                return ResponseEntity.status(403)
                        .body(ApiResponse.error("Access denied: customer does not belong to you",
                                java.util.List.of(), UUID.randomUUID().toString()));
            }
        }
        java.util.List<Document> docs = documentService.getDocumentsByCustomerId(customerId);
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", docs, UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/review")
    @PreAuthorize("hasAnyAuthority('ADMIN','OPERATIONS')")
    public ResponseEntity<ApiResponse<Document>> reviewDocument(
            @PathVariable UUID id,
            @RequestBody Map<String, String> body,
            Authentication auth) {
        String status  = body.get("status");
        String remarks = body.getOrDefault("remarks", "");
        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("status is required (APPROVED or REJECTED)",
                            java.util.List.of(), UUID.randomUUID().toString()));
        }
        UUID reviewerId = resolveUserId(auth);
        Document doc = documentService.reviewDocument(id, status, remarks, reviewerId);
        return ResponseEntity.ok(ApiResponse.success("Document " + status.toLowerCase(),
                doc, UUID.randomUUID().toString()));
    }

    private UUID resolveUserId(Authentication auth) {
        if (auth == null || auth.getName() == null) {
            throw new org.springframework.security.access.AccessDeniedException("Not authenticated");
        }
        return UUID.nameUUIDFromBytes(auth.getName().getBytes(java.nio.charset.StandardCharsets.UTF_8));
    }
}
