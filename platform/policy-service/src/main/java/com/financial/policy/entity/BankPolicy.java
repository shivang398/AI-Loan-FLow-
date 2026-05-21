package com.financial.policy.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "bank_policies")
public class BankPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "bank_name", nullable = false)
    private String bankName;

    @Column(name = "policy_version", nullable = false)
    private String policyVersion;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "bankPolicy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PolicyRule> rules;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "updated_by")
    private UUID updatedBy;

    public BankPolicy() {}

    public BankPolicy(UUID id, String bankName, String policyVersion, LocalDate effectiveFrom, LocalDate effectiveTo, String status, List<PolicyRule> rules, Instant createdAt, Instant updatedAt, UUID createdBy, UUID updatedBy) {
        this.id = id;
        this.bankName = bankName;
        this.policyVersion = policyVersion;
        this.effectiveFrom = effectiveFrom;
        this.effectiveTo = effectiveTo;
        this.status = status;
        this.rules = rules;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    public String getPolicyVersion() { return policyVersion; }
    public void setPolicyVersion(String policyVersion) { this.policyVersion = policyVersion; }
    public LocalDate getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }
    public LocalDate getEffectiveTo() { return effectiveTo; }
    public void setEffectiveTo(LocalDate effectiveTo) { this.effectiveTo = effectiveTo; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<PolicyRule> getRules() { return rules; }
    public void setRules(List<PolicyRule> rules) { this.rules = rules; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
    public UUID getCreatedBy() { return createdBy; }
    public void setCreatedBy(UUID createdBy) { this.createdBy = createdBy; }
    public UUID getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(UUID updatedBy) { this.updatedBy = updatedBy; }

    public static BankPolicyBuilder builder() {
        return new BankPolicyBuilder();
    }

    public static class BankPolicyBuilder {
        private UUID id;
        private String bankName;
        private String policyVersion;
        private LocalDate effectiveFrom;
        private LocalDate effectiveTo;
        private String status;
        private List<PolicyRule> rules;
        private Instant createdAt;
        private Instant updatedAt;
        private UUID createdBy;
        private UUID updatedBy;

        public BankPolicyBuilder id(UUID id) { this.id = id; return this; }
        public BankPolicyBuilder bankName(String bankName) { this.bankName = bankName; return this; }
        public BankPolicyBuilder policyVersion(String policyVersion) { this.policyVersion = policyVersion; return this; }
        public BankPolicyBuilder effectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; return this; }
        public BankPolicyBuilder effectiveTo(LocalDate effectiveTo) { this.effectiveTo = effectiveTo; return this; }
        public BankPolicyBuilder status(String status) { this.status = status; return this; }
        public BankPolicyBuilder rules(List<PolicyRule> rules) { this.rules = rules; return this; }
        public BankPolicyBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public BankPolicyBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }
        public BankPolicyBuilder createdBy(UUID createdBy) { this.createdBy = createdBy; return this; }
        public BankPolicyBuilder updatedBy(UUID updatedBy) { this.updatedBy = updatedBy; return this; }

        public BankPolicy build() {
            return new BankPolicy(id, bankName, policyVersion, effectiveFrom, effectiveTo, status, rules, createdAt, updatedAt, createdBy, updatedBy);
        }
    }
}
