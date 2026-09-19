package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Shoot;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ShootStatus;

import java.util.List;

public interface ShootService extends CrudService<Shoot, Long> {
  List<Shoot> findByClientId(Long clientId);

  List<Shoot> findByOrderId(Long orderId);

  List<Shoot> findByStatus(ShootStatus status);
}
