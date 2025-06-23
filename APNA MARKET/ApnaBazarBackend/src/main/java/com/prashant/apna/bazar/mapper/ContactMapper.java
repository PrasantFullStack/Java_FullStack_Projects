package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Contactus;
import com.prashant.apna.bazar.payload.request.ContactDto;
import com.prashant.apna.bazar.payload.response.ContactResDto;

@Component
public class ContactMapper {
  // Dto to entity
  public Contactus toEntity(ContactDto dto) {
    Contactus entity = new Contactus();
    entity.setName(dto.getName());
    entity.setEmail(dto.getEmail());
    entity.setPhone(dto.getPhone());
    entity.setSubject(dto.getSubject());
    entity.setMessage(dto.getMessage());
    return entity;
  }

  // Entity to Response
  public ContactResDto toResponse(Contactus entity) {
    ContactResDto response = new ContactResDto();
    response.setId(entity.getId());
    response.setName(entity.getName());
    response.setEmail(entity.getEmail());
    response.setMessage(entity.getMessage());
    response.setSubject(entity.getSubject());
    return response;
  }

}
