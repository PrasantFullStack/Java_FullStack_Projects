package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.VideoFeedbackDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.VideoFeedback;
import com.leadyfy_os_backend.leadyfy_os_backend.service.VideoFeedbackService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/video-feedback")
public class VideoFeedbackController {

  private final VideoFeedbackService videoFeedbackService;

  public VideoFeedbackController(VideoFeedbackService videoFeedbackService) {
    this.videoFeedbackService = videoFeedbackService;
  }

  @GetMapping
  public List<VideoFeedbackDto> getAllFeedback() {
    return videoFeedbackService.findAll().stream().map(VideoFeedbackDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<VideoFeedbackDto> getFeedbackById(@PathVariable Long id) {
    VideoFeedback feedback = videoFeedbackService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("VideoFeedback not found with id: " + id));
    return ResponseEntity.ok(VideoFeedbackDto.fromEntity(feedback));
  }

  @PostMapping
  public ResponseEntity<VideoFeedbackDto> createFeedback(@RequestBody VideoFeedback feedback) {
    VideoFeedback saved = videoFeedbackService.create(feedback);
    return ResponseEntity.status(HttpStatus.CREATED).body(VideoFeedbackDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<VideoFeedbackDto> updateFeedback(@PathVariable Long id, @RequestBody VideoFeedback feedback) {
    VideoFeedback updated = videoFeedbackService.update(id, feedback);
    return ResponseEntity.ok(VideoFeedbackDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
    videoFeedbackService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
