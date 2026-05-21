package com.financial.loan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.loan", "com.financial.common"})
public class LoanApplicationService {
    public static void main(String[] args) {
        SpringApplication.run(LoanApplicationService.class, args);
    }
}
