package com.leadyfy_os_backend.leadyfy_os_backend.entity;

import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scripts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Script {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @Column(name = "video_number", nullable = false)
  private Integer videoNumber;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "writer_id")
  private User writer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "creator_id")
  private Creator creator;

  @Column(nullable = false)
  private String language;

  @Column(name = "script_text", columnDefinition = "TEXT", nullable = false)
  private String scriptText;

  @Column(name = "reference_links", columnDefinition = "TEXT")
  private String referenceLinks;

  @Column
  private LocalDate deadline;

  @Column(name = "revision_count")
  private Integer revisionCount = 0;

  @Column(columnDefinition = "TEXT")
  private String comments;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ScriptStatus status;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @OneToMany(mappedBy = "script", cascade = CascadeType.ALL, orphanRemoval = true)
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
