package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;

import com.prashant.apna.bazar.entities.CartItem;
import com.prashant.apna.bazar.payload.request.CartItemDto;
import com.prashant.apna.bazar.payload.response.CartItemResponse;

public class CartItemMapper {
  // dto to entity
  public CartItem toEntityCartItem(CartItemDto cartItemDto) {
    CartItem entityCartItem = new CartItem();
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
