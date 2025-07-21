package com.prashant.apna.bazar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.apna.bazar.entities.Order;
import com.prashant.apna.bazar.mapper.OrderMapper;
import com.prashant.apna.bazar.payload.request.OrderDto;
import com.prashant.apna.bazar.payload.response.OrderResponse;
import com.prashant.apna.bazar.repositories.OrderRepo;
import com.prashant.apna.bazar.repositories.ProductRepo;

@Service
public class CheckoutService {

  @Autowired
  private OrderRepo orderRepo;

  @Autowired
  private ProductRepo productRepo;

  @Autowired
  private OrderMapper mapper;

  // save the order to cart

  public OrderResponse placeOrder(OrderDto orderDto) {
    // map dto to entity
    Order order = mapper.toEntityOrder(orderDto);
    // save order
    Order savedOreder = orderRepo.save(order);

    return mapper.toResponseOrder(savedOreder);

  }

}
