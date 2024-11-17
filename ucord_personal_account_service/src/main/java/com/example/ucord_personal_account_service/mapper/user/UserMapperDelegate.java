package com.example.ucord_personal_account_service.mapper.user;

import com.example.ucord_personal_account_service.DTO.request.UserRequest;
import com.example.ucord_personal_account_service.DTO.response.UserResponse;
import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.model.entity.User;
import com.example.ucord_personal_account_service.repository.GroupRepository;
import com.example.ucord_personal_account_service.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

public class UserMapperDelegate implements UserMapper{

    @Autowired
    private GroupService groupService;

    @Override
    public UserResponse userToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .groupId(user.getGroupId().getId())
                .announcementIdList(user.getAnnouncements().stream().map(Announcement::getId).collect(Collectors.toList()))
                .appealIdList(user.getAppeals().stream().map(Appeal::getId).collect(Collectors.toList()))
                .build();
    }

    @Override
    public User requestToUser(UserRequest request) {
        return User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .groupId(groupService.getGroupById(request.getGroupId()))
                .build();
    }
}
