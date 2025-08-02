package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.payload.request.UserDto;
import com.prashant.apna.bazar.payload.response.UserResponse;

@Component
public class UserMapper {

  public User toEntity(UserDto userDto) {
    User user = new User();
    BeanUtils.copyProperties(userDto, user);
    return user;
  }

  // Converts User entity to Response DTO
  public UserResponse toResponseDto(User savedUser) {
    UserResponse userResponse = new UserResponse();
    BeanUtils.copyProperties(savedUser, userResponse);
    return userResponse;

  }
}
