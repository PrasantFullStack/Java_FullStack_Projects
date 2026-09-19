package com.leadyfy_os_backend.leadyfy_os_backend.service;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Video;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.VideoStatus;

import java.util.List;

public interface VideoService extends CrudService<Video, Long> {
  List<Video> findByClientId(Long clientId);

  List<Video> findByOrderId(Long orderId);

  List<Video> findByStatus(VideoStatus status);
}
