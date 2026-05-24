package com.financial.customer.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CustomerRequests {

    @Data
    public static class CreateCustomerRequest {
        @NotBlank
        private String firstName;
        
        @NotBlank
        private String lastName;
        
        @NotBlank
        @Email
        private String email;
        
        @NotBlank
        @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
        private String mobile;

        @NotBlank
        @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN format")
        private String panNumber;

        private String aadhaarNumber;

        private String loanType;

        private java.math.BigDecimal loanAmount;
    }
}
