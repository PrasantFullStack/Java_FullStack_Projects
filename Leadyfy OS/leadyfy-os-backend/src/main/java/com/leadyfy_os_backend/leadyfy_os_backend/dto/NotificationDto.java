package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Notification;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.NotificationType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {
  private Long id;
  private Long userId;
  private String message;
  private NotificationType type;
  private boolean read;
  private LocalDateTime createdAt;

  public static NotificationDto fromEntity(Notification notification) {
    if (notification == null)
      return null;
    return NotificationDto.builder()
        .id(notification.getId())
        .userId(notification.getUser() != null ? notification.getUser().getId() : null)
        .message(notification.getMessage())
        .type(notification.getType())
        .read(notification.isRead())
        .createdAt(notification.getCreatedAt())
        .build();
  }
}
