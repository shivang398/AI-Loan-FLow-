package com.financial.customerdoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.customer","com.financial.document","com.financial.customerdoc","com.financial.common"})
@EntityScan(basePackages = {"com.financial.customer.entity","com.financial.document.entity"})
@EnableJpaRepositories(basePackages = {"com.financial.customer.repository","com.financial.document.repository"})
public class CustomerDocumentApplication {
    public static void main(String[] args) { SpringApplication.run(CustomerDocumentApplication.class, args); }
}
