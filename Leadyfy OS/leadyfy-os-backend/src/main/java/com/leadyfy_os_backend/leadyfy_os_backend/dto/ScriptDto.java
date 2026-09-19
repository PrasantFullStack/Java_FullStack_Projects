package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Script;
import com.leadyfy_os_backend.leadyfy_os_backend.enums.ScriptStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScriptDto {
  private Long id;
  private Long clientId;
  private Long orderId;
  private Integer videoNumber;
  private Long writerId;
  private Long creatorId;
  private String language;
  private String scriptText;
  private String referenceLinks;
  private LocalDate deadline;
  private Integer revisionCount;
  private String comments;
  private ScriptStatus status;

  public static ScriptDto fromEntity(Script script) {
    if (script == null)
      return null;
    return ScriptDto.builder()
        .id(script.getId())
        .clientId(script.getClient() != null ? script.getClient().getId() : null)
        .orderId(script.getOrder() != null ? script.getOrder().getId() : null)
        .videoNumber(script.getVideoNumber())
        .writerId(script.getWriter() != null ? script.getWriter().getId() : null)
        .creatorId(script.getCreator() != null ? script.getCreator().getId() : null)
        .language(script.getLanguage())
        .scriptText(script.getScriptText())
        .referenceLinks(script.getReferenceLinks())
        .deadline(script.getDeadline())
        .revisionCount(script.getRevisionCount())
        .comments(script.getComments())
        .status(script.getStatus())
        .build();
  }
}
