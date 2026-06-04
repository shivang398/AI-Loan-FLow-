package com.financial.policy.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "policy_rules")
public class PolicyRule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private BankPolicy bankPolicy;

    @Column(name = "rule_category", nullable = false)
    private String ruleCategory;

    @Column(name = "rule_key", nullable = false)
    private String ruleKey;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "rule_value", columnDefinition = "JSON", nullable = false)
    private Map<String, Object> ruleValue;

    public PolicyRule() {}

    public PolicyRule(UUID id, BankPolicy bankPolicy, String ruleCategory, String ruleKey, Map<String, Object> ruleValue) {
        this.id = id;
        this.bankPolicy = bankPolicy;
        this.ruleCategory = ruleCategory;
        this.ruleKey = ruleKey;
        this.ruleValue = ruleValue;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public BankPolicy getBankPolicy() { return bankPolicy; }
    public void setBankPolicy(BankPolicy bankPolicy) { this.bankPolicy = bankPolicy; }
    public String getRuleCategory() { return ruleCategory; }
    public void setRuleCategory(String ruleCategory) { this.ruleCategory = ruleCategory; }
    public String getRuleKey() { return ruleKey; }
    public void setRuleKey(String ruleKey) { this.ruleKey = ruleKey; }
    public Map<String, Object> getRuleValue() { return ruleValue; }
    public void setRuleValue(Map<String, Object> ruleValue) { this.ruleValue = ruleValue; }

    public static PolicyRuleBuilder builder() {
        return new PolicyRuleBuilder();
    }

    public static class PolicyRuleBuilder {
        private UUID id;
        private BankPolicy bankPolicy;
        private String ruleCategory;
        private String ruleKey;
        private Map<String, Object> ruleValue;

        public PolicyRuleBuilder id(UUID id) { this.id = id; return this; }
        public PolicyRuleBuilder bankPolicy(BankPolicy bankPolicy) { this.bankPolicy = bankPolicy; return this; }
        public PolicyRuleBuilder ruleCategory(String ruleCategory) { this.ruleCategory = ruleCategory; return this; }
        public PolicyRuleBuilder ruleKey(String ruleKey) { this.ruleKey = ruleKey; return this; }
        public PolicyRuleBuilder ruleValue(Map<String, Object> ruleValue) { this.ruleValue = ruleValue; return this; }

        public PolicyRule build() {
            return new PolicyRule(id, bankPolicy, ruleCategory, ruleKey, ruleValue);
        }
    }
}
