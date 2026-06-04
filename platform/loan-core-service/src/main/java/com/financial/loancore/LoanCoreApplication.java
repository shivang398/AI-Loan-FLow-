package com.financial.loancore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.loan","com.financial.eligibility","com.financial.policy","com.financial.loancore","com.financial.common"})
@EntityScan(basePackages = {"com.financial.loan.entity","com.financial.eligibility.entity","com.financial.policy.entity"})
@EnableJpaRepositories(basePackages = {"com.financial.loan.repository","com.financial.eligibility.repository","com.financial.policy.repository"})
public class LoanCoreApplication {
    public static void main(String[] args) { SpringApplication.run(LoanCoreApplication.class, args); }
}
