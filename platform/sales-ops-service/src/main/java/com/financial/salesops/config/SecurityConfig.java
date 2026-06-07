package com.financial.salesops.config;

import com.financial.common.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Value("${cors.allowed-origin:http://localhost:3000}")
    private String allowedOrigin;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers
                .contentTypeOptions(ct -> {})
                .frameOptions(fo -> fo.deny())
                .httpStrictTransportSecurity(hsts -> hsts.includeSubDomains(true).maxAgeInSeconds(31_536_000))
                .referrerPolicy(rp -> rp.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                .addHeaderWriter(new StaticHeadersWriter(
                    "Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'"))
                .addHeaderWriter(new StaticHeadersWriter(
                    "Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=()"))
                .addHeaderWriter(new StaticHeadersWriter("X-XSS-Protection", "0"))
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                // A01: internal connector lookup — used by other services, not browsers; no JWT possible
                .requestMatchers(HttpMethod.GET, "/connectors/internal/**").permitAll()
                .requestMatchers("/actuator/**").hasAuthority("ADMIN")
                // A01: CONNECTORs can read their own profile only
                .requestMatchers(HttpMethod.GET, "/connectors/me").hasAnyAuthority("CONNECTOR", "ADMIN")
                // A01: read operations open to internal roles; write ops restricted to PM/ADMIN
                .requestMatchers(HttpMethod.GET,    "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN", "RM", "TEAM_LEADER", "OPERATIONS", "CONNECTOR")
                .requestMatchers(HttpMethod.POST,   "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.PUT,    "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/connectors/**").hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
                .requestMatchers("/foir/**").authenticated()
                .requestMatchers(HttpMethod.GET, "/transactions/connector/**").hasAnyAuthority("CONNECTOR", "PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/transactions/**").hasAnyAuthority("CONNECTOR", "PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/slabs/connector/**").hasAnyAuthority("CONNECTOR", "PARTNER_MANAGER", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/slabs/**").hasAnyAuthority("CONNECTOR", "PARTNER_MANAGER", "ADMIN")
                .anyRequest().hasAnyAuthority("PARTNER_MANAGER", "ADMIN")
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((req, res, e) -> res.sendError(401, "Unauthorized")))
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
