package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Subcategory;
import com.prashant.apna.bazar.payload.request.SubcategoryDto;
import com.prashant.apna.bazar.payload.response.SubResponseDto;

@Component
public class SubcategoryMapper {
  // Dto to entity
  public Subcategory toEntity(SubcategoryDto subcategoryDto) {
    Subcategory entity = new Subcategory();
    entity.setName(subcategoryDto.getName());
    entity.setPic(subcategoryDto.getPic());
    entity.setActive(subcategoryDto.isActive());

    return entity;
  }

  // Entity to Response
  public SubResponseDto toResponse(Subcategory entity) {
    SubResponseDto response = new SubResponseDto();
    response.setId(entity.getId());
    response.setName(entity.getName());
    response.setPic(entity.getPic());
    response.setActive(entity.getActive());
    return response;
  }
}
