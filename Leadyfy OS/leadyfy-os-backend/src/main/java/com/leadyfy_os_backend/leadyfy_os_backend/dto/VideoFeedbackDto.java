package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.VideoFeedback;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoFeedbackDto {
  private Long id;
  private Long videoId;
  private Long clientId;
  private String comment;
  private LocalDateTime timestamp;

  public static VideoFeedbackDto fromEntity(VideoFeedback feedback) {
    if (feedback == null)
      return null;
    return VideoFeedbackDto.builder()
        .id(feedback.getId())
        .videoId(feedback.getVideo() != null ? feedback.getVideo().getId() : null)
        .clientId(feedback.getClient() != null ? feedback.getClient().getId() : null)
        .comment(feedback.getComment())
        .timestamp(feedback.getTimestamp())
        .build();
  }
}
