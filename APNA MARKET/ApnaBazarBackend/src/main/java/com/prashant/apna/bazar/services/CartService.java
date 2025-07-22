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

  // addCart method
  public CartItemResponse addCart(CartItemDto cartItemDto) {
    // map dto to entity
    CartItem cartItem = cartItemMapper.toEntityCartItem(cartItemDto);
    // save entity
    CartItem savedCartItem = cartItemRepo.save(cartItem);
    // return response
    return cartItemMapper.toCartItemResponse(savedCartItem);
  }

  // update cart
  public CartItemResponse updateCart(CartItemDto cartItemDto) {
    CartItem item = cartItemRepo.findById(cartItemDto.getId())
        .orElseThrow(() -> new RuntimeException("Cart Item Not Found"));
    item.setQty(cartItemDto.getQty());
    item.setTotal(cartItemDto.getQty() * cartItemDto.getPrice());
    CartItem savedCartItem = cartItemRepo.save(item);

    return cartItemMapper.toCartItemResponse(savedCartItem);

  }

  // Delete cart
  public void deleteCart(Long id) {
    cartItemRepo.deleteById(id);
  }

}
