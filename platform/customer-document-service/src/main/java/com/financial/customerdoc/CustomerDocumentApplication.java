package com.financial.customerdoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.customer",
    "com.financial.document",
    "com.financial.customerdoc",
    "com.financial.common"
})
public class CustomerDocumentApplication {
    public static void main(String[] args) {
        SpringApplication.run(CustomerDocumentApplication.class, args);
    }
}
