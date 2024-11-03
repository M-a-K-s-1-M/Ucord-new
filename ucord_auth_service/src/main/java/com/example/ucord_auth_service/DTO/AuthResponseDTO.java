package com.example.ucord_auth_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponseDTO {


    private Long id;

    private String token;

    private String refreshToken;

    private String username;

    private String email;

    private List<String> roles;

}
