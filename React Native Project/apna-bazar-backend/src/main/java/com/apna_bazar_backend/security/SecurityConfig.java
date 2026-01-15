package com.apna_bazar_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  @Autowired
  private JwtAuthFilter jwtAutFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors(Customizer.withDefaults()) // Very important
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            // here GET method public : Anyone can fatch data
            .requestMatchers("/user/signup", "/user/login").permitAll()

            // Admin and Super Admin can access these endpoints
            // Protected method only authentication Admin can create data and category
            // .hasAuthority("Admin") => Looks for Admin as-is(jo tumhare DB me stored hai)
            .requestMatchers(HttpMethod.POST, "/user")
            .hasAnyAuthority("Buyer", "Seller")

            // .hasRole("Admin") => Looks for ROLE_Admin
            // .hasAnyRole("Admin", "Buyer", "Seller") => Looks for ROLE_Admin, ROLE_Buyer,
            // ROLE_Seller

            // Protected method only authentication Admin can modify
            .requestMatchers(HttpMethod.PUT, "/user/**")
            .hasAnyAuthority("Seller", "Buyer")

            // .requestMatchers(HttpMethod.PUT, "/user/**",
            // "/maincategory").hasAnyRole("Admin", "Buyer", "Seller")

            // Protected method only authentication Admin can delete
            .requestMatchers(HttpMethod.DELETE, "/user")
            .hasAnyAuthority("Admin", "Super Admin")
            // Buyer only
            .requestMatchers(HttpMethod.POST, "/checkout/**").hasAuthority("Buyer")

            // default rule for everything else
            .anyRequest().authenticated())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAutFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

}
