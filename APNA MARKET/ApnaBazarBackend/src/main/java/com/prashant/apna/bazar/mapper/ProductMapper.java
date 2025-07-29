package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.payload.request.ProductDTO;
import com.prashant.apna.bazar.payload.response.ProductResponseDto;

@Component
public class ProductMapper {

  // productDto to product entity
  public Product toProductEntity(ProductDTO productDTO) {
    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);
    return product;
  }

  // Map Product Entity to ResponseDto
  public ProductResponseDto toResponseProduct(Product savedProduct) {
    ProductResponseDto response = new ProductResponseDto();
    BeanUtils.copyProperties(savedProduct, response);
    return response;
  }
}
