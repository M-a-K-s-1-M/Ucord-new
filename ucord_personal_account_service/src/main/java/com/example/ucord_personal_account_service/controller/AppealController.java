package com.example.ucord_personal_account_service.controller;

import com.example.ucord_personal_account_service.DTO.request.AppealRequest;
import com.example.ucord_personal_account_service.DTO.response.AppealResponse;
import com.example.ucord_personal_account_service.mapper.appeal.AppealMapper;
import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.service.AppealService;
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

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/personal-account/appeal")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AppealController {

    private final AppealService appealService;
    private final AppealMapper appealMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<AppealResponse> getAllAppeals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return appealService.getAllAppeals(PageRequest.of(page, size))
                .map(appealMapper::appealToResponse);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppealResponse getAppealById(@PathVariable Long id) {
        return appealMapper.appealToResponse(appealService.getAppealById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppealResponse createAppeal(@RequestBody AppealRequest appealRequest) {
        Appeal appeal = appealMapper.requestToAppeal(appealRequest);
        return appealMapper.appealToResponse(appealService.saveAppeal(appeal));
    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppealResponse updateAppeal(
            @PathVariable Long id,
            @RequestBody AppealRequest appealRequest) {
        Appeal appeal = appealMapper.requestToAppeal(appealRequest);
        appeal.setId(id); // Ensure the ID is set to the correct value for update
        return appealMapper.appealToResponse(appealService.saveAppeal(appeal));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppeal(@PathVariable Long id) {
        appealService.deleteAppeal(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<AppealResponse> searchAppeals(
            @RequestParam(required = false) String article,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return appealService.searchAppeals(article, description, userId, PageRequest.of(page, size))
                .map(appealMapper::appealToResponse);
    }
}

