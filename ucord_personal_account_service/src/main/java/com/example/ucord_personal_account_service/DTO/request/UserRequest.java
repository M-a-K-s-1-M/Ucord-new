package com.example.ucord_personal_account_service.DTO.request;

import com.example.ucord_personal_account_service.model.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {

    private String username;

    private String email;

    private Long groupId;


}
