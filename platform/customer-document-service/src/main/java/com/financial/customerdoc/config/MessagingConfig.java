package com.financial.customerdoc.config;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String exchange;

    // Declare platform.exchange on every startup so POST /customers never hits
    // "NOT_FOUND - no exchange" regardless of which service started first.
    @Bean
    public ApplicationRunner declareExchange(ConnectionFactory connectionFactory) {
        return (ApplicationArguments args) -> {
            RabbitAdmin admin = new RabbitAdmin(connectionFactory);
            admin.declareExchange(new TopicExchange(exchange, true, false));
        };
    }
}
