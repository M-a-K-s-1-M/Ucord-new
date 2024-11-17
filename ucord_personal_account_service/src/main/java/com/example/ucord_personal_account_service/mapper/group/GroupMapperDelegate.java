package com.example.ucord_personal_account_service.mapper.group;

import com.example.ucord_personal_account_service.DTO.request.GroupRequest;
import com.example.ucord_personal_account_service.DTO.response.GroupResponse;
import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.model.entity.User;
import com.example.ucord_personal_account_service.service.AnnouncementService;
import com.example.ucord_personal_account_service.service.GroupService;
import com.example.ucord_personal_account_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class GroupMapperDelegate implements GroupMapper{

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @Autowired
    private AnnouncementService announcementService;

    @Override
    public GroupResponse groupToResponse(Group group) {
        return GroupResponse.builder()
                .id(group.getId())
                .name(group.getName())
                .userIdList(group.getUsers().stream().map(User::getId).collect(Collectors.toList()))
                .announcementIdList(group.getAnnouncements().stream().map(Announcement::getId).collect(Collectors.toList()))
                .build();
    }

    @Override
    public Group requestToGroup(GroupRequest request) {
        return Group.builder()
                .name(request.getName())
                .users(request.getUserIdList().stream().map(userId -> userService.getUserById(userId)).collect(Collectors.toList()))
                .announcements(request.getAnnouncementIdList().stream().map(aId -> announcementService.getAnnouncementById(aId)).collect(Collectors.toList()))
                .build();
    }
}
