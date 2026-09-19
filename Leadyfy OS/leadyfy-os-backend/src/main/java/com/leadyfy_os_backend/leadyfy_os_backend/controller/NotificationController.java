package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.NotificationDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Notification;
import com.leadyfy_os_backend.leadyfy_os_backend.service.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  private final NotificationService notificationService;

  public NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  @GetMapping
  public List<NotificationDto> getAllNotifications() {
    return notificationService.findAll().stream().map(NotificationDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<NotificationDto> getNotificationById(@PathVariable Long id) {
    Notification notification = notificationService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + id));
    return ResponseEntity.ok(NotificationDto.fromEntity(notification));
  }

  @PostMapping
  public ResponseEntity<NotificationDto> createNotification(@RequestBody Notification notification) {
    Notification saved = notificationService.create(notification);
    return ResponseEntity.status(HttpStatus.CREATED).body(NotificationDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<NotificationDto> updateNotification(@PathVariable Long id,
      @RequestBody Notification notification) {
    Notification updated = notificationService.update(id, notification);
    return ResponseEntity.ok(NotificationDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
    notificationService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
