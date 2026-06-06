package com.financial.eligibility.dto;

import lombok.Data;
import java.util.List;

@Data
public class BsaAiResult {

    private String source; // "CUSTOMER_RECORD" or "MANUAL_UPLOAD"

    private String bankName;
    private String accountHolderName;
    private String accountNumber;
    private String statementPeriod;

    private double monthlyAverageCredit;
    private double monthlyAverageDebit;
    private double closingBalance;
    private double openingBalance;
    private int    bouncedCheques;
    private double estimatedFoir;

    private List<SalaryCredit>    salaryCredits;
    private List<EmiDebit>        emiDebits;
    private List<ExpenseCategory> topExpenseCategories;
    private List<String>          riskFlags;
    private String                analysisNotes;

    @Data
    public static class SalaryCredit {
        private String date;
        private double amount;
        private String source;
    }

    @Data
    public static class EmiDebit {
        private String date;
        private double amount;
        private String label;
    }

    @Data
    public static class ExpenseCategory {
        private String category;
        private double amount;
        private double percentage;
    }
}
