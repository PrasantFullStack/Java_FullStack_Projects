package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Notification;

import java.util.List;

public interface NotificationService extends CrudService<Notification, Long> {
  List<Notification> findByUserId(Long userId);

  List<Notification> findUnreadByUserId(Long userId);

  long countUnreadByUserId(Long userId);
}
