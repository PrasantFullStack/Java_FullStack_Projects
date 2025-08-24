package com.prashant.apna.bazar.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import com.prashant.apna.bazar.payload.request.ProductDTO;
import com.prashant.apna.bazar.payload.response.ProductResponseDto;
import com.prashant.apna.bazar.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  @Autowired
  ObjectMapper mapper;

  // Create Product
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ResponseEntity<ProductResponseDto> createProduct(@RequestPart("product") @Valid String jsonData,
      @RequestPart(value = "files", required = false) MultipartFile[] files) throws IOException {
    ProductDTO productDTO = mapper.readValue(jsonData, ProductDTO.class);
    return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productDTO, files));
  }

  // Get All Product
  @GetMapping
  ResponseEntity<List<ProductResponseDto>> getAlProduct() {
    return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProduct());
  }

  // update product
  @PutMapping("/{id}")
  ResponseEntity<ProductResponseDto> updateProduct(@PathVariable Long id,
      @RequestPart("product") @Valid ProductDTO productDTO,
      @RequestPart(value = "files", required = false) MultipartFile[] files) throws IOException {
    return ResponseEntity.status(HttpStatus.OK).body(productService.updateProduct(id, productDTO, files));

  }

  // Get product by id
  @GetMapping("/{id}")
  ResponseEntity<ProductResponseDto> getProduct(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(id));
  }

  // delete product by id
  @DeleteMapping("/{id}")
  ResponseEntity<String> deleteProduct(@PathVariable Long id) throws IOException {
    productService.deleteProduct(id);
    return ResponseEntity.status(HttpStatus.OK).body("Product Deleted Successfully");
  }

}
