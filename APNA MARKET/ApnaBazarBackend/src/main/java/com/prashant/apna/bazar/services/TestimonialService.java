package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Testimonial;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.payload.request.TestimonialDto;
import com.prashant.apna.bazar.payload.response.TestimonialResponse;
import com.prashant.apna.bazar.repositories.TestimonialRepo;

@Service
public class TestimonialService {

  @Autowired
  private TestimonialRepo testimonialRepo;

  @Autowired
  private CloudinaryService cloudinaryService;

  public TestimonialResponse createTestmonial(TestimonialDto testDto, MultipartFile file) throws IOException {
    if (file != null && file.isEmpty()) {
      String imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/brands");
      testDto.setPic(imageUrl);
    }

    // create object
    Testimonial testimonial = new Testimonial();
    // Convert Dto to entity
    BeanUtils.copyProperties(testDto, testimonial);

    // save entity
    Testimonial savedTestimonial = testimonialRepo.save(testimonial);

    // map to entiy Response Dto
    return mapToResponse(savedTestimonial);

  }

  // Helper Method for convert entity to Resposne
  private TestimonialResponse mapToResponse(Testimonial savedTestimonial) {
    TestimonialResponse response = new TestimonialResponse();

    BeanUtils.copyProperties(savedTestimonial, response);
    return response;
  }

  // Get by id
  public TestimonialResponse getTestimonialById(Long id) {
    Testimonial existTestimonial = testimonialRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Testmonial not found with id:" + id));
    return mapToResponse(existTestimonial);
  }

  // GetAll Testimonials
  public List<TestimonialResponse> getAllTestimonial() {
    return testimonialRepo.findAll().stream().map(this::mapToResponse).toList();
  }
}
