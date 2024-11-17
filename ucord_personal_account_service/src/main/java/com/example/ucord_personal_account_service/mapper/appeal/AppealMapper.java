package com.example.ucord_personal_account_service.mapper.appeal;

import com.example.ucord_personal_account_service.DTO.request.AppealRequest;
import com.example.ucord_personal_account_service.DTO.response.AppealResponse;
import com.example.ucord_personal_account_service.mapper.user.UserMapperDelegate;
import com.example.ucord_personal_account_service.model.entity.Appeal;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@DecoratedWith(AppealMapperDelegate.class)
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppealMapper {

    AppealResponse appealToResponse(Appeal appeal);

    Appeal requestToAppeal(AppealRequest request);

}
