package com.financial.salesops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.connector",
    "com.financial.commission",
    "com.financial.routing",
    "com.financial.salesops",
    "com.financial.common"
})
public class SalesOpsApplication {
    public static void main(String[] args) {
        SpringApplication.run(SalesOpsApplication.class, args);
    }
}
