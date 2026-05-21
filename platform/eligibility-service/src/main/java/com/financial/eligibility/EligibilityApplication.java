package com.financial.eligibility;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.eligibility", "com.financial.common"})
public class EligibilityApplication {
    public static void main(String[] args) {
        SpringApplication.run(EligibilityApplication.class, args);
    }
}
