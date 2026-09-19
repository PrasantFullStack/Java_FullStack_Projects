package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Order;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByClientId(Long clientId);

  List<Order> findByStatus(OrderStatus status);
}
