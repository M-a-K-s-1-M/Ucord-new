package com.example.ucord_personal_account_service.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnouncementResponse {

    private Long id;

    private String article;

    private String description;

    private List<Long> groupIdList;

    private List<Long> userIdList;

}
