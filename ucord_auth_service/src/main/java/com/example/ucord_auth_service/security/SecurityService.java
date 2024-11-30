package com.example.ucord_auth_service.security;


import com.example.ucord_auth_service.DTO.AuthResponseDTO;
import com.example.ucord_auth_service.DTO.RefreshTokenDTO;
import com.example.ucord_auth_service.DTO.request.CreateUserRequest;
import com.example.ucord_auth_service.DTO.request.LoginRequest;
import com.example.ucord_auth_service.event.UserRegistrationEvent;
import com.example.ucord_auth_service.exception.RefreshTokenException;
import com.example.ucord_auth_service.model.entity.RefreshToken;
import com.example.ucord_auth_service.model.entity.UserAuth;
import com.example.ucord_auth_service.repository.UserAuthRepository;
import com.example.ucord_auth_service.security.jwt.JwtUtils;
import com.example.ucord_auth_service.service.RefreshTokenService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityService {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;

    private final UserAuthRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${app.kafka.kafkaEventTopic}")
    private String topicName;
    @Autowired
    private KafkaTemplate<String, String> userRegisteredEvent;

    @Autowired
    private ObjectMapper objectMapper;


    public AuthResponseDTO authenticateUser(LoginRequest loginRequest) {
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

        return AuthResponseDTO.builder()
                .id(userDetails.getId())
                .token(jwtUtils.generateTokenFromEmail(loginRequest.getEmail()))
                .refreshToken(refreshToken.getToken())
                .username(userDetails.getUsername()) // Если вам нужно оставить username, иначе можно убрать
                .email(userDetails.getEmail())
                .roles(roles)
                .build();
    }
    public void register(CreateUserRequest createUserRequest) {
        var user = UserAuth.builder()
                .username(createUserRequest.getUsername())
                .email(createUserRequest.getEmail())
                .password(passwordEncoder.encode(createUserRequest.getPassword()))
                .build();
        user.setRoles(Collections.singleton(createUserRequest.getRole()));

        UserRegistrationEvent event = UserRegistrationEvent.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .build();

        String mappedEvent;
        try {
            mappedEvent = objectMapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        userRegisteredEvent.send(topicName, mappedEvent);
        userRepository.save(user);
    }

    public void listen(
            @Payload String message
    ) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(message, new TypeReference<Map<String, Object>>(){});

        String email = map.get("email").toString();
        String uuid = map.get("uuid").toString();
        UserAuth user = userRepository.findByEmail(email).orElseThrow();
        user.setUuid(uuid);
        userRepository.save(user);


    }


    public RefreshTokenDTO refreshToken(String requestRefreshToken) {

        return refreshTokenService.findByRefreshToken(requestRefreshToken)
                .map(refreshTokenService::checkRefreshToken)
                .map(RefreshToken::getUserId)
                .map(userId -> {
                    UserAuth tokenOwner = userRepository.findById(userId).orElseThrow(() ->
                            new RefreshTokenException("Exception trying to get token for userId: " + userId));
                    String token = jwtUtils.generateTokenFromEmail(tokenOwner.getEmail());

                    return new RefreshTokenDTO(token, refreshTokenService.createRefreshToken(userId).getToken());
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
