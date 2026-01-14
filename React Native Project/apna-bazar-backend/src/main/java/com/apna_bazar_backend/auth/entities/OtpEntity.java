package com.apna_bazar_backend.auth.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "otp")
public class OtpEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String phoneNumber;

  @Column(nullable = false)
  private String otp;

  @Column(nullable = false)
  private LocalDateTime expiryTime;

  private boolean verified = false;

}
