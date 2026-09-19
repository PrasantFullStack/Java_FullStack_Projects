package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Notification;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.NotificationRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.NotificationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

  private final NotificationRepository notificationRepository;

  public NotificationServiceImpl(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  @Override
  public Notification create(Notification entity) {
    return notificationRepository.save(entity);
  }

  @Override
  public Optional<Notification> findById(Long id) {
    return notificationRepository.findById(id);
  }

  @Override
  public List<Notification> findAll() {
    return notificationRepository.findAll();
  }

  @Override
  public Notification update(Long id, Notification entity) {
    Notification existing = notificationRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Notification not found with id: " + id));

    existing.setUser(entity.getUser());
    existing.setMessage(entity.getMessage());
    existing.setType(entity.getType());
    existing.setRead(entity.isRead());

    return notificationRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    notificationRepository.deleteById(id);
  }

  @Override
  public List<Notification> findByUserId(Long userId) {
    return notificationRepository.findByUserId(userId);
  }

  @Override
  public List<Notification> findUnreadByUserId(Long userId) {
    return notificationRepository.findByUserIdAndReadFalse(userId);
  }

  @Override
  public long countUnreadByUserId(Long userId) {
    return notificationRepository.countByUserIdAndReadFalse(userId);
  }
}
