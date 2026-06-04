package com.financial.analyticsreporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.financial.analytics",
    "com.financial.reporting",
    "com.financial.analyticsreporting",
    "com.financial.common"
})
public class AnalyticsReportingApplication {
    public static void main(String[] args) {
        SpringApplication.run(AnalyticsReportingApplication.class, args);
    }
}
