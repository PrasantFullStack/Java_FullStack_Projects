package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Shoot;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ShootStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.ShootRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ShootService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShootServiceImpl implements ShootService {

  private final ShootRepository shootRepository;

  public ShootServiceImpl(ShootRepository shootRepository) {
    this.shootRepository = shootRepository;
  }

  @Override
  public Shoot create(Shoot entity) {
    return shootRepository.save(entity);
  }

  @Override
  public Optional<Shoot> findById(Long id) {
    return shootRepository.findById(id);
  }

  @Override
  public List<Shoot> findAll() {
    return shootRepository.findAll();
  }

  @Override
  public Shoot update(Long id, Shoot entity) {
    Shoot existing = shootRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Shoot not found with id: " + id));

    existing.setClient(entity.getClient());
    existing.setOrder(entity.getOrder());
    existing.setCreator(entity.getCreator());
    existing.setShootDateTime(entity.getShootDateTime());
    existing.setLocation(entity.getLocation());
    existing.setShootManager(entity.getShootManager());
    existing.setSpecialNotes(entity.getSpecialNotes());
    existing.setStatus(entity.getStatus());

    return shootRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    shootRepository.deleteById(id);
  }

  @Override
  public List<Shoot> findByClientId(Long clientId) {
    return shootRepository.findByClientId(clientId);
  }

  @Override
  public List<Shoot> findByOrderId(Long orderId) {
    return shootRepository.findByOrderId(orderId);
  }

  @Override
  public List<Shoot> findByStatus(ShootStatus status) {
    return shootRepository.findByStatus(status);
  }
}
