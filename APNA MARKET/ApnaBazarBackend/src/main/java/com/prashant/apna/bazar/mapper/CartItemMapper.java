package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.CartItem;
import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.payload.request.CartItemDto;
import com.prashant.apna.bazar.payload.response.CartItemResponse;
import com.prashant.apna.bazar.repositories.ProductRepo;

@Component
public class CartItemMapper {

  @Autowired
  private ProductRepo productRepo;

  // dto to entity
  public CartItem toEntityCartItem(CartItemDto cartItemDto) {
    CartItem entityCartItem = new CartItem();
    // Set Product
    Product product = productRepo.findById(cartItemDto.getProductId())
        .orElseThrow(() -> new RuntimeException("Product Not Found"));
    entityCartItem.setProduct(product);
    BeanUtils.copyProperties(cartItemDto, entityCartItem);
    return entityCartItem;
  }

  // map entity to ResponseDto
  public CartItemResponse toCartItemResponse(CartItem cartItemEntity) {
    CartItemResponse response = new CartItemResponse();
    BeanUtils.copyProperties(cartItemEntity, response);
    return response;
  }

}
