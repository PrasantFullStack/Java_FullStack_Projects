package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.leadyfy_os_backend.leadyfy_os_backend.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

  @Column(name = "package_name", nullable = false)
  private String packageName;

  @Column(name = "contracted_video_count", nullable = false)
  private Integer contractedVideoCount;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal pricing;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal gst;

  @Column(name = "total_invoice_amount", nullable = false, precision = 10, scale = 2)
  private BigDecimal totalInvoiceAmount;

  @Column(name = "amount_received", nullable = false, precision = 10, scale = 2)
  private BigDecimal amountReceived;

  @Column(name = "outstanding_balance", nullable = false, precision = 10, scale = 2)
  private BigDecimal outstandingBalance;

  @Column(name = "start_date")
  private LocalDate startDate;

  @Column(name = "due_date")
  private LocalDate dueDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private OrderStatus status;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Script> scripts = new ArrayList<>();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Shoot> shoots = new ArrayList<>();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Video> videos = new ArrayList<>();

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Payment> payments = new ArrayList<>();

  @PrePersist
  protected void onCreate() {
    LocalDateTime now = LocalDateTime.now();
    if (this.createdAt == null) {
      this.createdAt = now;
    }
    this.updatedAt = now;
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
