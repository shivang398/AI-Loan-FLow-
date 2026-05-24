package com.financial.customer.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.customer.dto.CustomerRequests;
import com.financial.customer.entity.Customer;
import com.financial.customer.entity.Lead;
import com.financial.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<ApiResponse<List<Lead>>> getLeads() {
        List<Lead> leads = customerService.getAllLeads();
        return ResponseEntity.ok(ApiResponse.success("Leads fetched successfully", leads, UUID.randomUUID().toString()));
    }
}
