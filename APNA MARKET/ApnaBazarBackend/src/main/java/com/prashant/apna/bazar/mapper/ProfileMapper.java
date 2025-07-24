package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;

@Component
public class ProfileMapper {

  // Dto to Entity (creates a new User object)
  public User toEntity(ProfileDTO dto) {
    User entity = new User();
    entity.setName(dto.getName());
    entity.setUsername(dto.getUsername());
    entity.setEmail(dto.getEmail());
    entity.setPhone(dto.getPhone());
    entity.setPic(dto.getPic());
    entity.setPin(dto.getPin());
    entity.setCity(dto.getCity());
    entity.setState(dto.getState());
    entity.setAddress(dto.getAddress());
    entity.setActive(dto.isActive());
    return entity;
  }

  // Update existing user from DTO
  public void updateEntity(User entity, ProfileDTO dto) {
    if (dto.getName() != null)
      entity.setName(dto.getName());
    if (dto.getPhone() != null)
      entity.setPhone(dto.getPhone());
    if (dto.getAddress() != null)
      entity.setAddress(dto.getAddress());
    if (dto.getPin() != null)
      entity.setPin(dto.getPin());
    if (dto.getCity() != null)
      entity.setCity(dto.getCity());
    if (dto.getState() != null)
      entity.setState(dto.getState());
    if (dto.getPic() != null)
      entity.setPic(dto.getPic());
    // Email & Username generally not updated from profile, but if you want:
    if (dto.getEmail() != null)
      entity.setEmail(dto.getEmail());
    if (dto.getUsername() != null)
      entity.setUsername(dto.getUsername());

  }

  // Entity to Response
  public ProfileResponseDto toResponse(User entity) {
    ProfileResponseDto response = new ProfileResponseDto();
    response.setUserid(entity.getUserid());
    response.setName(entity.getName());
    response.setUsername(entity.getUsername());
    response.setEmail(entity.getEmail());
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
