package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.LoginRequest;
import com.leadyfy_os_backend.leadyfy_os_backend.dto.LoginResponse;
import com.leadyfy_os_backend.leadyfy_os_backend.dto.RegisterRequest;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.UserRole;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.UserRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtils jwtUtils;

  public AuthenticationController(AuthenticationManager authenticationManager,
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtUtils jwtUtils) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtils = jwtUtils;
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + request.getEmail()));

    String token = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

    return ResponseEntity.ok(LoginResponse.builder()
        .token(token)
        .type("Bearer")
        .userId(user.getId())
        .email(user.getEmail())
        .role(user.getRole().name())
        .build());
  }

  @PostMapping("/register")
  public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new IllegalArgumentException("Email already in use: " + request.getEmail());
    }

    UserRole role = UserRole.valueOf(request.getRole().toUpperCase(Locale.ROOT));

    User user = User.builder()
        .name(request.getName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(role)
        .active(true)
        .build();

    User savedUser = userRepository.save(user);

    String token = jwtUtils.generateToken(
        new org.springframework.security.core.userdetails.User(
            savedUser.getEmail(),
            savedUser.getPassword(),
            java.util.List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority(
                "ROLE_" + savedUser.getRole().name()))));

    return ResponseEntity.status(HttpStatus.CREATED).body(LoginResponse.builder()
        .token(token)
        .type("Bearer")
        .userId(savedUser.getId())
        .email(savedUser.getEmail())
        .role(savedUser.getRole().name())
        .build());
  }
}
