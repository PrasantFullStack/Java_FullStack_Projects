package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.CartItemDto;
import com.prashant.apna.bazar.payload.response.CartItemResponse;
import com.prashant.apna.bazar.services.CartService;
import com.prashant.apna.bazar.services.CheckoutService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Autowired
  private CheckoutService checkoutService;

  @Autowired
  private CartService cartService;

  // add to cart
  @PostMapping
  ResponseEntity<CartItemResponse> addCartItem(@RequestBody @Valid CartItemDto cartItemDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addCart(cartItemDto));
  }

  // update cart
  @PutMapping("/{id}")
  ResponseEntity<CartItemResponse> updateCartItem(@RequestBody CartItemDto cartItemDto) {
    return ResponseEntity.status(HttpStatus.OK).body(cartService.updateCart(cartItemDto));

  }

  // delete cart
  @DeleteMapping("/{id}")
  ResponseEntity<?> deleteCart(@PathVariable Long id) {
    cartService.deleteCart(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
