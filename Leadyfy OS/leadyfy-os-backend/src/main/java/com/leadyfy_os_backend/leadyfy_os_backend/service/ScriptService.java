package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Script;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;

import java.util.List;

public interface ScriptService extends CrudService<Script, Long> {
  List<Script> findByClientId(Long clientId);

  List<Script> findByOrderId(Long orderId);

  List<Script> findByStatus(ScriptStatus status);
}
