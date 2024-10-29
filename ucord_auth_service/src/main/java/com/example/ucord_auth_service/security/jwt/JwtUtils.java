package com.example.ucord_auth_service.security.jwt;

import com.example.ucord_auth_service.model.entity.User;
import com.example.ucord_auth_service.security.AppUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.tokenExpiration}")
    private Duration tokenExpiration;

/*    public String generateJwtToken(AppUserDetails userDetails) {
        return generateTokenFromEmail(userDetails);
    }*/


    //TODO: Можно поменять на Email по необходимости
    public String generateTokenFromEmail(String email) {
        System.out.println(email + "jfdlqkwfjeklwfjn");
        return Jwts.builder()
                .setSubject(email)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + tokenExpiration.toMillis()))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
    //TODO: Можно поменять на Email по необходимости
    public String getEmail(String token) {
        System.out.println("jfdlqkwfjeklwfjn" + Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("email", String.class));
        return Jwts.parser().setSigningKey(jwtSecret)
                .parseClaimsJws(token).getBody().get("email", String.class);
    }

    public boolean validate(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("Token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("Claims string is empty: {}", e.getMessage());
        }
        return false;
    }

}
