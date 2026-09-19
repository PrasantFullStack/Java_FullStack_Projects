package com.leadyfy_os_backend.leadyfy_os_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RoleProtectedController {

  @GetMapping("/admin/dashboard")
  @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
  public Map<String, String> adminDashboard() {
    return Map.of("message", "Admin dashboard accessible");
  }

  @GetMapping("/employee/operations")
  @PreAuthorize("hasAnyRole('OWNER', 'ADMIN', 'EMPLOYEE')")
  public Map<String, String> employeeOperations() {
    return Map.of("message", "Employee operations accessible");
  }

  @GetMapping("/client/portal")
  @PreAuthorize("hasRole('CLIENT')")
  public Map<String, String> clientPortal() {
    return Map.of("message", "Client portal accessible");
  }
}
