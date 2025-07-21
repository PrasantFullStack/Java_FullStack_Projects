package com.prashant.apna.bazar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.CartItem;
import com.prashant.apna.bazar.mapper.CartItemMapper;
import com.prashant.apna.bazar.payload.request.CartItemDto;
import com.prashant.apna.bazar.payload.response.CartItemResponse;
import com.prashant.apna.bazar.repositories.CartItemRepo;
import com.prashant.apna.bazar.repositories.ProductRepo;

@Service
public class CartService {

  @Autowired
  private CartItemRepo cartItemRepo;

  @Autowired
  private CartItemMapper cartItemMapper;

  @Autowired
  private ProductRepo productRepo;

  public CartItemResponse addCart(CartItemDto cartItemDto) {
    // map dto to entity
    CartItem cartItem = cartItemMapper.toEntityCartItem(cartItemDto);
    // save entity
    CartItem savedCartItem = cartItemRepo.save(cartItem);
    // return response
    return cartItemMapper.toCartItemResponse(savedCartItem);
  }

}
