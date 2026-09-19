package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Order;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.OrderStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
  private Long id;
  private Long clientId;
  private String packageName;
  private Integer contractedVideoCount;
  private BigDecimal pricing;
  private BigDecimal gst;
  private BigDecimal totalInvoiceAmount;
  private BigDecimal amountReceived;
  private BigDecimal outstandingBalance;
  private LocalDate startDate;
  private LocalDate dueDate;
  private OrderStatus status;

  public static OrderDto fromEntity(Order order) {
    if (order == null)
      return null;
    return OrderDto.builder()
        .id(order.getId())
        .clientId(order.getClient() != null ? order.getClient().getId() : null)
        .packageName(order.getPackageName())
        .contractedVideoCount(order.getContractedVideoCount())
        .pricing(order.getPricing())
        .gst(order.getGst())
        .totalInvoiceAmount(order.getTotalInvoiceAmount())
        .amountReceived(order.getAmountReceived())
        .outstandingBalance(order.getOutstandingBalance())
        .startDate(order.getStartDate())
        .dueDate(order.getDueDate())
        .status(order.getStatus())
        .build();
  }
}
