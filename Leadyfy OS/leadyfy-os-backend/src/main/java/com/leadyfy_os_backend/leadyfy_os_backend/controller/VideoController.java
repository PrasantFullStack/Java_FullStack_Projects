package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import com.leadyfy_os_backend.leadyfy_os_backend.dto.VideoDto;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.Video;
import com.leadyfy_os_backend.leadyfy_os_backend.service.VideoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

  private final VideoService videoService;

  public VideoController(VideoService videoService) {
    this.videoService = videoService;
  }

  @GetMapping
  public List<VideoDto> getAllVideos() {
    return videoService.findAll().stream().map(VideoDto::fromEntity).toList();
  }

  @GetMapping("/{id}")
  public ResponseEntity<VideoDto> getVideoById(@PathVariable Long id) {
    Video video = videoService.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Video not found with id: " + id));
    return ResponseEntity.ok(VideoDto.fromEntity(video));
  }

  @PostMapping
  public ResponseEntity<VideoDto> createVideo(@RequestBody Video video) {
    Video saved = videoService.create(video);
    return ResponseEntity.status(HttpStatus.CREATED).body(VideoDto.fromEntity(saved));
  }

  @PutMapping("/{id}")
  public ResponseEntity<VideoDto> updateVideo(@PathVariable Long id, @RequestBody Video video) {
    Video updated = videoService.update(id, video);
    return ResponseEntity.ok(VideoDto.fromEntity(updated));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
    videoService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
