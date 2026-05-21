package com.financial.rmtracking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.rmtracking", "com.financial.common"})
public class RmTrackingApplication {
    public static void main(String[] args) {
        SpringApplication.run(RmTrackingApplication.class, args);
    }
}
