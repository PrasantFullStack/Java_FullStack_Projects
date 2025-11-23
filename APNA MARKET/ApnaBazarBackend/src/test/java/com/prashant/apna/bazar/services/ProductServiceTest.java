package com.prashant.apna.bazar.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.ProductMapper;
import com.prashant.apna.bazar.payload.request.ProductDTO;
import com.prashant.apna.bazar.payload.response.ProductResponseDto;
import com.prashant.apna.bazar.repositories.ProductRepo;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

  @Mock
  private ProductRepo productRepo;

  @Mock
  private CloudinaryService cloudinaryService;

  @Mock
  private ProductMapper productMapper;

  @InjectMocks
  private ProductService productService;

  // Create Product Test
  @Test
  void testCreateProduct() throws Exception {

    MultipartFile file = mock(MultipartFile.class);
    MultipartFile[] files = new MultipartFile[] { file };

    List<Map<String, String>> uploaded = List.of(
        Map.of("secure_url", "http://img.com/1.jpg", "public_id", "img_1"));

    when(cloudinaryService.uploadMultipleImages(any(), anyString()))
        .thenReturn(uploaded);

    ProductDTO productDTO = new ProductDTO();

    Product product = new Product();
    when(productMapper.toProductEntity(any())).thenReturn(product);

    Product savedProduct = new Product();
    when(productRepo.save(any())).thenReturn(savedProduct);

    ProductResponseDto response = new ProductResponseDto();
    when(productMapper.toResponseProduct(any())).thenReturn(response);

    ProductResponseDto result = productService.createProduct(productDTO, files);

    assertNotNull(result);
    verify(cloudinaryService).uploadMultipleImages(any(), anyString());
    verify(productRepo).save(any());
  }

  // getAllProduct Test
  @Test
  void testGetAllProducts() {

    Product p = new Product();
    when(productRepo.findAll()).thenReturn(List.of(p));

    ProductResponseDto resp = new ProductResponseDto();
    when(productMapper.toResponseProduct(any())).thenReturn(resp);

    List<ProductResponseDto> result = productService.getAllProduct();

    assertEquals(1, result.size());
    verify(productRepo).findAll();
  }

  // getProductById Test
  @Test
  void testGetProductById() {

    Product p = new Product();
    when(productRepo.findById(1L)).thenReturn(Optional.of(p));

    ProductResponseDto resp = new ProductResponseDto();
    when(productMapper.toResponseProduct(any())).thenReturn(resp);

    ProductResponseDto result = productService.getProductById(1L);

    assertNotNull(result);
  }

  @Test
  void testGetProductById_NotFound() {
    when(productRepo.findById(1L)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class,
        () -> productService.getProductById(1L));
  }

  // updateProduct Test
  @Test
  void testUpdateProduct() throws Exception {

    MultipartFile file = mock(MultipartFile.class);
    MultipartFile[] files = new MultipartFile[] { file };

    Product existing = new Product();
    existing.setPublicId(List.of("old_1"));
    when(productRepo.findById(1L)).thenReturn(Optional.of(existing));

    List<Map<String, String>> updatedImages = List.of(
        Map.of("secure_url", "http://new.jpg", "public_id", "new_1"));

    when(cloudinaryService.updateImage(any(), anyList(), anyString()))
        .thenReturn(updatedImages);

    ProductDTO dto = new ProductDTO();
    Product product = new Product();

    when(productMapper.toProductEntity(any())).thenReturn(product);
    when(productRepo.save(any())).thenReturn(product);

    ProductResponseDto resp = new ProductResponseDto();
    when(productMapper.toResponseProduct(any())).thenReturn(resp);

    ProductResponseDto result = productService.updateProduct(1L, dto, files);

    assertNotNull(result);
    verify(productRepo).save(any());
  }

  // deleteProduct Test
  @Test
  void testDeleteProduct() throws Exception {

    Product p = new Product();
    p.setPic(List.of("img_1"));

    when(productRepo.findById(1L)).thenReturn(Optional.of(p));

    doNothing().when(cloudinaryService).deleteImage(anyString());
    doNothing().when(productRepo).deleteById(1L);

    productService.deleteProduct(1L);

    verify(cloudinaryService).deleteImage(anyString());
    verify(productRepo).deleteById(1L);
  }

  @Test
  void testDeleteProduct_NotFound() {
    when(productRepo.findById(1L)).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class,
        () -> productService.deleteProduct(1L));
  }
}
