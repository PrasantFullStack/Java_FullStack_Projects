package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Order;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.OrderStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.OrderRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;

  public OrderServiceImpl(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @Override
  public Order create(Order entity) {
    return orderRepository.save(entity);
  }

  @Override
  public Optional<Order> findById(Long id) {
    return orderRepository.findById(id);
  }

  @Override
  public List<Order> findAll() {
    return orderRepository.findAll();
  }

  @Override
  public Order update(Long id, Order entity) {
    Order existing = orderRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));

    existing.setClient(entity.getClient());
    existing.setPackageName(entity.getPackageName());
    existing.setContractedVideoCount(entity.getContractedVideoCount());
    existing.setPricing(entity.getPricing());
    existing.setGst(entity.getGst());
    existing.setTotalInvoiceAmount(entity.getTotalInvoiceAmount());
    existing.setAmountReceived(entity.getAmountReceived());
    existing.setOutstandingBalance(entity.getOutstandingBalance());
    existing.setStartDate(entity.getStartDate());
    existing.setDueDate(entity.getDueDate());
    existing.setStatus(entity.getStatus());

    return orderRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    orderRepository.deleteById(id);
  }

  @Override
  public List<Order> findByClientId(Long clientId) {
    return orderRepository.findByClientId(clientId);
  }

  @Override
  public List<Order> findByStatus(OrderStatus status) {
    return orderRepository.findByStatus(status);
  }
}
