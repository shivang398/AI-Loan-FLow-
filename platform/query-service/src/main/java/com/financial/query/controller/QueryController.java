package com.financial.query.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.query.dto.QueryRequests;
import com.financial.query.entity.Query;
import com.financial.query.service.QueryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/queries")
@RequiredArgsConstructor
public class QueryController {

    private final QueryService queryService;

    @PostMapping
    public ResponseEntity<ApiResponse<Query>> createQuery(@Valid @RequestBody QueryRequests.CreateQueryRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Query created", queryService.createQuery(request), UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<ApiResponse<Query>> resolve(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success("Query resolved", queryService.resolveQuery(id), UUID.randomUUID().toString()));
    }

    @PutMapping("/{id}/escalate")
    public ResponseEntity<ApiResponse<Query>> escalate(@PathVariable UUID id, @Valid @RequestBody QueryRequests.EscalateRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Query escalated", queryService.escalateQuery(id, request), UUID.randomUUID().toString()));
    }
}
