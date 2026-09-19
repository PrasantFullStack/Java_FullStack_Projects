package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.ShootDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Shoot;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ShootService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoots")
public class ShootController {

  private final ShootService shootService;

  public ShootController(ShootService shootService) {
    this.shootService = shootService;
  }

  @GetMapping
  public List<ShootDto> getAllShoots() {
    return shootService.findAll().stream().map(ShootDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ShootDto> getShootById(@PathVariable Long id) {
    Shoot shoot = shootService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Shoot not found with id: " + id));
    return ResponseEntity.ok(ShootDto.fromEntity(shoot));
  }

  @PostMapping
  public ResponseEntity<ShootDto> createShoot(@RequestBody Shoot shoot) {
    Shoot saved = shootService.create(shoot);
    return ResponseEntity.status(HttpStatus.CREATED).body(ShootDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ShootDto> updateShoot(@PathVariable Long id, @RequestBody Shoot shoot) {
    Shoot updated = shootService.update(id, shoot);
    return ResponseEntity.ok(ShootDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteShoot(@PathVariable Long id) {
    shootService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
