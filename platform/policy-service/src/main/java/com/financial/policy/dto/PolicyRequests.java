package com.financial.policy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class PolicyRequests {

    public static class CreatePolicyRequest {
        @NotBlank
        private String bankName;
        
        @NotBlank
        private String policyVersion;
        
        @NotNull
        private LocalDate effectiveFrom;
        
        private List<RuleDto> rules;

        public String getBankName() { return bankName; }
        public void setBankName(String bankName) { this.bankName = bankName; }
        public String getPolicyVersion() { return policyVersion; }
        public void setPolicyVersion(String policyVersion) { this.policyVersion = policyVersion; }
        public LocalDate getEffectiveFrom() { return effectiveFrom; }
        public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }
        public List<RuleDto> getRules() { return rules; }
        public void setRules(List<RuleDto> rules) { this.rules = rules; }
    }

    public static class RuleDto {
        @NotBlank
        private String ruleCategory;
        
        @NotBlank
        private String ruleKey;
        
        @NotNull
        private Map<String, Object> ruleValue;

        public String getRuleCategory() { return ruleCategory; }
        public void setRuleCategory(String ruleCategory) { this.ruleCategory = ruleCategory; }
        public String getRuleKey() { return ruleKey; }
        public void setRuleKey(String ruleKey) { this.ruleKey = ruleKey; return; }
        public Map<String, Object> getRuleValue() { return ruleValue; }
        public void setRuleValue(Map<String, Object> ruleValue) { this.ruleValue = ruleValue; }
    }
}
