package com.financial.loan.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                // A08: reject unknown properties — prevents mass-assignment attacks
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                // A08: never trust polymorphic type info from the wire
                .deactivateDefaultTyping();
    }
}
