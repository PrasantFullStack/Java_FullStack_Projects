package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ClientStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDto {
  private Long id;
  private String clientName;
  private String companyName;
  private String email;
  private String phone;
  private String whatsapp;
  private String brandName;
  private String industry;
  private String gstTaxId;
  private String source;
  private ClientStatus status;
  private LocalDateTime createdAt;

  public static ClientDto fromEntity(Client client) {
    if (client == null)
      return null;
    return ClientDto.builder()
        .id(client.getId())
        .clientName(client.getClientName())
        .companyName(client.getCompanyName())
        .email(client.getEmail())
        .phone(client.getPhone())
        .whatsapp(client.getWhatsapp())
        .brandName(client.getBrandName())
        .industry(client.getIndustry())
        .gstTaxId(client.getGstTaxId())
        .source(client.getSource())
        .status(client.getStatus())
        .createdAt(client.getCreatedAt())
        .build();
  }
}
