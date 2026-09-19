package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ClientStatus;

import java.util.List;
import java.util.Optional;

public interface ClientService extends CrudService<Client, Long> {
  Optional<Client> findByEmail(String email);

  List<Client> findByStatus(ClientStatus status);
}
