package com.financial.loancore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.loan",
    "com.financial.eligibility",
    "com.financial.policy",
    "com.financial.loancore",
    "com.financial.common"
})
public class LoanCoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoanCoreApplication.class, args);
    }
}
