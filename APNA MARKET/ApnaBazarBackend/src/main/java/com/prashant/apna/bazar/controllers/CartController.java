package com.prashant.apna.bazar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.apna.bazar.services.CheckoutService;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Autowired
  private CheckoutService checkoutService;

}
