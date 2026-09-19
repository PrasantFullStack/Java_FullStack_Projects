package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Video;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.VideoStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoDto {
  private Long id;
  private Long clientId;
  private Long orderId;
  private Long scriptId;
  private Long creatorId;
  private Long shootId;
  private Long assignedEditorId;
  private LocalDate deadline;
  private String videoFileLink;
  private String thumbnail;
  private Integer revisionCount;
  private String finalDeliveryLink;
  private VideoStatus status;

  public static VideoDto fromEntity(Video video) {
    if (video == null)
      return null;
    return VideoDto.builder()
        .id(video.getId())
        .clientId(video.getClient() != null ? video.getClient().getId() : null)
        .orderId(video.getOrder() != null ? video.getOrder().getId() : null)
        .scriptId(video.getScript() != null ? video.getScript().getId() : null)
        .creatorId(video.getCreator() != null ? video.getCreator().getId() : null)
        .shootId(video.getShoot() != null ? video.getShoot().getId() : null)
        .assignedEditorId(video.getAssignedEditor() != null ? video.getAssignedEditor().getId() : null)
        .deadline(video.getDeadline())
        .videoFileLink(video.getVideoFileLink())
        .thumbnail(video.getThumbnail())
        .revisionCount(video.getRevisionCount())
        .finalDeliveryLink(video.getFinalDeliveryLink())
        .status(video.getStatus())
        .build();
  }
}
