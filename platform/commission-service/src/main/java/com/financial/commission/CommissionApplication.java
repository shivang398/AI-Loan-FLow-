package com.financial.commission;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.commission", "com.financial.common"})
public class CommissionApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommissionApplication.class, args);
    }
}
