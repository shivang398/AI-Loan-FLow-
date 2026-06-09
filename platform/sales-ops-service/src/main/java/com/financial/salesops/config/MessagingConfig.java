package com.financial.salesops.config;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    @Bean
    public TopicExchange platformExchange() {
        return new TopicExchange(exchange, true, false);
    }
}
