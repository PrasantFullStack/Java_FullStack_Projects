package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Maincategory;
import com.prashant.apna.bazar.payload.request.MaincategoryDto;
import com.prashant.apna.bazar.payload.response.MainResponseDto;

@Component
public class MaincategoryMapper {
  // Dto to Entity
  public Maincategory toEntity(MaincategoryDto mainDto) {
    Maincategory entity = new Maincategory();
    BeanUtils.copyProperties(mainDto, entity);
    // entity.setName(mainDto.getName());
    // entity.setPic(mainDto.getPic());
    // entity.setActive(mainDto.isActive());
    return entity;
  }

  // Entity to Response
  public MainResponseDto mapToResponse(Maincategory entity) {
    MainResponseDto response = new MainResponseDto();
    BeanUtils.copyProperties(entity, response);
    // response.setId(entity.getId());
    // response.setName(entity.getName());
    // response.setPic(entity.getPic());
    // response.setActive(entity.isActive());
    return response;
  }

  // Update existing entity from DTO
  public void updateEntityFromDto(MaincategoryDto dto, Maincategory entity) {
    if (dto.getName() != null) {
      entity.setName(dto.getName());
    }
    if (dto.getPic() != null)
      entity.setPic(dto.getPic());

    entity.setActive(dto.isActive());
  }

}
