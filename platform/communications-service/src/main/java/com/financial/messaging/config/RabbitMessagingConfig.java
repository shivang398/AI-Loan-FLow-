package com.financial.messaging.config;

import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMessagingConfig {

    @Value("${app.rabbitmq.exchange:platform.exchange}")
    private String platformExchangeName;

    @Bean
    public TopicExchange platformExchange() {
        return new TopicExchange(platformExchangeName, true, false);
    }

    public static final String EXCHANGE = "messaging.exchange";
    public static final String QUEUE = "whatsapp.send.queue";
    public static final String ROUTING_KEY = "whatsapp.send";
    public static final String WEBHOOK_QUEUE = "whatsapp.webhook.queue";

    @Bean
    public DirectExchange messagingExchange() {
        return new DirectExchange(EXCHANGE);
    }

    @Bean
    public Queue whatsappQueue() {
        return QueueBuilder.durable(QUEUE)
                .withArgument("x-dead-letter-exchange", EXCHANGE + ".dlx")
                .build();
    }

    @Bean
    public Binding binding(Queue whatsappQueue, DirectExchange messagingExchange) {
        return BindingBuilder.bind(whatsappQueue).to(messagingExchange).with(ROUTING_KEY);
    }

    @Bean
    public Queue whatsappWebhookQueue() {
        return QueueBuilder.durable(WEBHOOK_QUEUE).build();
    }
}
