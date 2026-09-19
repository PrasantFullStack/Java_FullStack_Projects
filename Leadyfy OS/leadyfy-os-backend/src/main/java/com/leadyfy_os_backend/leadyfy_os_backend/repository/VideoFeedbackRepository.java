package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.VideoFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoFeedbackRepository extends JpaRepository<VideoFeedback, Long> {
  List<VideoFeedback> findByVideoId(Long videoId);

  List<VideoFeedback> findByClientId(Long clientId);
}
