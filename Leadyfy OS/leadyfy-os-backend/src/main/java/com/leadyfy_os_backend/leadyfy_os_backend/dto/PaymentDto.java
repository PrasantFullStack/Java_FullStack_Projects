package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Payment;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {
  private Long id;
  private Long clientId;
  private Long orderId;
  private BigDecimal invoiceAmount;
  private BigDecimal amountReceived;
  private BigDecimal pendingBalance;
  private LocalDate paymentDate;
  private String paymentMethod;
  private String transactionReference;
  private String notes;
  private PaymentStatus status;

  public static PaymentDto fromEntity(Payment payment) {
    if (payment == null)
      return null;
    return PaymentDto.builder()
        .id(payment.getId())
        .clientId(payment.getClient() != null ? payment.getClient().getId() : null)
        .orderId(payment.getOrder() != null ? payment.getOrder().getId() : null)
        .invoiceAmount(payment.getInvoiceAmount())
        .amountReceived(payment.getAmountReceived())
        .pendingBalance(payment.getPendingBalance())
        .paymentDate(payment.getPaymentDate())
        .paymentMethod(payment.getPaymentMethod())
        .transactionReference(payment.getTransactionReference())
        .notes(payment.getNotes())
        .status(payment.getStatus())
        .build();
  }
}
