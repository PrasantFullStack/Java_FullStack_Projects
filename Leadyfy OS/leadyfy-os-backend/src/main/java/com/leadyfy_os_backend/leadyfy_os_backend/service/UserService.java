package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;

import java.util.Optional;

public interface UserService extends CrudService<User, Long> {
  Optional<User> findByEmail(String email);
}
