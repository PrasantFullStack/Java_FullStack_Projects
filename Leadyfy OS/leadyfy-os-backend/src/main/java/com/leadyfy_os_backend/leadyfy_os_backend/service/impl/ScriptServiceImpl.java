package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Script;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.ScriptRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.ScriptService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScriptServiceImpl implements ScriptService {

  private final ScriptRepository scriptRepository;

  public ScriptServiceImpl(ScriptRepository scriptRepository) {
    this.scriptRepository = scriptRepository;
  }

  @Override
  public Script create(Script entity) {
    return scriptRepository.save(entity);
  }

  @Override
  public Optional<Script> findById(Long id) {
    return scriptRepository.findById(id);
  }

  @Override
  public List<Script> findAll() {
    return scriptRepository.findAll();
  }

  @Override
  public Script update(Long id, Script entity) {
    Script existing = scriptRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Script not found with id: " + id));

    existing.setClient(entity.getClient());
    existing.setOrder(entity.getOrder());
    existing.setVideoNumber(entity.getVideoNumber());
    existing.setWriter(entity.getWriter());
    existing.setCreator(entity.getCreator());
    existing.setLanguage(entity.getLanguage());
    existing.setScriptText(entity.getScriptText());
    existing.setReferenceLinks(entity.getReferenceLinks());
    existing.setDeadline(entity.getDeadline());
    existing.setRevisionCount(entity.getRevisionCount());
    existing.setComments(entity.getComments());
    existing.setStatus(entity.getStatus());

    return scriptRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    scriptRepository.deleteById(id);
  }

  @Override
  public List<Script> findByClientId(Long clientId) {
    return scriptRepository.findByClientId(clientId);
  }

  @Override
  public List<Script> findByOrderId(Long orderId) {
    return scriptRepository.findByOrderId(orderId);
  }

  @Override
  public List<Script> findByStatus(ScriptStatus status) {
    return scriptRepository.findByStatus(status);
  }
}
