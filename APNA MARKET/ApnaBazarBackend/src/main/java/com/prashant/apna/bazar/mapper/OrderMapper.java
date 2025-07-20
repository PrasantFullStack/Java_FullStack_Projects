package com.prashant.apna.bazar.mapper;

import org.springframework.beans.BeanUtils;

import com.prashant.apna.bazar.entities.Order;
import com.prashant.apna.bazar.payload.request.OrderDto;

public class OrderMapper {
  // Dto to Entity
  public Order toEntityOrder(OrderDto orderDto) {
    Order order = new Order();
    BeanUtils.copyProperties(orderDto, order);
    return order;
  }

}
