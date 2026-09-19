package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "creators")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Creator {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String gender;

  @Column(name = "age_group")
  private String ageGroup;

  @Column(columnDefinition = "TEXT")
  private String languages;

  private String location;

  @Column(columnDefinition = "TEXT")
  private String niches;

  private String contact;

  @Column(precision = 10, scale = 2)
  private BigDecimal rate;

  @Column(name = "portfolio_link")
  private String portfolioLink;

  @Column(nullable = false)
  private Boolean availability = true;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Script> scripts = new ArrayList<>();

  @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Shoot> shoots = new ArrayList<>();

  @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<Video> videos = new ArrayList<>();

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
