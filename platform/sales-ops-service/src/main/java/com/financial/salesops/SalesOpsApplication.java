package com.financial.salesops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.connector",
    "com.financial.commission",
    "com.financial.routing",
    "com.financial.salesops",
    "com.financial.common"
})
@EntityScan(basePackages = {
    "com.financial.connector.entity",
    "com.financial.commission.entity",
    "com.financial.routing.entity"
})
@EnableJpaRepositories(basePackages = {
    "com.financial.connector.repository",
    "com.financial.commission.repository",
    "com.financial.routing.repository"
})
public class SalesOpsApplication {
    public static void main(String[] args) {
        SpringApplication.run(SalesOpsApplication.class, args);
    }
}
