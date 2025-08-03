package com.prashant.apna.bazar.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.mapper.UserMapper;
import com.prashant.apna.bazar.payload.request.UserDto;
import com.prashant.apna.bazar.payload.response.UserResponse;
import com.prashant.apna.bazar.repositories.UserRepo;

@Service
public class UsersService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private UserMapper userMapper;

  // create a method to handle user-related operations
  public UserResponse createUser(UserDto userDto) {
    // Convert UserDto to User entity
    User user = userMapper.toEntity(userDto);

    // Save the user entity to the database
    User savedUser = userRepo.save(user);

    // Convert the saved User entity to UserResponse DTO
    UserResponse userResponse = userMapper.toResponseDto(savedUser);
    return userResponse;
  }

  // get user by id
  public UserResponse getUserById(Long userId) {
    User user = userRepo.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    return userMapper.toResponseDto(user);
  }

  // Get All Users
  public List<UserResponse> getAllUsers() {
    List<User> users = userRepo.findAll();
    return users.stream()
        .map(userMapper::toResponseDto)
        .collect(Collectors.toList());
  }
}
