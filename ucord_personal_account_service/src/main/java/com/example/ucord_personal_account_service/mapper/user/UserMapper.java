package com.example.ucord_personal_account_service.mapper.user;

import com.example.ucord_personal_account_service.DTO.request.UserRequest;
import com.example.ucord_personal_account_service.DTO.response.UserResponse;
import com.example.ucord_personal_account_service.model.entity.User;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@DecoratedWith(UserMapperDelegate.class)
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserResponse userToResponse(User user);

    User requestToUser(UserRequest request);
}
