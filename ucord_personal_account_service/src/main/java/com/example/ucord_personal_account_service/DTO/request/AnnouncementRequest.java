package com.example.ucord_personal_account_service.DTO.request;

import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnouncementRequest {

    private String article;

    private String description;

    private List<Long> groupIdList;

    private List<Long> userIdList;

}
