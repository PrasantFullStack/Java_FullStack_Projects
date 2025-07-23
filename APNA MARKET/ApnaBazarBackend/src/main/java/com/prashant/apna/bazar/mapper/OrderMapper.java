package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import com.prashant.apna.bazar.entities.Order;
import com.prashant.apna.bazar.payload.request.OrderDto;
import com.prashant.apna.bazar.payload.response.OrderResponse;

@Component
public class OrderMapper {
  // Dto to Entity
  public Order toEntityOrder(OrderDto orderDto) {
    Order order = new Order();
    BeanUtils.copyProperties(orderDto, order);
    return order;
  }

  // map entity to response
  public OrderResponse toResponseOrder(Order savedOrder) {
    OrderResponse response = new OrderResponse();
    BeanUtils.copyProperties(savedOrder, response);
    return response;
  }

}
