package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.AuthRequest;
import com.prashant.apna.bazar.payload.response.AuthResponse;
import com.prashant.apna.bazar.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class LoginController {

  @Autowired
  UserService userService;

  // login user
  @PostMapping("/login")
  ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
    AuthResponse response = userService.login(request);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}
