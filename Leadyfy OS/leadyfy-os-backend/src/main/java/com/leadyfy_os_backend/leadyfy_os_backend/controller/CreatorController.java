package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.CreatorDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Creator;
import com.leadyfy_os_backend.leadyfy_os_backend.service.CreatorService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creators")
public class CreatorController {

  private final CreatorService creatorService;

  public CreatorController(CreatorService creatorService) {
    this.creatorService = creatorService;
  }

  @GetMapping
  public List<CreatorDto> getAllCreators() {
    return creatorService.findAll().stream().map(CreatorDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<CreatorDto> getCreatorById(@PathVariable Long id) {
    Creator creator = creatorService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Creator not found with id: " + id));
    return ResponseEntity.ok(CreatorDto.fromEntity(creator));
  }

  @GetMapping("/available")
  public List<CreatorDto> getAvailableCreators() {
    return creatorService.findAvailableCreators().stream().map(CreatorDto::fromEntity).toList();
  }

  @PostMapping
  public ResponseEntity<CreatorDto> createCreator(@RequestBody Creator creator) {
    Creator saved = creatorService.create(creator);
    return ResponseEntity.status(HttpStatus.CREATED).body(CreatorDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<CreatorDto> updateCreator(@PathVariable Long id, @RequestBody Creator creator) {
    Creator updated = creatorService.update(id, creator);
    return ResponseEntity.ok(CreatorDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCreator(@PathVariable Long id) {
    creatorService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
