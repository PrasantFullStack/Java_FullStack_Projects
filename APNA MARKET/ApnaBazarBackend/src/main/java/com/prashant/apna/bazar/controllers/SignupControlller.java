package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.request.SignupDTO;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;
import com.prashant.apna.bazar.payload.response.SignupResponseDto;
import com.prashant.apna.bazar.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/user")
public class SignupControlller {

  @Autowired
  private UserService signUpService;

  // Jackson ObjectMapper for JSON conversion
  @Autowired
  private ObjectMapper mapper;

  // create user
  @PostMapping("/signup")
  ResponseEntity<SignupResponseDto> signup(@RequestBody @Valid SignupDTO signupDTO) {
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

  // Update User Profile
  @PutMapping("/{userId}")
  ResponseEntity<ProfileResponseDto> updateUserProfile(@PathVariable Long userId, @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    // Convert JSON data to ProfileDTO
    ProfileDTO profileDTO = mapper.readValue(jsonData, ProfileDTO.class);
    // Update user with profile data and file
    ProfileResponseDto updatedUser = signUpService.updateUser(userId, profileDTO, file);

    // Return updated user profile
    return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
  }

  // Delete User
  @DeleteMapping("/{userId}")
  ResponseEntity<Map<String, String>> deleteUserById(@PathVariable Long userId) throws IOException {
    signUpService.deleteUser(userId);
    Map<String, String> response = new HashMap<>();
    response.put("message", "user deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
