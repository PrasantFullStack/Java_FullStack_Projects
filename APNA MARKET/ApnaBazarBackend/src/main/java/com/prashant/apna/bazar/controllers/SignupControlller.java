package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.models.SignupDTO;
import com.prashant.apna.bazar.responseDto.SignupResponseDto;
import com.prashant.apna.bazar.services.SignUpService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/user")
public class SignupControlller {

  @Autowired
  private SignUpService signUpService;

  // create user
  @PostMapping
  ResponseEntity<SignupResponseDto> signup(@RequestBody SignupDTO signupDTO) {
    SignupResponseDto signupResponseDto = signUpService.signup(signupDTO);
    return ResponseEntity.ok(signupResponseDto);
  }

}
