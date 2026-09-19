package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Script;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
  List<Script> findByClientId(Long clientId);

  List<Script> findByOrderId(Long orderId);

  List<Script> findByStatus(ScriptStatus status);
}
