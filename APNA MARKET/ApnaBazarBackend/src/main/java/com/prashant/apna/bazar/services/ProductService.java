package com.prashant.apna.bazar.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
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
    if (files == null || files.length == 0) {
      throw new IllegalArgumentException("At least one product image is required.");
    }

    // step:1
    List<Map<String, String>> imgUrls = cloudinaryService.uploadMultipleImages(files, "apna-bazar/products");
    if (imgUrls.isEmpty()) {
      throw new IOException("No images were uploaded successfully.");
    }

    // step: 2
    List<String> imageUrls = imgUrls.stream().map(img -> img.get("secure_url")).collect(Collectors.toList());

    List<String> publicIds = imgUrls.stream().map(img -> img.get("public_id")).collect(Collectors.toList());
    // step 3 update dto
    productDTO.setPic(imageUrls);
    productDTO.setPublicId(publicIds);

    // step:4 Convert DTO to entity and Save to entity
    Product product = productMapper.toProductEntity(productDTO);
    Product savedProduct = productRepo.save(product);

    // step: 5 convert entity to response dto and return
    return productMapper.toResponseProduct(savedProduct);

  }

  // Get All Product
  public List<ProductResponseDto> getAllProduct() {
    return productRepo.findAll().stream().map(productMapper::toResponseProduct).collect(Collectors.toList());

  }

  // update product logic
  public ProductResponseDto updateProduct(Long id, ProductDTO productDTO, MultipartFile[] files) throws IOException {
    if (files == null || files.length == 0)
      throw new IllegalArgumentException("At least one product image is required.");
    Product existProduct = productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not by id"));
    // Delete and re-upload
    List<String> oldPublicIds = existProduct.getPublicId(); // assume stored
    List<Map<String, String>> newImageData = cloudinaryService.updateImage(
        files, oldPublicIds, "apna-bazar/products");

    List<String> imageUrls = newImageData.stream()
        .map(img -> img.get("secure_url"))
        .collect(Collectors.toList());

    List<String> publicIds = newImageData.stream()
        .map(img -> img.get("public_id"))
        .collect(Collectors.toList());

    productDTO.setPic(imageUrls);
    productDTO.setPublicId(publicIds);

    Product product = productMapper.toProductEntity(productDTO);
    Product savedProduct = productRepo.save(product);

    return productMapper.toResponseProduct(savedProduct);

  }

  // Get product by id
  public ProductResponseDto getProductById(Long id) {
    Product existproduct = productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found by id"));
    return productMapper.toResponseProduct(existproduct);
  }

  // delete product by id logic in service class
  public void deleteProduct(Long id) throws IOException {
    Product existproduct = productRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found by id"));
    if (existproduct.getPic() != null) {
      cloudinaryService.deleteImage("public_id");
    }
    productRepo.deleteById(id);
  }

}
