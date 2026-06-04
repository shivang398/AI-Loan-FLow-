package com.financial.communications;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.messaging","com.financial.notification","com.financial.communications","com.financial.common"})
@EntityScan(basePackages = {"com.financial.messaging.entity","com.financial.notification.entity"})
@EnableJpaRepositories(basePackages = {"com.financial.messaging.repository","com.financial.notification.repository"})
public class CommunicationsApplication {
    public static void main(String[] args) { SpringApplication.run(CommunicationsApplication.class, args); }
}
