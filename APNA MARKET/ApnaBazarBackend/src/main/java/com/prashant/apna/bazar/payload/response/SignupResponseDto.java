package com.prashant.apna.bazar.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupResponseDto {
	private Long userid;
	private String name;
	private String username;
	private String email;
	private String phone;
	private String role;
	private boolean active;
}
