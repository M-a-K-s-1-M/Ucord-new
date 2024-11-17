package com.example.ucord_personal_account_service.mapper.group;

import com.example.ucord_personal_account_service.DTO.request.GroupRequest;
import com.example.ucord_personal_account_service.DTO.response.GroupResponse;
import com.example.ucord_personal_account_service.model.entity.Group;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@DecoratedWith(GroupMapperDelegate.class)
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GroupMapper {

    GroupResponse groupToResponse(Group group);

    Group requestToGroup(GroupRequest request);
}
