package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "video_feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoFeedback {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "video_id", nullable = false)
  @JsonIgnore
  private Video video;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "client_id", nullable = false)
  @JsonIgnore
  private Client client;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String comment;

  @Column(nullable = false)
  private LocalDateTime timestamp;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    LocalDateTime now = LocalDateTime.now();
    if (this.timestamp == null) {
      this.timestamp = now;
    }
    if (this.createdAt == null) {
      this.createdAt = now;
    }
  }
}
