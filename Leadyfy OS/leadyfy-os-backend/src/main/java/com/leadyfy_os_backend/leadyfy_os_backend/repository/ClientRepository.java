package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ClientStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
  Optional<Client> findByEmail(String email);

  List<Client> findByStatus(ClientStatus status);

  List<Client> findByCompanyNameContainingIgnoreCase(String companyName);
}
