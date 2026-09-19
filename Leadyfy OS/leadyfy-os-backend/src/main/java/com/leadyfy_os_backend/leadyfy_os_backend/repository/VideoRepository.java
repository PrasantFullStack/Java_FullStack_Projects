package com.leadyfy_os_backend.leadyfy_os_backend.repository;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Video;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.VideoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
  List<Video> findByClientId(Long clientId);

  List<Video> findByOrderId(Long orderId);

  List<Video> findByStatus(VideoStatus status);
}
