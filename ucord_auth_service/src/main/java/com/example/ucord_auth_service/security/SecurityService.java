package com.example.ucord_auth_service.security;


import com.example.ucord_auth_service.DTO.request.CreateUserRequest;
import com.example.ucord_auth_service.DTO.request.LoginRequest;
import com.example.ucord_auth_service.DTO.request.RefreshTokenRequest;
import com.example.ucord_auth_service.DTO.response.AuthResponse;
import com.example.ucord_auth_service.DTO.response.RefreshTokenResponse;
import com.example.ucord_auth_service.exception.RefreshTokenException;
import com.example.ucord_auth_service.model.entity.RefreshToken;
import com.example.ucord_auth_service.model.entity.User;
import com.example.ucord_auth_service.repository.UserRepository;
import com.example.ucord_auth_service.security.jwt.JwtUtils;
import com.example.ucord_auth_service.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityService {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        // Проверяем, что loginRequest содержит email
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            throw new IllegalArgumentException("Email and password must not be null");
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return AuthResponse.builder()
                .id(userDetails.getId())
                .token(jwtUtils.generateTokenFromEmail(loginRequest.getEmail()))
                .refreshToken(refreshToken.getToken())
                .username(userDetails.getUsername()) // Если вам нужно оставить username, иначе можно убрать
                .email(userDetails.getEmail())
                .roles(roles)
                .build();
    }
    public void register(CreateUserRequest createUserRequest) {
        var user = User.builder()
                .username(createUserRequest.getUsername())
                .email(createUserRequest.getEmail())
                .password(passwordEncoder.encode(createUserRequest.getPassword()))
                .build();
        user.setRoles(Collections.singleton(createUserRequest.getRole()));

        userRepository.save(user);
    }

    public RefreshTokenResponse refreshToken(String requestRefreshToken) {

        return refreshTokenService.findByRefreshToken(requestRefreshToken)
                .map(refreshTokenService::checkRefreshToken)
                .map(RefreshToken::getUserId)
                .map(userId -> {
                    User tokenOwner = userRepository.findById(userId).orElseThrow(() ->
                            new RefreshTokenException("Exception trying to get token for userId: " + userId));
                    String token = jwtUtils.generateTokenFromEmail(tokenOwner.getEmail());

                    return new RefreshTokenResponse(token, refreshTokenService.createRefreshToken(userId).getToken());
                }).orElseThrow(() -> new RefreshTokenException(requestRefreshToken, "Refresh token not found"));
    }

    public void logout() {
        var currentPrincipal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (currentPrincipal instanceof AppUserDetails userDetails) {
            Long userId = userDetails.getId();

            refreshTokenService.deleteByUserId(userId);
        }
    }

}
