package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Creator;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.CreatorRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.CreatorService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreatorServiceImpl implements CreatorService {

  private final CreatorRepository creatorRepository;

  public CreatorServiceImpl(CreatorRepository creatorRepository) {
    this.creatorRepository = creatorRepository;
  }

  @Override
  public Creator create(Creator entity) {
    return creatorRepository.save(entity);
  }

  @Override
  public Optional<Creator> findById(Long id) {
    return creatorRepository.findById(id);
  }

  @Override
  public List<Creator> findAll() {
    return creatorRepository.findAll();
  }

  @Override
  public Creator update(Long id, Creator entity) {
    Creator existing = creatorRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Creator not found with id: " + id));

    existing.setName(entity.getName());
    existing.setGender(entity.getGender());
    existing.setAgeGroup(entity.getAgeGroup());
    existing.setLanguages(entity.getLanguages());
    existing.setLocation(entity.getLocation());
    existing.setNiches(entity.getNiches());
    existing.setContact(entity.getContact());
    existing.setRate(entity.getRate());
    existing.setPortfolioLink(entity.getPortfolioLink());
    existing.setAvailability(entity.getAvailability());

    return creatorRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    creatorRepository.deleteById(id);
  }

  @Override
  public List<Creator> findAvailableCreators() {
    return creatorRepository.findByAvailabilityTrue();
  }

  @Override
  public List<Creator> findByNameContaining(String name) {
    return creatorRepository.findByNameContainingIgnoreCase(name);
  }
}
