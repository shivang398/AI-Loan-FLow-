package com.financial.customer.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;

public class CustomerRequests {

    @Data
    public static class CreateCustomerRequest {

        // Core identity
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

        // Loan
        private String loanType;
        private BigDecimal loanAmount;

        // General
        private String profession;
        private BigDecimal netMonthlySalary;

        // Personal
        private String gender;
        private String maritalStatus;
        private String dob;
        private String alternateContact;
        private String whatsappNo;
        private String officialEmail;

        // Current Address
        private String currentAddressLine1;
        private String currentAddressLine2;
        private String currentState;
        private String currentDistrict;
        private String currentCity;
        private String currentPincode;
        private String residenceType;

        // Permanent Address
        private String permanentAddressLine1;
        private String permanentAddressLine2;
        private String permanentState;
        private String permanentDistrict;
        private String permanentCity;
        private String permanentPincode;

        // Employment
        private String jobType;
        private String designation;
        private String companyName;
        private String modeOfSalary;

        // Office Address
        private String officeAddress;
        private String officeState;
        private String officeDistrict;
        private String officeCity;
        private String officePincode;

        // Financial
        private BigDecimal existingEmi;
        private Boolean hasPriorPersonalLoan;
    }
}
