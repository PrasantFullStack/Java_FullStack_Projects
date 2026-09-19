package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ClientStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.ClientRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ClientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

  private final ClientRepository clientRepository;

  public ClientServiceImpl(ClientRepository clientRepository) {
    this.clientRepository = clientRepository;
  }

  @Override
  public Client create(Client entity) {
    return clientRepository.save(entity);
  }

  @Override
  public Optional<Client> findById(Long id) {
    return clientRepository.findById(id);
  }

  @Override
  public List<Client> findAll() {
    return clientRepository.findAll();
  }

  @Override
  public Client update(Long id, Client entity) {
    Client existing = clientRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));

    existing.setClientName(entity.getClientName());
    existing.setCompanyName(entity.getCompanyName());
    existing.setEmail(entity.getEmail());
    existing.setPhone(entity.getPhone());
    existing.setWhatsapp(entity.getWhatsapp());
    existing.setBrandName(entity.getBrandName());
    existing.setIndustry(entity.getIndustry());
    existing.setGstTaxId(entity.getGstTaxId());
    existing.setSource(entity.getSource());
    existing.setStatus(entity.getStatus());

    return clientRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    clientRepository.deleteById(id);
  }

  @Override
  public Optional<Client> findByEmail(String email) {
    return clientRepository.findByEmail(email);
  }

  @Override
  public List<Client> findByStatus(ClientStatus status) {
    return clientRepository.findByStatus(status);
  }
}
