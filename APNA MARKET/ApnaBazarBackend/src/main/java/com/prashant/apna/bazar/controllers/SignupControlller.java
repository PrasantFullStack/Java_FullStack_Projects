package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.List;
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

import org.springframework.web.bind.annotation.RequestMethod;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
    RequestMethod.DELETE })
@RestController
@RequestMapping("/user")
public class SignupControlller {

  @Autowired
  private UserService userService;

  // Jackson ObjectMapper for JSON conversion
  @Autowired
  private ObjectMapper mapper;

  // create user
  @PostMapping("/signup")
  ResponseEntity<SignupResponseDto> signup(@RequestBody @Valid SignupDTO signupDTO) {
    SignupResponseDto savedUser = userService.signup(signupDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
  }

  // get user by id
  @GetMapping("/{userid}")
  ResponseEntity<ProfileResponseDto> getUserById(@PathVariable Long userid) {
    return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userid));
  }

  // Get All Users
  @GetMapping
  public ResponseEntity<List<ProfileResponseDto>> getAllUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
  }

  // Update User Profile
  @PutMapping("/{userid}")
  ResponseEntity<ProfileResponseDto> updateUserProfile(@PathVariable Long userid, @RequestPart("data") String jsonData,
      @RequestPart(value = "pic", required = false) MultipartFile file) throws IOException {
    // Convert JSON data to ProfileDTO
    ProfileDTO profileDTO = mapper.readValue(jsonData, ProfileDTO.class);
    // Update user with profile data and file
    ProfileResponseDto updatedUser = userService.updateUser(userid, profileDTO, file);

    // Return updated user profile
    return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
  }

}
