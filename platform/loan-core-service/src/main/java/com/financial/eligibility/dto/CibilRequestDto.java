package com.financial.eligibility.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CibilRequestDto {

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Mobile number must be a valid 10-digit Indian number")
    private String mobileNumber;

    @NotBlank(message = "Name is required")
    private String name;

    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]$", message = "PAN must be in format AAAAA9999A")
    private String panNumber;

    private boolean consent;

    @AssertTrue(message = "Consent is required to perform a credit check")
    public boolean isConsent() {
        return consent;
    }
}
