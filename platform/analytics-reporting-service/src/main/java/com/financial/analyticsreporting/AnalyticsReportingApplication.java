package com.financial.analyticsreporting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.financial.analytics","com.financial.reporting","com.financial.analyticsreporting","com.financial.common"})
@EntityScan(basePackages = {"com.financial.analytics.entity","com.financial.reporting.entity"})
@EnableJpaRepositories(basePackages = {"com.financial.analytics.repository","com.financial.reporting.repository"})
public class AnalyticsReportingApplication {
    public static void main(String[] args) { SpringApplication.run(AnalyticsReportingApplication.class, args); }
}
