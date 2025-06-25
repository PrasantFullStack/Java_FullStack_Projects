package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.AuthRequest;
import com.prashant.apna.bazar.payload.response.AuthResponse;
import com.prashant.apna.bazar.security.JwtUtils;

@RestController
@RequestMapping("/user")
public class LoginController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtils jwtaUtils;

  // login user
  @PostMapping("/login")
  ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String token = jwtaUtils.generateToken(userDetails);

    AuthResponse response = new AuthResponse();
    response.setToken(token);
    response.setUsername(userDetails.getUsername());

    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}
