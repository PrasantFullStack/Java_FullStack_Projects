package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Testimonial;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.TestimonialMappar;
import com.prashant.apna.bazar.payload.request.TestimonialDto;
import com.prashant.apna.bazar.payload.response.TestimonialResponse;
import com.prashant.apna.bazar.repositories.TestimonialRepo;

@Service
public class TestimonialService {

  @Autowired
  private TestimonialRepo testimonialRepo;

  @Autowired
  private CloudinaryService cloudinaryService;

  @Autowired
  private TestimonialMappar testimonialMappar;

  public TestimonialResponse createTestmonial(TestimonialDto testDto, MultipartFile file) throws IOException {
    if (file != null && !file.isEmpty()) {
      String imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/brands");
      testDto.setPic(imageUrl);
    }

    // create object
    Testimonial testimonial = testimonialMappar.toEntity(testDto);

    // save entity
    Testimonial savedTestimonial = testimonialRepo.save(testimonial);

    // map to entiy Response Dto
    return testimonialMappar.toResponse(savedTestimonial);

  }

  // Get by id
  public TestimonialResponse getTestimonialById(Long id) {
    Testimonial existTestimonial = testimonialRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Testmonial not found with id:" + id));
    return testimonialMappar.toResponse(existTestimonial);
  }

  // GetAll Testimonials
  public List<TestimonialResponse> getAllTestimonial() {
    return testimonialRepo.findAll().stream().map(testimonialMappar::toResponse).collect(Collectors.toList());
  }

  // Delete Testimonial by id
  public void deleteTestimonail(Long id) {
    testimonialRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id :" + id));
    testimonialRepo.deleteById(id);

  }
}
