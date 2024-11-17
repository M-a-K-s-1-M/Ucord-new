package com.example.ucord_personal_account_service.DTO.request;

import com.example.ucord_personal_account_service.model.entity.Appeal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageRequest {

    private String message;

    private Long appealId;

    private Long userId;
}
