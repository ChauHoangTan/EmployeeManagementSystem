package com.example.server.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    final private String secret_key = "chauhoangtan1308chauhoangtan1308chauhoangtan1308";
    public String generateJwtToken(String username, List<String> roles){

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .claim("roles", roles)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(SignatureAlgorithm.HS256, secret_key)
                .compact();
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder().setSigningKey(secret_key).build().parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean isExpired(String token){
        return expiredDate(token).before(new Date());
    }

    public Date expiredDate(String token){
        return Jwts.parserBuilder().setSigningKey(secret_key).build().parseClaimsJws(token).getBody().getExpiration();
    }

    public Boolean validateToken(String token){
        return (extractUsername(token) != null && !isExpired(token));
    }

    public Authentication getAuthentication(String token) {
        // Giải mã JWT và lấy thông tin claims
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secret_key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Lấy username từ claims
        String username = claims.getSubject();

        // Lấy roles từ claims (nếu có)
        List<String> roles = claims.get("roles", List.class);
        System.out.println("Roles: " + roles);

        // Chuyển roles thành danh sách authorities
        List<SimpleGrantedAuthority> authorities = roles != null
                ? roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
                : Collections.emptyList();

        // Tạo UserDetails với username và authorities
        User principal = new User(username, "", authorities);

        // Tạo đối tượng Authentication
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

}
