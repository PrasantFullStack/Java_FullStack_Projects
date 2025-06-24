package com.prashant.apna.bazar.mapper;

import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Testimonial;
import com.prashant.apna.bazar.payload.request.TestimonialDto;
import com.prashant.apna.bazar.payload.response.TestimonialResponse;

@Component
public class TestimonialMappar {
  // Dto to entity
  public Testimonial toEntity(TestimonialDto testDto) {
    Testimonial entity = new Testimonial();
    entity.setName(testDto.getName());
    entity.setMessage(testDto.getMessage());
    entity.setPicPublicId(testDto.getPicPublicId());
    entity.setPic(testDto.getPic());
    entity.setActive(testDto.isActive());
    return entity;
  }

  // Entity to Response
  public TestimonialResponse toResponse(Testimonial entity) {
    TestimonialResponse response = new TestimonialResponse();
    response.setId(entity.getId());
    response.setName(entity.getName());
    response.setMessage(entity.getMessage());
    response.setPicPublicId(entity.getPicPublicId());
    response.setPic(entity.getPic());
    response.setActive(entity.isActive());
    return response;
  }
}
