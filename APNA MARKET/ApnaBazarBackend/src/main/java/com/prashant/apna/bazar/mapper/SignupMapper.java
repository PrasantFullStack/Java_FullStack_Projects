package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.payload.request.SignupDTO;
import com.prashant.apna.bazar.payload.response.SignupResponseDto;

@Component
public class SignupMapper {
  // Dto to entity
  public User toEntity(SignupDTO dto) {
    User entity = new User();
    entity.setName(dto.getName());
    entity.setUsername(dto.getUsername());
    entity.setEmail(dto.getEmail());
    entity.setPassword(dto.getPassword());
    entity.setPhone(dto.getPhone());
    entity.setRole(dto.getRole());
    entity.setActive(dto.isActive());
    return entity;
  }

  // Entity to response
  public SignupResponseDto toResponse(User entity) {
    SignupResponseDto response = new SignupResponseDto();
    response.setUserid(entity.getUserid());
    response.setName(entity.getName());
    response.setUsername(entity.getUsername());
    response.setEmail(entity.getEmail());
    response.setPhone(entity.getPhone());
    response.setRole(entity.getRole());
    response.setActive(entity.isActive());
    return response;
  }

}
