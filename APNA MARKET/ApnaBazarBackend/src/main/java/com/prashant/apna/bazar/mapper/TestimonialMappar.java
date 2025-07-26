package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;
import com.prashant.apna.bazar.entities.Testimonial;
import com.prashant.apna.bazar.payload.request.TestimonialDto;
import com.prashant.apna.bazar.payload.response.TestimonialResponse;

@Component
public class TestimonialMappar {
  // Dto to entity
  public Testimonial toEntity(TestimonialDto testDto) {
    Testimonial entity = new Testimonial();
    BeanUtils.copyProperties(testDto, entity); // Same as fields in DTO and Entity
    // entity.setName(testDto.getName());
    // entity.setMessage(testDto.getMessage());
    // entity.setPic(testDto.getPic());
    // entity.setActive(testDto.isActive());
    return entity;
  }

  // Entity to Response
  public TestimonialResponse toResponse(Testimonial entity) {
    TestimonialResponse response = new TestimonialResponse();
    response.setId(entity.getId());
    response.setName(entity.getName());
    response.setMessage(entity.getMessage());
    response.setPublicId(entity.getPublicId());
    response.setPic(entity.getPic());
    response.setActive(entity.isActive());
    return response;
  }

}
