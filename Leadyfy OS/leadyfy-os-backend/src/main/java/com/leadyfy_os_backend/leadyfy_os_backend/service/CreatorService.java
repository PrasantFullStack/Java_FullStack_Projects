package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Creator;

import java.util.List;

public interface CreatorService extends CrudService<Creator, Long> {
  List<Creator> findAvailableCreators();

  List<Creator> findByNameContaining(String name);
}
