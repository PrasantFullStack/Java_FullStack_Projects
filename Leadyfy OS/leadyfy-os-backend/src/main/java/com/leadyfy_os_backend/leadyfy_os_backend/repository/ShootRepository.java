package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Shoot;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ShootStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShootRepository extends JpaRepository<Shoot, Long> {
    List<Shoot> findByClientId(Long clientId);
    List<Shoot> findByOrderId(Long orderId);
    List<Shoot> findByStatus(ShootStatus status);
}
