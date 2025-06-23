package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;

@Component
public class ProfileMapper {
  // Dto to entity
  public User toEntity(ProfileDTO dto) {
    User entity = new User();
    entity.setName(dto.getName());
    entity.setUsername(dto.getUsername());
    entity.setEmail(dto.getEmail());
    entity.setPassword(dto.getPassword());
    entity.setPhone(dto.getPhone());
    entity.setPic(dto.getPic());
    entity.setPin(dto.getPin());
    entity.setRole(dto.getRole());
    entity.setCity(dto.getCity());
    entity.setState(dto.getState());
    entity.setActive(dto.isActive());
    return entity;
  }

  // Entity to response
  public ProfileResponseDto toResponse(User entity) {
    ProfileResponseDto response = new ProfileResponseDto();
    response.setUserid(entity.getUserid());
    response.setName(entity.getName());
    response.setUsername(entity.getUsername());
    response.setEmail(entity.getEmail());
    response.setPassword(entity.getPassword());
    response.setPhone(entity.getPhone());
    response.setAddress(entity.getAddress());
    response.setCity(entity.getCity());
    response.setPin(entity.getPin());
    response.setPic(entity.getPic());
    response.setState(entity.getState());
    response.setRole(entity.getRole());
    response.setActive(entity.isActive());
    return response;
  }
}
