package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.apna.bazar.payload.request.TestimonialDto;
import com.prashant.apna.bazar.payload.response.TestimonialResponse;
import com.prashant.apna.bazar.services.TestimonialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/testimonial")
public class TestimonialController {

  @Autowired
  private TestimonialService testimonialService;

  @Autowired
  private ObjectMapper mapper;

  // create Testimonial
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ResponseEntity<TestimonialResponse> createTestimonial(@RequestPart("data") @Valid String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    TestimonialDto testDto = mapper.readValue(jsonData, TestimonialDto.class);
    return ResponseEntity.status(HttpStatus.OK).body(testimonialService.createTestmonial(testDto, file));
  }

  // Get By Id
  @GetMapping("/{id}")
  ResponseEntity<TestimonialResponse> getTestmonial(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(testimonialService.getTestimonialById(id));
  }

  // GetAll Testimonials
  @GetMapping
  ResponseEntity<List<TestimonialResponse>> getAllTestimonial() {
    return ResponseEntity.status(HttpStatus.OK).body(testimonialService.getAllTestimonial());
  }
}
