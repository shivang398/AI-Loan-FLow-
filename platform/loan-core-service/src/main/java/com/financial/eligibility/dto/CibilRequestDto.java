package com.financial.eligibility.dto;

import lombok.Data;

@Data
public class CibilRequestDto {
    private String mobileNumber;
    private String name;
    private String panNumber;
    private boolean consent;
}
