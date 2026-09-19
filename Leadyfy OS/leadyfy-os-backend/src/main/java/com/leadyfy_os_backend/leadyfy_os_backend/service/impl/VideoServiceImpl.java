package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Video;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.VideoStatus;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.VideoRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.VideoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

  private final VideoRepository videoRepository;

  public VideoServiceImpl(VideoRepository videoRepository) {
    this.videoRepository = videoRepository;
  }

  @Override
  public Video create(Video entity) {
    return videoRepository.save(entity);
  }

  @Override
  public Optional<Video> findById(Long id) {
    return videoRepository.findById(id);
  }

  @Override
  public List<Video> findAll() {
    return videoRepository.findAll();
  }

  @Override
  public Video update(Long id, Video entity) {
    Video existing = videoRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Video not found with id: " + id));

    existing.setClient(entity.getClient());
    existing.setOrder(entity.getOrder());
    existing.setScript(entity.getScript());
    existing.setCreator(entity.getCreator());
    existing.setShoot(entity.getShoot());
    existing.setAssignedEditor(entity.getAssignedEditor());
    existing.setDeadline(entity.getDeadline());
    existing.setVideoFileLink(entity.getVideoFileLink());
    existing.setThumbnail(entity.getThumbnail());
    existing.setRevisionCount(entity.getRevisionCount());
    existing.setFinalDeliveryLink(entity.getFinalDeliveryLink());
    existing.setStatus(entity.getStatus());

    return videoRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    videoRepository.deleteById(id);
  }

  @Override
  public List<Video> findByClientId(Long clientId) {
    return videoRepository.findByClientId(clientId);
  }

  @Override
  public List<Video> findByOrderId(Long orderId) {
    return videoRepository.findByOrderId(orderId);
  }

  @Override
  public List<Video> findByStatus(VideoStatus status) {
    return videoRepository.findByStatus(status);
  }
}
