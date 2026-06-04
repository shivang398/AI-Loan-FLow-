package com.financial.eligibility.dto;

import lombok.Data;
import java.util.List;

@Data
public class CibilSummaryDto {
    private String reportId;
    private int cibilScore;
    private String scoreBand;
    private String scoreDate;
    private String fullName;
    private String dob;
    private String gender;
    private String address;
    private String occupationType;
    private String income;
    private int totalAccounts;
    private int activeAccounts;
    private int closedAccounts;
    private int overdueAccounts;
    private long totalBalance;
    private long totalOverdue;
    private int enquiryCount;
    private boolean demoMode;
    private List<AccountSummary> accounts;

    @Data
    public static class AccountSummary {
        private String memberName;
        private String accountType;
        private String accountNumber;
        private long currentBalance;
        private long amountOverdue;
        private String accountStatus;
        private String dateOpened;
        private String dateClosed;
    }
}
