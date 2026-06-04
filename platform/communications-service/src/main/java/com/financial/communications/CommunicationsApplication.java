package com.financial.communications;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.messaging",
    "com.financial.notification",
    "com.financial.communications",
    "com.financial.common"
})
public class CommunicationsApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommunicationsApplication.class, args);
    }
}
