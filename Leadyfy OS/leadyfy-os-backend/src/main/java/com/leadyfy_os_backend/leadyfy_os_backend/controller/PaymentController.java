package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.PaymentDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Payment;
import com.leadyfy_os_backend.leadyfy_os_backend.service.PaymentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

  private final PaymentService paymentService;

  public PaymentController(PaymentService paymentService) {
    this.paymentService = paymentService;
  }

  @GetMapping
  public List<PaymentDto> getAllPayments() {
    return paymentService.findAll().stream().map(PaymentDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<PaymentDto> getPaymentById(@PathVariable Long id) {
    Payment payment = paymentService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + id));
    return ResponseEntity.ok(PaymentDto.fromEntity(payment));
  }

  @PostMapping
  public ResponseEntity<PaymentDto> createPayment(@RequestBody Payment payment) {
    Payment saved = paymentService.create(payment);
    return ResponseEntity.status(HttpStatus.CREATED).body(PaymentDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PaymentDto> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
    Payment updated = paymentService.update(id, payment);
    return ResponseEntity.ok(PaymentDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
    paymentService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
