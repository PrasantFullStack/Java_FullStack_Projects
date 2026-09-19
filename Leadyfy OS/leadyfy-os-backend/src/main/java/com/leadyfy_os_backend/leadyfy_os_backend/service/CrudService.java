package com.leadyfy_os_backend.leadyfy_os_backend.service;

import java.util.List;
import java.util.Optional;

public interface CrudService<T, ID> {
  T create(T entity);

  Optional<T> findById(ID id);

  List<T> findAll();

  T update(ID id, T entity);

  void deleteById(ID id);
}
