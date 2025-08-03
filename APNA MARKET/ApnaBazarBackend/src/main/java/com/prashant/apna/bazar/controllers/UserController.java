package com.prashant.apna.bazar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.UserDto;
import com.prashant.apna.bazar.payload.response.UserResponse;
import com.prashant.apna.bazar.services.UsersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UsersService usersService;

  // define create user endpoint
  @PostMapping
  ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserDto userDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(usersService.createUser(userDto));
  }

  // update user endpoint
  @PutMapping("/{userid}")
  ResponseEntity<UserResponse> updateUser(@PathVariable Long userid, @RequestBody @Valid UserDto userDto) {
    return ResponseEntity.status(HttpStatus.OK).body(usersService.updateUser(userid, userDto));
  }

  // get user by id endpoint
  @GetMapping("/{userid}")
  ResponseEntity<UserResponse> getUserById(@PathVariable Long userid) {
    return ResponseEntity.status(HttpStatus.OK).body(usersService.getUserById(userid));
  }

  // get all users endpoint
  @GetMapping
  ResponseEntity<List<UserResponse>> getAllUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(usersService.getAllUsers());
  }

  // delete user endpoint
  @DeleteMapping("/{userid}")
  ResponseEntity<?> deleteUser(@PathVariable Long userid) {
    usersService.deleteUser(userid);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
