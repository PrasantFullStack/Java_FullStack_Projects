package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;
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

  // create Testimonial
  public TestimonialResponse createTestmonial(TestimonialDto testDto, MultipartFile file) throws IOException {
    if (file != null && !file.isEmpty()) {
      Map<String, String> imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/testimonials");
      testDto.setPic(imageUrl.get("secure_url"));
      testDto.setPublicId(imageUrl.get("public_id"));
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

  // Update Testimonial
  public TestimonialResponse updateTestimonial(Long id, TestimonialDto dto, MultipartFile file) throws IOException {
    // 1.fetch existing testimonial
    Testimonial existTestimonial = testimonialRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

    // Handle image update
    if (file != null && !file.isEmpty()) {

      // Delete old image from Cloudinary public_id
      String oldPublicId = existTestimonial.getPublicId();
      if (oldPublicId != null && !oldPublicId.isBlank()) {
        cloudinaryService.deleteImage(oldPublicId); // delete from Cloudinary
      }

      // Upload new image and get secure_url + public_id
      Map<String, String> uploadResult = cloudinaryService.updateImageWithPublicId(
          file, "apna-bazar/testimonials", oldPublicId);
      dto.setPic(uploadResult.get("secure_url"));
      dto.setPublicId(uploadResult.get("public_id"));
    } else {
      // If no new image provided, keep existing
      dto.setPic(existTestimonial.getPic());
      dto.setPublicId(existTestimonial.getPublicId());
    }
    dto.setActive(dto.isActive());
    dto.setName(dto.getName());
    dto.setPic(dto.getPic());
    testimonialMappar.toEntity(dto);

    // Save updated testimonial
    Testimonial updated = testimonialRepo.save(existTestimonial);

    // Return response
    return testimonialMappar.toResponse(updated);
  }

  // Delete Testimonial by id
  public void deleteTestimonail(Long id, String publicId) {
    testimonialRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id :" + id));
    testimonialRepo.deleteById(id);
    // Delete image from Cloudinary if publicId is provided
    if (publicId != null && !publicId.isBlank()) {
      try {
        cloudinaryService.deleteImage(publicId);
      } catch (IOException e) {
        throw new RuntimeException("Failed to delete image from Cloudinary: " + e.getMessage(), e);
      }
    }
  }
}
