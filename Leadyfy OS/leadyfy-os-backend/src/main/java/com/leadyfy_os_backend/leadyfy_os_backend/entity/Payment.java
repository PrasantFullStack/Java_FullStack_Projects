package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.leadyfy_os_backend.leadyfy_os_backend.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "client_id", nullable = false)
  @JsonIgnore
  private Client client;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = false)
  @JsonIgnore
  private Order order;

  @Column(name = "invoice_amount", nullable = false, precision = 10, scale = 2)
  private BigDecimal invoiceAmount;

  @Column(name = "amount_received", nullable = false, precision = 10, scale = 2)
  private BigDecimal amountReceived;

  @Column(name = "pending_balance", nullable = false, precision = 10, scale = 2)
  private BigDecimal pendingBalance;

  @Column(name = "payment_date")
  private LocalDate paymentDate;

  @Column(name = "payment_method")
  private String paymentMethod;

  @Column(name = "transaction_reference")
  private String transactionReference;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private PaymentStatus status;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    if (this.createdAt == null) {
      this.createdAt = LocalDateTime.now();
    }
  }
}
