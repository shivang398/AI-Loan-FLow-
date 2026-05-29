package com.financial.connector.config;

import com.financial.common.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers
                .contentTypeOptions(ct -> {})
                .frameOptions(fo -> fo.deny())
                .referrerPolicy(rp -> rp.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/**").hasAuthority("ADMIN")
                // CONNECTOR can read their own profile
                .requestMatchers(HttpMethod.GET, "/connectors/me").hasAnyAuthority("CONNECTOR", "ADMIN")
                // ADMIN and PARTNER_MANAGER own all partner management operations
                .requestMatchers(HttpMethod.GET,  "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN", "RM", "TEAM_LEADER")
                .requestMatchers(HttpMethod.POST, "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.PUT,  "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                // FOIR endpoints open to authenticated users
                .requestMatchers("/foir/**").authenticated()
                .anyRequest().hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
