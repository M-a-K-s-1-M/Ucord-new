package com.example.ucord_personal_account_service.mapper.message;

import com.example.ucord_personal_account_service.DTO.request.MessageRequest;
import com.example.ucord_personal_account_service.DTO.response.MessageResponse;
import com.example.ucord_personal_account_service.model.entity.Message;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@DecoratedWith(MessageMapperDelegate.class)
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MessageMapper {

    MessageResponse messageToResponse(Message message);

    Message requestToMessage(MessageRequest request);

}
