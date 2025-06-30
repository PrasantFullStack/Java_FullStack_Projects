package com.prashant.apna.bazar.security;

// Removed incorrect import of java.beans.Customizer
import org.springframework.security.config.Customizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
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
            .requestMatchers("/user/signup", "/user/login", " /maincategory").permitAll()
            .requestMatchers(HttpMethod.GET, "/user/
            ", "/maincategory", "/subcategory", "/brand",
                "/product", "/testimonial", "/newsletter")
            .permitAll()
            // Protected method only authentication user can modify
            .requestMatchers(HttpMethod.POST, "/maincategory", "/subcategory", "/brand", "/product", "/testimonial",
                "/newsletter", "/contactus")
            .permitAll()
            // .hasRole("Admin")

            // Protected method only authentication user can modify
            .requestMatchers(HttpMethod.PUT, "/subcategory/**", "/brand/**", "/product/**",
                "/testimonial/**", "/newsletter/**", "/contactus")
            .permitAll()
            // .hasRole("Admin")

            // Protected method only authentication user can modify
            .requestMatchers(HttpMethod.DELETE, " /maincategory/**", "/subcategory/**", "/brand/**", "/product/**",
                "/testimonial/**", "/newsletter/**", "/contactus")
            .hasRole("Admin")
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
