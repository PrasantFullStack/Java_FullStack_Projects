package com.prashant.apna.bazar.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDTO {
	@NotBlank(message = "Name is required!")
	@Size(min = 3, max = 15, message = "Name must be between 3 and 15 characters")
	private String name;

	@NotBlank(message = "UserName is required!")
	@Size(min = 3, max = 15, message = "UserName must be between 3 and 15 characters")
	private String username;

	@NotBlank(message = "Email is required!")
	@Email(message = "Email should be valid!")
	private String email;

	@NotBlank(message = "Phone number is required!")
	@Pattern(regexp = "^[0-9]{10}$", message = "phone must be exactly 10 digits")
	private String phone;

	@NotBlank(message = "password is required!")
	@Size(min = 6, max = 10, message = "Password must be at least 6 and 10 characters")
	private String password;
	@NotBlank(message = "Role is required")
	private String role;

	private boolean active;

}
