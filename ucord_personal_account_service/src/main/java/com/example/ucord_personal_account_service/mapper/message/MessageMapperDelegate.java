package com.example.ucord_personal_account_service.mapper.message;

import com.example.ucord_personal_account_service.DTO.request.MessageRequest;
import com.example.ucord_personal_account_service.DTO.response.MessageResponse;
import com.example.ucord_personal_account_service.model.entity.Message;
import com.example.ucord_personal_account_service.service.AppealService;
import com.example.ucord_personal_account_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class MessageMapperDelegate implements MessageMapper{

    @Autowired
    private AppealService appealService;

    @Autowired
    private UserService userService;

    @Override
    public MessageResponse messageToResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .timestamp(message.getTimestamp())
                .message(message.getMessage())
                .userId(message.getUserId().getId())
                .appealId(message.getAppealId().getId())
                .build();
    }

    @Override
    public Message requestToMessage(MessageRequest request) {
        return Message.builder()
                .timestamp(LocalDateTime.now())
                .message(request.getMessage())
                .userId(userService.getUserById(request.getUserId()))
                .appealId(appealService.getAppealById(request.getAppealId()))
                .build();
    }
}
