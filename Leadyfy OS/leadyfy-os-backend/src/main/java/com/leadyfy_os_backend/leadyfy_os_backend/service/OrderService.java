package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Order;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.OrderStatus;

import java.util.List;

public interface OrderService extends CrudService<Order, Long> {
  List<Order> findByClientId(Long clientId);

  List<Order> findByStatus(OrderStatus status);
}
