package com.prashant.apna.bazar.controllers;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.apna.bazar.payload.request.ProductDTO;
import com.prashant.apna.bazar.payload.response.ProductResponseDto;
import com.prashant.apna.bazar.services.ProductService;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private ObjectMapper mapper;

    // Create Product Test (Multipart + JSON)
    @Test
    void testCreateProduct() throws Exception {

        ProductDTO dto = new ProductDTO();
        ProductResponseDto response = new ProductResponseDto();

        String productJson = "{\"name\":\"Mobile\"}";

        MockMultipartFile jsonPart = new MockMultipartFile(
                "product",
                "",
                "application/json",
                productJson.getBytes());

        MockMultipartFile filePart = new MockMultipartFile(
                "files",
                "img.jpg",
                "image/jpeg",
                "dummy".getBytes());

        when(mapper.readValue(anyString(), eq(ProductDTO.class)))
                .thenReturn(dto);

        when(productService.createProduct(any(), any()))
                .thenReturn(response);

        mockMvc.perform(multipart("/product")
                .file(jsonPart)
                .file(filePart)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated());
    }

    // Get All Products

    @Test
    void testGetAllProducts() throws Exception {

        when(productService.getAllProduct())
                .thenReturn(List.of(new ProductResponseDto()));

        mockMvc.perform(get("/product"))
                .andExpect(status().isOk());
    }

    // Get Product By ID
    @Test
    void testGetProductById() throws Exception {

        ProductResponseDto dto = new ProductResponseDto();

        when(productService.getProductById(1L))
                .thenReturn(dto);

        mockMvc.perform(get("/product/1"))
                .andExpect(status().isOk());
    }

    // Update Product (Multipart + JSON)
    @Test
    void testUpdateProduct() throws Exception {

        ProductResponseDto response = new ProductResponseDto();

        // JSON part for productDTO
        MockMultipartFile jsonPart = new MockMultipartFile(
                "product",
                "",
                "application/json",
                "{\"name\":\"Laptop\"}".getBytes());

        MockMultipartFile filePart = new MockMultipartFile(
                "files",
                "file.jpg",
                "image/jpeg",
                "dummy".getBytes());

        when(productService.updateProduct(anyLong(), any(), any()))
                .thenReturn(response);

        mockMvc.perform(
                multipart("/product/1")
                        .file(jsonPart)
                        .file(filePart)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        }))
                .andExpect(status().isOk());
    }

    // Delete Product

    @Test
    void testDeleteProduct() throws Exception {

        doNothing().when(productService).deleteProduct(1L);

        mockMvc.perform(delete("/product/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Product Deleted Successfully"));
    }
}