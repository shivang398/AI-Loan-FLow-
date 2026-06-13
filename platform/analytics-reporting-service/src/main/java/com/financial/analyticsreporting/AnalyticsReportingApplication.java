package com.financial.analyticsreporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = {"com.financial.analytics","com.financial.reporting","com.financial.analyticsreporting","com.financial.common"})
@EntityScan(basePackages = {"com.financial.analytics.entity","com.financial.reporting.entity"})
@EnableJpaRepositories(basePackages = {"com.financial.analytics.repository","com.financial.reporting.repository"})
public class AnalyticsReportingApplication {
    public static void main(String[] args) { SpringApplication.run(AnalyticsReportingApplication.class, args); }
}
