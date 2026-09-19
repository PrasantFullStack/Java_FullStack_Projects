package com.leadyfy_os_backend.leadyfy_os_backend.service.impl;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.VideoFeedback;
import com.leadyfy_os_backend.leadyfy_os_backend.repository.VideoFeedbackRepository;
import com.leadyfy_os_backend.leadyfy_os_backend.service.VideoFeedbackService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoFeedbackServiceImpl implements VideoFeedbackService {

  private final VideoFeedbackRepository videoFeedbackRepository;

  public VideoFeedbackServiceImpl(VideoFeedbackRepository videoFeedbackRepository) {
    this.videoFeedbackRepository = videoFeedbackRepository;
  }

  @Override
  public VideoFeedback create(VideoFeedback entity) {
    return videoFeedbackRepository.save(entity);
  }

  @Override
  public Optional<VideoFeedback> findById(Long id) {
    return videoFeedbackRepository.findById(id);
  }

  @Override
  public List<VideoFeedback> findAll() {
    return videoFeedbackRepository.findAll();
  }

  @Override
  public VideoFeedback update(Long id, VideoFeedback entity) {
    VideoFeedback existing = videoFeedbackRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("VideoFeedback not found with id: " + id));

    existing.setVideo(entity.getVideo());
    existing.setClient(entity.getClient());
    existing.setComment(entity.getComment());
    existing.setTimestamp(entity.getTimestamp());

    return videoFeedbackRepository.save(existing);
  }

  @Override
  public void deleteById(Long id) {
    videoFeedbackRepository.deleteById(id);
  }

  @Override
  public List<VideoFeedback> findByVideoId(Long videoId) {
    return videoFeedbackRepository.findByVideoId(videoId);
  }

  @Override
  public List<VideoFeedback> findByClientId(Long clientId) {
    return videoFeedbackRepository.findByClientId(clientId);
  }
}
