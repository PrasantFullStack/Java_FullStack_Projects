package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.models.SignupDTO;
import com.prashant.apna.bazar.responseDto.SignupResponseDto;
import com.prashant.apna.bazar.services.SignUpService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/user")
public class SignupControlller {

  @Autowired
  private SignUpService signUpService;

  // create user
  @PostMapping
  ResponseEntity<SignupResponseDto> signup(@RequestBody SignupDTO signupDTO) {
    SignupResponseDto signupResponseDto = signUpService.signup(signupDTO);
    return ResponseEntity.ok(signupResponseDto);
  }

  // get user by id
  @GetMapping("/{userId}")
  ResponseEntity<SignupResponseDto> getUserById(@PathVariable Long userId) {
    SignupResponseDto user = signUpService.getUserById(userId);
    return ResponseEntity.ok(user);
  }

  // Get All Users
  @GetMapping
  ResponseEntity<List<SignupResponseDto>> getAllUsers() {
    List<SignupResponseDto> allUsers = signUpService.getAllUsers();
    return ResponseEntity.ok(allUsers);
  }

  // Delete User
  @DeleteMapping("/{userId}")
  ResponseEntity<Void> deleteUserById(@PathVariable Long userId) throws IOException {
    signUpService.deleteUser(userId);
    return ResponseEntity.noContent().build();
  }
}
