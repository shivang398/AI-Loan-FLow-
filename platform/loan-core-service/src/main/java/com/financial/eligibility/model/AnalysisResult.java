package com.financial.eligibility.model;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class AnalysisResult {

    private List<Transaction> transactions;

    /** Month → (totalCredits, totalDebits, closingBalance, txnCount) */
    private Map<YearMonth, MonthlySummary> monthlySummaries;

    /** Month → average monthly balance for that month */
    private Map<YearMonth, BigDecimal> monthlyAmb;

    /** Overall AMB across the entire statement period */
    private BigDecimal overallAmb;

    private List<Transaction> salaryCredits;
    private List<Transaction> emiDeductions;
    private List<LoanDetail>  loanDetails;
    private List<Transaction> cashTransactions;
    private List<Transaction> bounceReturns;

    /** Category name → aggregated summary */
    private Map<String, MerchantCategory> merchantCategories;

    /** Month → balance on key banking dates (1,5,10,15,20,25,30) and their average */
    private Map<YearMonth, KeyDateBalance> keyDateBalances;

    /** Overall average of key-date balances across all months */
    private BigDecimal overallKeyDateAvg;

    // ─── Nested value types ───────────────────────────────────────────

    @Data
    @Builder
    public static class MonthlySummary {
        private BigDecimal totalCredits;
        private BigDecimal totalDebits;
        private BigDecimal closingBalance;
        private int transactionCount;
    }

    @Data
    @Builder
    public static class MerchantCategory {
        private String category;
        private long count;
        private BigDecimal totalAmount;
    }

    @Data
    @Builder
    public static class KeyDateBalance {
        /** Maps key date (1,5,10,15,20,25,30) → closing balance on that date */
        private Map<Integer, BigDecimal> dateBalances;
        /** Average of the 7 key-date balances for the month */
        private BigDecimal averageBalance;
    }

    @Data
    @Builder
    public static class LoanDetail {
        private String lenderName;
        private String loanCategory;
        private BigDecimal avgEmiAmount;
        private int paymentDayOfMonth;
        private BigDecimal totalPaid;
        private LocalDate firstPaymentDate;
        private LocalDate lastPaymentDate;
        private int paymentCount;
        /** Month → dates on which this loan's EMI was paid that month */
        private Map<YearMonth, List<LocalDate>> monthlyPaymentDates;
        /** All individual EMI transactions for this loan */
        private List<Transaction> payments;
    }
}
