package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.OrderDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Order;
import com.leadyfy_os_backend.leadyfy_os_backend.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @GetMapping
  public List<OrderDto> getAllOrders() {
    return orderService.findAll().stream().map(OrderDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
    Order order = orderService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    return ResponseEntity.ok(OrderDto.fromEntity(order));
  }

  @PostMapping
  public ResponseEntity<OrderDto> createOrder(@RequestBody Order order) {
    Order saved = orderService.create(order);
    return ResponseEntity.status(HttpStatus.CREATED).body(OrderDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<OrderDto> updateOrder(@PathVariable Long id, @RequestBody Order order) {
    Order updated = orderService.update(id, order);
    return ResponseEntity.ok(OrderDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
    orderService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
