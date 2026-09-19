package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.leadyfy_os_backend.leadyfy_os_backend.enums.VideoStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "script_id")
  private Script script;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "creator_id")
  private Creator creator;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "shoot_id")
  private Shoot shoot;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assigned_editor_id")
  private User assignedEditor;

  @Column
  private LocalDate deadline;

  @Column(name = "video_file_link")
  private String videoFileLink;

  private String thumbnail;

  @Column(name = "revision_count")
  private Integer revisionCount = 0;

  @Column(name = "final_delivery_link")
  private String finalDeliveryLink;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private VideoStatus status;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonIgnore
  @ToString.Exclude
  private List<VideoFeedback> feedbacks = new ArrayList<>();

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
