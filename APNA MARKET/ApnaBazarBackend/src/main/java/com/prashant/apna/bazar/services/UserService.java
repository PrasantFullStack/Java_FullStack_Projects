package com.prashant.apna.bazar.services;

import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.apna.bazar.entities.User;
import com.prashant.apna.bazar.exception.ResourceNotFoundException;
import com.prashant.apna.bazar.mapper.ProfileMapper;
import com.prashant.apna.bazar.mapper.SignupMapper;
import com.prashant.apna.bazar.payload.request.AuthRequest;
import com.prashant.apna.bazar.payload.request.ProfileDTO;
import com.prashant.apna.bazar.payload.request.SignupDTO;
import com.prashant.apna.bazar.payload.response.AuthResponse;
import com.prashant.apna.bazar.payload.response.ProfileResponseDto;
import com.prashant.apna.bazar.payload.response.SignupResponseDto;
import com.prashant.apna.bazar.repositories.UserRepo;
import com.prashant.apna.bazar.security.JwtUtils;
// import com.prashant.apna.bazar.utils.FileUploadUtil;
import com.prashant.apna.bazar.utils.FileValidationUtil;

import io.jsonwebtoken.lang.Collections;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private SignupMapper signupMapper;

	@Autowired
	private ProfileMapper profileMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	// private final String uploadDir = FileUploadUtil.getUploadDirFor("users");

	// SignUp user
	public SignupResponseDto signup(SignupDTO signupDto) {
		if (!signupDto.getPassword().equals(signupDto.getCpassword())) {
			throw new RuntimeException("Password and Confirm Password do not match!");
		}

		// BeanUtils.copyProperties(signupDto, user);
		// map Dto to entity
		User user = signupMapper.toEntity(signupDto);
		user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
		user.setActive(true);
		// save entity
		User saveUser = userRepo.save(user);
		// return map entity to response
		return signupMapper.toResponse(saveUser);
		// return mapToSignupResposnseDTO(saveUser);

	}

	// // Mapping SignupResponseDto from User
	// private SignupResponseDto mapToSignupResposnseDTO(User user) {
	// SignupResponseDto responseDto = new SignupResponseDto();
	// BeanUtils.copyProperties(user, responseDto);
	// return responseDto;

	// }

	// // Mapping ProfileResponseDto from User
	// private ProfileResponseDto mapToProfileResponseDto(User user) {
	// ProfileResponseDto responseDto = new ProfileResponseDto();
	// BeanUtils.copyProperties(user, responseDto);
	// return responseDto;
	// }

	// user get by id
	public ProfileResponseDto getUserById(Long userid) {
		User user = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User not found"));
		return profileMapper.toResponse(user);
	}

	// Get All Users
	public List<ProfileResponseDto> getAllUsers() {
		return userRepo.findAll().stream().map(profileMapper::toResponse).toList();
	}

	// Update User
	public ProfileResponseDto updateUser(Long userid, ProfileDTO profileDTO, MultipartFile file) throws IOException {
		User existingUser = userRepo.findById(userid)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		// File upload logic
		if (file != null && !file.isEmpty()) {
			FileValidationUtil.ValidateImage(file);
			Map<String, String> imageUrl = cloudinaryService.uploadImage(file, "apna-bazar/users");
			profileDTO.setPic(imageUrl.get("secure_url")); // Set image URL in DTO
			profileDTO.setPublicId(imageUrl.get("public_id")); // Set public ID in DTO
		}

		// ✅ Update existing user from DTO using mapper
		profileMapper.updateEntity(existingUser, profileDTO);
		existingUser.setActive(true); // Optional: mark user active if needed

		// ✅ Save the updated user
		User updatedUser = userRepo.save(existingUser);

		// Return updated response DTO
		return profileMapper.toResponse(updatedUser);
	}

	// // save file method
	// private String saveFile(MultipartFile file) throws IOException {
	// String fileName = System.currentTimeMillis() + "_" +
	// file.getOriginalFilename();
	// Path filePath = Path.of(uploadDir, fileName);
	// Files.write(filePath, file.getBytes());
	// return "/uploads/users/" + fileName;
	// }

	// Delete User
	public void deleteUser(Long userid) throws IOException {
		userRepo.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		userRepo.deleteById(userid);

	}

	// login user
	public AuthResponse login(AuthRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		// Actual DB lookup here
		User user = userRepo.findByUsernameOrEmail(request.getUsername(), request.getUsername())
				.orElseThrow(
						() -> new ResourceNotFoundException("User not found by username or email: " + request.getUsername()));

		String token = jwtUtils.generateToken(
				new org.springframework.security.core.userdetails.User(
						user.getUsername(), user.getPassword(), Collections.emptyList()));

		AuthResponse response = new AuthResponse();
		response.setToken(token);
		response.setUserid(user.getUserid());
		response.setName(user.getName());
		response.setRole(user.getRole());
		return response;
	}
}
