package com.leadyfy_os_backend.leadyfy_os_backend.dto;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Creator;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatorDto {
  private Long id;
  private String name;
  private String gender;
  private String ageGroup;
  private String languages;
  private String location;
  private String niches;
  private String contact;
  private BigDecimal rate;
  private String portfolioLink;
  private Boolean availability;

  public static CreatorDto fromEntity(Creator creator) {
    if (creator == null)
      return null;
    return CreatorDto.builder()
        .id(creator.getId())
        .name(creator.getName())
        .gender(creator.getGender())
        .ageGroup(creator.getAgeGroup())
        .languages(creator.getLanguages())
        .location(creator.getLocation())
        .niches(creator.getNiches())
        .contact(creator.getContact())
        .rate(creator.getRate())
        .portfolioLink(creator.getPortfolioLink())
        .availability(creator.getAvailability())
        .build();
  }
}
