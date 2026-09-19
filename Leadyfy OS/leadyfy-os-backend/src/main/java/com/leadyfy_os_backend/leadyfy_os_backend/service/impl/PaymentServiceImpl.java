package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Payment;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.PaymentStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.PaymentRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.PaymentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

  private final PaymentRepository paymentRepository;

  public PaymentServiceImpl(PaymentRepository paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  @Override
  public Payment create(Payment entity) {
    return paymentRepository.save(entity);
  }

  @Override
  public Optional<Payment> findById(Long id) {
    return paymentRepository.findById(id);
  }

  @Override
  public List<Payment> findAll() {
    return paymentRepository.findAll();
  }

  @Override
  public Payment update(Long id, Payment entity) {
    Payment existing = paymentRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + id));

    existing.setClient(entity.getClient());
    existing.setOrder(entity.getOrder());
    existing.setInvoiceAmount(entity.getInvoiceAmount());
    existing.setAmountReceived(entity.getAmountReceived());
    existing.setPendingBalance(entity.getPendingBalance());
    existing.setPaymentDate(entity.getPaymentDate());
    existing.setPaymentMethod(entity.getPaymentMethod());
    existing.setTransactionReference(entity.getTransactionReference());
    existing.setNotes(entity.getNotes());
    existing.setStatus(entity.getStatus());

    return paymentRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    paymentRepository.deleteById(id);
  }

  @Override
  public List<Payment> findByClientId(Long clientId) {
    return paymentRepository.findByClientId(clientId);
  }

  @Override
  public List<Payment> findByOrderId(Long orderId) {
    return paymentRepository.findByOrderId(orderId);
  }

  @Override
  public List<Payment> findByStatus(PaymentStatus status) {
    return paymentRepository.findByStatus(status);
  }
}
