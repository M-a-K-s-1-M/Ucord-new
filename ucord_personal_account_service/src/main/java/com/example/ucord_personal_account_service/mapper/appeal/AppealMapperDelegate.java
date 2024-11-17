package com.example.ucord_personal_account_service.mapper.appeal;

import com.example.ucord_personal_account_service.DTO.request.AppealRequest;
import com.example.ucord_personal_account_service.DTO.response.AppealResponse;
import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.model.entity.Message;
import com.example.ucord_personal_account_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

public class AppealMapperDelegate implements AppealMapper{

    @Autowired
    private UserService userService;


    @Override
    public AppealResponse appealToResponse(Appeal appeal) {
        return AppealResponse.builder()
                .id(appeal.getId())
                .article(appeal.getArticle())
                .description(appeal.getDescription())
                .messageIdList(appeal.getMessages().stream().map(Message::getId).collect(Collectors.toList()))
                .userId(appeal.getUserId().getId())
                .tutorId(appeal.getTutorId().getId())
                .build();
    }

    @Override
    public Appeal requestToAppeal(AppealRequest request) {
        return Appeal.builder()
                .article(request.getArticle())
                .description(request.getDescription())
                .userId(userService.getUserById(request.getUserId()))
                .tutorId(userService.getUserById(request.getTutorId()))
                .build();
    }
}
