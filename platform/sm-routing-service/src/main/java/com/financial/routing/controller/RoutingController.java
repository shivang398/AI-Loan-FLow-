package com.financial.routing.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.routing.dto.RoutingRequests;
import com.financial.routing.entity.SalesManager;
import com.financial.routing.service.RoutingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/routing")
@RequiredArgsConstructor
public class RoutingController {

    private final RoutingService routingService;

    @PostMapping("/assign")
    public ResponseEntity<ApiResponse<SalesManager>> assignSM(@Valid @RequestBody RoutingRequests.AssignRequest request) {
        SalesManager sm = routingService.assignSalesManager(request);
        return ResponseEntity.ok(ApiResponse.success("Sales Manager assigned", sm, UUID.randomUUID().toString()));
    }
}
