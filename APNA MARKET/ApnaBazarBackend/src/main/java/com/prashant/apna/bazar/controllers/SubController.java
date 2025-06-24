package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.prashant.apna.bazar.payload.request.SubcategoryDto;
import com.prashant.apna.bazar.payload.response.SubResponseDto;
import com.prashant.apna.bazar.services.SubService;

@RestController
@RequestMapping("/subcategory")
public class SubController {

  @Autowired
  private SubService subService;
  @Autowired
  private ObjectMapper mapper;

  // create subcategory

  @PostMapping
  ResponseEntity<SubResponseDto> createSubcategory(@RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    SubcategoryDto mainDto = mapper.readValue(jsonData, SubcategoryDto.class);
    return ResponseEntity.status(HttpStatus.CREATED).body(subService.createSubcategory(mainDto, file));

  }

  // Get All Subcategory
  @GetMapping
  ResponseEntity<List<SubResponseDto>> getAllSubcategories() {
    return ResponseEntity.status(HttpStatus.OK).body(subService.getAllSubcategories());
  }

  // Subcategory get by id
  @GetMapping("/{id}")
  ResponseEntity<SubResponseDto> getSubcategoryById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(subService.getSubcategoryById(id));
  }

  // update Subcategory method
  @PutMapping("/{id}")
  ResponseEntity<SubResponseDto> updateSubcategory(@PathVariable Long id, @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    SubcategoryDto subDto = mapper.readValue(jsonData, SubcategoryDto.class);
    return ResponseEntity.status(HttpStatus.OK).body(subService.updateSubcategory(id, subDto, file));
  }

  // Subcategory Delete
  @DeleteMapping("/{id}")
  ResponseEntity<Map<String, String>> deleteSubcategory(@PathVariable Long id, String picId) throws IOException {
    subService.deleteSubcategory(id, picId);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Subcategory deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}
