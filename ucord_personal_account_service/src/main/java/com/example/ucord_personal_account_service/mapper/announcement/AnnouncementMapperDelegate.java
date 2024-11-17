package com.example.ucord_personal_account_service.mapper.announcement;

import com.example.ucord_personal_account_service.DTO.request.AnnouncementRequest;
import com.example.ucord_personal_account_service.DTO.response.AnnouncementResponse;
import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.model.entity.User;
import com.example.ucord_personal_account_service.service.GroupService;
import com.example.ucord_personal_account_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;

public class AnnouncementMapperDelegate implements AnnouncementMapper{

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @Override
    public AnnouncementResponse announcementToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .article(announcement.getArticle())
                .description(announcement.getDescription())
                .groupIdList(announcement.getGroups().stream().map(Group::getId).collect(Collectors.toList()))
                .userIdList(announcement.getUsers().stream().map(User::getId).collect(Collectors.toList()))
                .build();
    }

    @Override
    public Announcement requestToAnnouncement(AnnouncementRequest request) {
        return Announcement.builder()
                .article(request.getArticle())
                .description(request.getDescription())
                .groups(request.getGroupIdList().stream().map(gId -> groupService.getGroupById(gId)).collect(Collectors.toList()))
                .users(request.getUserIdList().stream().map(userId -> userService.getUserById(userId)).collect(Collectors.toList()))
                .build();
    }
}
