package com.prashant.apna.bazar.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {

  @Value("${jwt.secret}")
  private String secret;

  // 1. Generate signing key
  private SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  // 2. Extract username
  public String extractUserName(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // 3. Generic claim extractor
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts
        .parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  // 5. Token validation
  public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = extractUserName(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  // 6. Token generator
  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return createToken(claims, userDetails.getUsername());
  }

  // 7 Token creation logic
  private String createToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
        .subject(subject)
        .claims(claims)
        .signWith(getSigningKey())
        .compact();
  }

}
