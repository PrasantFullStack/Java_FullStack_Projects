package com.leadyfy_os_backend.leadyfy_os_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtils {

  @Value("${jwt.secret:LeadyfyOSJWTSecretKeyForSpringSecurity2026MustBeLongEnough}")
  private String jwtSecret;

  @Value("${jwt.expiration-ms:86400000}")
  private long jwtExpirationMs;

  public String generateToken(UserDetails userDetails) {
    List<String> roles = userDetails.getAuthorities().stream()
        .map(authority -> authority.getAuthority())
        .toList();

    return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .claim("roles", roles)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    return parseClaims(token).getSubject();
  }

  public boolean validateToken(String token) {
    try {
      Claims claims = parseClaims(token);
      return !claims.getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException ex) {
      return false;
    }
  }

  private Claims parseClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
  }
}
