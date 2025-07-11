package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.mapper.ProductMapper;
import com.prashant.apna.bazar.payload.request.ProductDTO;
import com.prashant.apna.bazar.payload.response.ProductResponseDto;
import com.prashant.apna.bazar.repositories.ProductRepo;

@Service
public class ProductService {

  @Autowired
  private ProductRepo productRepo;

  @Autowired
  private CloudinaryService cloudinaryService;

  @Autowired
  private ProductMapper productMapper;

  public ProductResponseDto createProduct(ProductDTO productDTO, MultipartFile[] files) throws IOException {
    // step:1
    List<Map<String, String>> imgUrls = cloudinaryService.uploadMultipleImages(files, "apna-bazar/products");

    // step: 2
    List<String> imageUrl = imgUrls.stream().map(img -> img.get("secure_url")).collect(Collectors.toList());

    List<String> publicIds = imgUrls.stream().map(img -> img.get("public_id")).collect(Collectors.toList());
    // step 3
    productDTO.setPic(imageUrl);
    productDTO.setPublicId(publicIds);

    // Convert DTO to entity
    Product product = productMapper.toProductEntity(productDTO);

    // save to database
    Product saveProduct = productRepo.save(product);

    return productMapper.toResponseProduct(saveProduct);

  }

  // Get All Product
  public List<ProductResponseDto> getAllProduct() {
    return productRepo.findAll().stream().map(productMapper::toResponseProduct).collect(Collectors.toList());

  }

}
