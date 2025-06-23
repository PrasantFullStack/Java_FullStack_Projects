package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Brand;
import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;

@Component
public class BrandMapper {
  // Dto to entity
  public Brand toEntity(BrandDto dto) {
    Brand entity = new Brand();
    entity.setName(dto.getName());
    entity.setPic(dto.getPic());
    entity.setActive(dto.isActive());
    return entity;
  }

  // Entity to response
  public BrandResponse toResponse(Brand entity) {
    BrandResponse response = new BrandResponse();
    response.setId(entity.getId());
    response.setName(entity.getName());
    response.setPic(entity.getPic());
    response.setActive(entity.isActive());
    return response;
  }
}
