package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Creator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, Long> {
  List<Creator> findByAvailabilityTrue();

  List<Creator> findByNameContainingIgnoreCase(String name);

  List<Creator> findByNichesContainingIgnoreCase(String niche);
}
