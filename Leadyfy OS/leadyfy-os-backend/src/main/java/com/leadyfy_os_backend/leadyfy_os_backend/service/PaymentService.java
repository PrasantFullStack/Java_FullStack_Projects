package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Payment;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.PaymentStatus;

import java.util.List;

public interface PaymentService extends CrudService<Payment, Long> {
  List<Payment> findByClientId(Long clientId);

  List<Payment> findByOrderId(Long orderId);

  List<Payment> findByStatus(PaymentStatus status);
}
