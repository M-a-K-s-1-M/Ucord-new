package com.example.ucord_service.DTO.request;

import com.example.ucord_service.model.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    private String username;

    private String email;

    private String password;

    private Set<RoleType> roles;

}
