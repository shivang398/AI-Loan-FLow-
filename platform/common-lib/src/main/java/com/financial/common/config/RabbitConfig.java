package com.financial.common.config;

import org.jspecify.annotations.NonNull;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tools.jackson.databind.json.JsonMapper;

@Configuration
public class RabbitConfig {

    @Bean
    @NonNull
    public JacksonJsonMessageConverter jsonMessageConverter() {
        // In Spring Boot 4 / Jackson 3, we use JsonMapper
        JsonMapper jsonMapper = JsonMapper.builder()
                .findAndAddModules()
                .build();
        return new JacksonJsonMessageConverter(jsonMapper);
    }

    @Bean
    @NonNull
    public RabbitTemplate rabbitTemplate(@NonNull ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
