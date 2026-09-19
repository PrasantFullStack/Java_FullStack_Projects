package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.VideoFeedback;

import java.util.List;

public interface VideoFeedbackService extends CrudService<VideoFeedback, Long> {
  List<VideoFeedback> findByVideoId(Long videoId);

  List<VideoFeedback> findByClientId(Long clientId);
}
