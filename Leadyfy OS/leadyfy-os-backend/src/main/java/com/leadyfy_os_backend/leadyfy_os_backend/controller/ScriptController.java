package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.ScriptDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Script;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ScriptService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scripts")
public class ScriptController {

  private final ScriptService scriptService;

  public ScriptController(ScriptService scriptService) {
    this.scriptService = scriptService;
  }

  @GetMapping
  public List<ScriptDto> getAllScripts() {
    return scriptService.findAll().stream().map(ScriptDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ScriptDto> getScriptById(@PathVariable Long id) {
    Script script = scriptService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Script not found with id: " + id));
    return ResponseEntity.ok(ScriptDto.fromEntity(script));
  }

  @GetMapping("/status/{status}")
  public List<ScriptDto> getScriptsByStatus(@PathVariable ScriptStatus status) {
    return scriptService.findByStatus(status).stream().map(ScriptDto::fromEntity).toList();
  }

  @PostMapping
  public ResponseEntity<ScriptDto> createScript(@RequestBody Script script) {
    Script saved = scriptService.create(script);
    return ResponseEntity.status(HttpStatus.CREATED).body(ScriptDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ScriptDto> updateScript(@PathVariable Long id, @RequestBody Script script) {
    Script updated = scriptService.update(id, script);
    return ResponseEntity.ok(ScriptDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteScript(@PathVariable Long id) {
    scriptService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
