package com.financial.policy.service;

import com.financial.policy.dto.PolicyRequests;
import com.financial.policy.entity.BankPolicy;
import com.financial.policy.entity.PolicyRule;
import com.financial.policy.repository.BankPolicyRepository;
import com.financial.policy.repository.PolicyRuleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PolicyService {

    private final BankPolicyRepository bankPolicyRepository;
    private final PolicyRuleRepository policyRuleRepository;

    public PolicyService(BankPolicyRepository bankPolicyRepository, PolicyRuleRepository policyRuleRepository) {
        this.bankPolicyRepository = bankPolicyRepository;
        this.policyRuleRepository = policyRuleRepository;
    }

    @Transactional
    public BankPolicy createPolicy(PolicyRequests.CreatePolicyRequest request) {
        BankPolicy policy = BankPolicy.builder()
                .bankName(request.getBankName())
                .policyVersion(request.getPolicyVersion())
                .effectiveFrom(request.getEffectiveFrom())
                .status("DRAFT")
                .build();
                
        policy = bankPolicyRepository.save(policy);

        if (request.getRules() != null && !request.getRules().isEmpty()) {
            List<PolicyRule> rulesToSave = new ArrayList<>();
            for (PolicyRequests.RuleDto ruleDto : request.getRules()) {
                PolicyRule rule = PolicyRule.builder()
                        .bankPolicy(policy)
                        .ruleCategory(ruleDto.getRuleCategory())
                        .ruleKey(ruleDto.getRuleKey())
                        .ruleValue(ruleDto.getRuleValue())
                        .build();
                rulesToSave.add(rule);
            }
            policyRuleRepository.saveAll(rulesToSave);
            policy.setRules(rulesToSave);
        }

        return policy;
    }
}
