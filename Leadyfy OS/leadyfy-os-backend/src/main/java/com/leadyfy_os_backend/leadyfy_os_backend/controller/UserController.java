package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.UserDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;
import com.leadyfy_os_backend.leadyfy_os_backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public List<UserDto> getAllUsers() {
    return userService.findAll().stream().map(UserDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
    User user = userService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    return ResponseEntity.ok(UserDto.fromEntity(user));
  }

  @PostMapping
  public ResponseEntity<UserDto> createUser(@RequestBody User user) {
    User saved = userService.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(UserDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody User user) {
    User updated = userService.update(id, user);
    return ResponseEntity.ok(UserDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
