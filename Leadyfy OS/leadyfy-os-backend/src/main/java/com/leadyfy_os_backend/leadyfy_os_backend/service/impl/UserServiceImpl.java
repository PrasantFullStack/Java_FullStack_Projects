package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.UserRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public User create(User entity) {
    return userRepository.save(entity);
  }

  @Override
  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public User update(Long id, User entity) {
    User existing = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

    existing.setName(entity.getName());
    existing.setEmail(entity.getEmail());
    existing.setPassword(entity.getPassword());
    existing.setRole(entity.getRole());
    existing.setActive(entity.isActive());

    return userRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    userRepository.deleteById(id);
  }

  @Override
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }
}
