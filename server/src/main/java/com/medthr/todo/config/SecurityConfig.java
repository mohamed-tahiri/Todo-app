package com.medthr.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()           // désactive CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // autorise toutes les requêtes
                )
                .formLogin().disable()       // désactive le login form
                .httpBasic().disable();      // désactive HTTP Basic

        return http.build();
    }
}
