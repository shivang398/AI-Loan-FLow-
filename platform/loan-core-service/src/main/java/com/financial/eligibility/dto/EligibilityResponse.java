package com.financial.eligibility.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EligibilityResponse {
    private String status; // ELIGIBLE, REJECTED
    private BigDecimal foirValue;
    private List<String> rejectionReasons;
}
