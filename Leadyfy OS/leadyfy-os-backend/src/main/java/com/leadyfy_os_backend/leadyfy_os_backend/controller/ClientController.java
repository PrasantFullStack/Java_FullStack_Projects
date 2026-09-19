package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.ClientDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ClientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

  private final ClientService clientService;

  public ClientController(ClientService clientService) {
    this.clientService = clientService;
  }

  @GetMapping
  public List<ClientDto> getAllClients() {
    return clientService.findAll().stream().map(ClientDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
    Client client = clientService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));
    return ResponseEntity.ok(ClientDto.fromEntity(client));
  }

  @PostMapping
  public ResponseEntity<ClientDto> createClient(@RequestBody Client client) {
    Client saved = clientService.create(client);
    return ResponseEntity.status(HttpStatus.CREATED).body(ClientDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ClientDto> updateClient(@PathVariable Long id, @RequestBody Client client) {
    Client updated = clientService.update(id, client);
    return ResponseEntity.ok(ClientDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
    clientService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
