package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.apna.bazar.payload.request.BrandDto;
import com.prashant.apna.bazar.payload.response.BrandResponse;
import com.prashant.apna.bazar.services.BrandService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/brand")
public class BrandController {

  @Autowired
  private BrandService brandService;

  @Autowired
  private ObjectMapper mapper;

  // post brand
  @PostMapping
  ResponseEntity<BrandResponse> createBrand(@Valid @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    BrandDto brandDto = mapper.readValue(jsonData, BrandDto.class);
    return ResponseEntity.status(HttpStatus.CREATED).body(brandService.createBrand(brandDto, file));

  }

  // Get All Brands
  @GetMapping
  ResponseEntity<List<BrandResponse>> getAllBrands() {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllBrands());
  }

  // Brand get by id
  @GetMapping("/{id}")
  ResponseEntity<BrandResponse> getBrand(@PathVariable UUID id) {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.getBrandById(id));
  }

  // Put mapping method
  @PutMapping("/{id}")
  ResponseEntity<BrandResponse> updateBrand(@PathVariable UUID id, @Valid @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file)
      throws IOException {
    BrandDto brandDto = mapper.readValue(jsonData, BrandDto.class);
    return ResponseEntity.status(HttpStatus.OK).body(brandService.updateBrand(id, brandDto, file));
  }

  // brand delete by id
  @DeleteMapping("/{id}")
  ResponseEntity<Map<String, String>> deleteBrand(@PathVariable UUID id) throws IOException {
    brandService.deleteBrand(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Brand deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}
