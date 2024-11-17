package com.example.ucord_personal_account_service.mapper.announcement;

import com.example.ucord_personal_account_service.DTO.request.AnnouncementRequest;
import com.example.ucord_personal_account_service.DTO.response.AnnouncementResponse;
import com.example.ucord_personal_account_service.mapper.user.UserMapperDelegate;
import com.example.ucord_personal_account_service.model.entity.Announcement;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@DecoratedWith(AnnouncementMapperDelegate.class)
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnnouncementMapper {

    AnnouncementResponse announcementToResponse(Announcement announcement);

    Announcement requestToAnnouncement(AnnouncementRequest request);

}
