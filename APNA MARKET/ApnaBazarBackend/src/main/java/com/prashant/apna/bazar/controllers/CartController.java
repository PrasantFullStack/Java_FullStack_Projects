package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.payload.request.CartItemDto;
import com.prashant.apna.bazar.payload.response.CartItemResponse;
import com.prashant.apna.bazar.services.CheckoutService;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Autowired
  private CheckoutService checkoutService;

  @PostMapping
  ResponseEntity<CartItemResponse> addCartItem(@RequestBody CartItemDto cartItemDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(checkoutService.addCart(cartItemDto));
  }

}
