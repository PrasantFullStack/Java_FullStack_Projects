package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Brand;
import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;

@Component
public class BrandMapper {
  // Dto to entity
  public Brand toEntity(BrandDto brandDto) {
    Brand entity = new Brand();
    BeanUtils.copyProperties(brandDto, entity);
    // entity.setName(dto.getName());
    // entity.setPic(dto.getPic());
    // entity.setActive(dto.isActive());
    return entity;
  }

  // update Dto to entity
  public Brand toUpdateEntity(BrandDto dto, Brand entity) {
    if (dto.getName() != null) {
      entity.setName(dto.getName());
    }
    if (dto.getPic() != null) {
      entity.setPic(dto.getPic());
    }
    if (dto.getPublicId() != null) {
      entity.setPublicId(dto.getPublicId());
    }
    entity.setActive(dto.isActive());
    // BeanUtils.copyProperties(dto, entity);
    return entity;
  }

  // Entity to response
  public BrandResponse toResponse(Brand entity) {
    BrandResponse response = new BrandResponse();
    BeanUtils.copyProperties(entity, response);
    // response.setId(entity.getId());
    // response.setName(entity.getName());
    // response.setPic(entity.getPic());
    // response.setActive(entity.isActive());
    return response;
  }
}
