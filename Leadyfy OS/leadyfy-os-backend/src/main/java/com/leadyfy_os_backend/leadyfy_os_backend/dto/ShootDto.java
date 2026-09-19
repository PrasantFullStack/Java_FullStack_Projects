package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Shoot;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ShootStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShootDto {
  private Long id;
  private Long clientId;
  private Long orderId;
  private Long creatorId;
  private LocalDateTime shootDateTime;
  private String location;
  private String shootManager;
  private String specialNotes;
  private ShootStatus status;

  public static ShootDto fromEntity(Shoot shoot) {
    if (shoot == null)
      return null;
    return ShootDto.builder()
        .id(shoot.getId())
        .clientId(shoot.getClient() != null ? shoot.getClient().getId() : null)
        .orderId(shoot.getOrder() != null ? shoot.getOrder().getId() : null)
        .creatorId(shoot.getCreator() != null ? shoot.getCreator().getId() : null)
        .shootDateTime(shoot.getShootDateTime())
        .location(shoot.getLocation())
        .shootManager(shoot.getShootManager())
        .specialNotes(shoot.getSpecialNotes())
        .status(shoot.getStatus())
        .build();
  }
}
