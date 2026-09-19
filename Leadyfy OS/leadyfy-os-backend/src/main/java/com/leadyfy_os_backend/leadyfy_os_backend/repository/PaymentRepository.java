package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Payment;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
  List<Payment> findByClientId(Long clientId);

  List<Payment> findByOrderId(Long orderId);

  List<Payment> findByStatus(PaymentStatus status);
}
