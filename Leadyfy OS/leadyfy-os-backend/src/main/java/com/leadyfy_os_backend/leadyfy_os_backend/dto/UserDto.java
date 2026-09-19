package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.UserRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
  private Long id;
  private String name;
  private String email;
  private UserRole role;
  private boolean active;

  public static UserDto fromEntity(User user) {
    if (user == null)
      return null;
    return UserDto.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .role(user.getRole())
        .active(user.isActive())
        .build();
  }
}
