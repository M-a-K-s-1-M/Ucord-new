package com.example.ucord_auth_service;
import com.example.ucord_auth_service.DTO.request.CreateUserRequest;
import com.example.ucord_auth_service.DTO.request.LoginRequest;
import com.example.ucord_auth_service.DTO.response.AuthResponse;
import com.example.ucord_auth_service.DTO.response.RefreshTokenResponse;
import com.example.ucord_auth_service.controller.AuthController;
import com.example.ucord_auth_service.model.RoleType;
import com.example.ucord_auth_service.repository.UserRepository;
import com.example.ucord_auth_service.security.SecurityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import(SecurityService.class) // или другие нужные классы
@SpringBootTest(properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration," +
                "org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration"
})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private SecurityService securityService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void authUser_shouldAuthenticateUserAndSetCookie() throws Exception {
        // Создаем объект запроса и ответа для теста
        LoginRequest loginRequest = new LoginRequest("username", "password");

        AuthResponse authResponse = AuthResponse.builder()
                .id(1L)
                .token("accessToken")
                .refreshToken("refreshToken")
                .username("username")
                .email("user@example.com")
                .roles(List.of("ROLE_USER"))
                .build();

        when(securityService.authenticateUser(loginRequest)).thenReturn(authResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(cookie().value("refreshToken", "refreshToken"))
                .andExpect(jsonPath("$.id").value(authResponse.getId()))
                .andExpect(jsonPath("$.token").value(authResponse.getToken()))
                .andExpect(jsonPath("$.refreshToken").value(authResponse.getRefreshToken()))
                .andExpect(jsonPath("$.username").value(authResponse.getUsername()))
                .andExpect(jsonPath("$.email").value(authResponse.getEmail()))
                .andExpect(jsonPath("$.roles[0]").value(authResponse.getRoles().get(0)));

        verify(securityService, times(1)).authenticateUser(loginRequest);
    }

    @Test
    void registerUser_shouldRegisterUserWithUserRole() throws Exception {
        CreateUserRequest createUserRequest = CreateUserRequest.builder()
                .username("username")
                .email("email@example.com")
                .password("password")
                .role(RoleType.ROLE_USER) // Проверка регистрации с ролью USER
                .build();

        when(userRepository.existsByUsername("username")).thenReturn(false);
        when(userRepository.existsByEmail("email@example.com")).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User created!"));

        verify(securityService, times(1)).register(createUserRequest);
    }

    @Test
    void registerUser_shouldReturnBadRequestIfRoleIsInvalid() throws Exception {
        // Создаем объект запроса с неверной ролью, эмулируем некорректный входной JSON
        String invalidRoleJson = "{ \"username\": \"user\", \"email\": \"email@example.com\", \"password\": \"password\", \"role\": \"INVALID_ROLE\" }";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidRoleJson))
                .andExpect(status().isBadRequest());
    }
    @Test
    void registerUser_shouldReturnBadRequestIfRoleIsMissing() throws Exception {
        CreateUserRequest createUserRequest = CreateUserRequest.builder()
                .username("username")
                .email("email@example.com")
                .password("password")
                .build(); // Роль не указана

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void refreshToken_shouldReturnNewToken() throws Exception {
        // Мокаем рефреш-токен
        RefreshTokenResponse refreshTokenResponse = new RefreshTokenResponse("newAccessToken", "newRefreshToken");

        when(securityService.refreshToken("refreshToken")).thenReturn(refreshTokenResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/refresh-token")
                        .cookie(new Cookie("refreshToken", "refreshToken")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("newAccessToken"))
                .andExpect(jsonPath("$.refreshToken").value("newRefreshToken"));

        verify(securityService, times(1)).refreshToken("refreshToken");
    }

    @Test
    void refreshToken_shouldReturnUnauthorizedIfNoToken() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/refresh-token"))
                .andExpect(status().isUnauthorized());

        verify(securityService, never()).refreshToken(anyString());
    }

    @Test
    @WithMockUser(username = "username")
    void logoutUser_shouldLogoutAndClearCookie() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User logout. Username is: username"))
                .andExpect(cookie().value("refreshToken", ""));

        verify(securityService, times(1)).logout();
    }
}