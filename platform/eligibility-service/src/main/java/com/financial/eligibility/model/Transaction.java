package com.financial.eligibility.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    private LocalDate  date;
    private String     description;
    private BigDecimal debit;    // null when not a debit transaction
    private BigDecimal credit;   // null when not a credit transaction
    private BigDecimal balance;

    public enum Type { DEBIT, CREDIT, UNKNOWN }

    /**
     * FIX: Previous version returned DEBIT for any transaction where credit was null/zero,
     * including transactions where BOTH debit and credit were null (e.g. balance-only rows).
     * Now explicitly checks the debit field first.
     */
    public Type getType() {
        if (credit != null && credit.compareTo(BigDecimal.ZERO) > 0) return Type.CREDIT;
        if (debit  != null && debit.compareTo(BigDecimal.ZERO)  > 0) return Type.DEBIT;
        return Type.UNKNOWN;
    }

    public BigDecimal getAmount() {
        if (credit != null && credit.compareTo(BigDecimal.ZERO) > 0) return credit;
        if (debit  != null && debit.compareTo(BigDecimal.ZERO)  > 0) return debit;
        return BigDecimal.ZERO;
    }

    public boolean isDebit()  { return getType() == Type.DEBIT; }
    public boolean isCredit() { return getType() == Type.CREDIT; }
}