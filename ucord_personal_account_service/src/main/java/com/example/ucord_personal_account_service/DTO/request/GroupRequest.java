package com.example.ucord_personal_account_service.DTO.request;

import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupRequest {

    private String name;

    private List<UUID> userIdList;

    private List<Long> announcementIdList;
}
