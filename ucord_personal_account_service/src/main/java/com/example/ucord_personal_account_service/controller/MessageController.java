package com.example.ucord_personal_account_service.controller;

import com.example.ucord_personal_account_service.DTO.request.MessageRequest;
import com.example.ucord_personal_account_service.DTO.response.MessageResponse;
import com.example.ucord_personal_account_service.mapper.message.MessageMapper;
import com.example.ucord_personal_account_service.model.entity.Message;
import com.example.ucord_personal_account_service.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/personal-account/message")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private final MessageService messageService;
    private final MessageMapper messageMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<MessageResponse> getAllMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return messageService.getAllMessages(PageRequest.of(page, size))
                .map(messageMapper::messageToResponse);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MessageResponse getMessageById(@PathVariable Long id) {
        return messageMapper.messageToResponse(messageService.getMessageById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse createMessage(@RequestBody MessageRequest messageRequest) {
        Message message = messageMapper.requestToMessage(messageRequest);
        return messageMapper.messageToResponse(messageService.saveMessage(message));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MessageResponse updateMessage(
            @PathVariable Long id,
            @RequestBody MessageRequest messageRequest) {
        Message message = messageMapper.requestToMessage(messageRequest);
        message.setId(id); // Ensure the ID is set to the correct value for update
        return messageMapper.messageToResponse(messageService.saveMessage(message));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<MessageResponse> searchMessages(
            @RequestParam(required = false) String message,
            @RequestParam(required = false) Long appealId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return messageService.searchMessages(message, appealId, PageRequest.of(page, size))
                .map(messageMapper::messageToResponse);
    }
}

