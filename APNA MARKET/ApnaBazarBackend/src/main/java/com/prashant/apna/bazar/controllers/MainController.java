package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.apna.bazar.payload.request.MaincategoryDto;
import com.prashant.apna.bazar.payload.response.MainResponseDto;
import com.prashant.apna.bazar.services.MainService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
    RequestMethod.DELETE })
@RestController
@RequestMapping("/maincategory")

public class MainController {

  @Autowired
  private MainService mainService;

  @Autowired
  private ObjectMapper mapper;

  // create maincategory
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<MainResponseDto> createMaincategory(@Valid @RequestPart("data") String jsonData,
      @RequestPart(value = "pic", required = false) MultipartFile file) throws IOException {
    // Convert Json String to MaincategoryDto, Java Object
    MaincategoryDto mainDto = mapper.readValue(jsonData, MaincategoryDto.class);
    MainResponseDto response = mainService.createMaincategory(mainDto, file);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);

  }

  // Get All Maincategories
  @GetMapping
  public ResponseEntity<List<MainResponseDto>> getAllMaincategories() {
    return ResponseEntity.status(HttpStatus.OK).body(mainService.getAllMaincategories());
  }

  // Get Maincategory by ID
  @GetMapping("/{id}")
  public ResponseEntity<MainResponseDto> getMaincategoryById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(mainService.getMaincategory(id));
  }

  // Update Maincategory by Id
  @PutMapping("/{id}")
  public ResponseEntity<MainResponseDto> updateMaincategory(@PathVariable Long id,
      @Valid @RequestPart("data") String jsonData, @RequestPart(value = "pic", required = false) MultipartFile file)
      throws IOException {
    // Convert Json String to MaincategoryDto, Java Object
    MaincategoryDto mainDto = mapper.readValue(jsonData, MaincategoryDto.class);
    return ResponseEntity.status(HttpStatus.OK).body(mainService.updateMaincategory(id, mainDto, file));

  }

  // Delete Maincategory By Id
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteMancategory(@PathVariable Long id) throws IOException {

    mainService.deleteMaincategory(id);

    Map<String, String> response = new HashMap<>();
    response.put("message", "Maincategory deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}
