package com.example.ucord_personal_account_service.controller;

import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.service.AppealService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/personal-account/appeal")
@RequiredArgsConstructor
public class AppealController {

    private final AppealService appealService;

    @GetMapping
    public ResponseEntity<Page<Appeal>> getAllAppeals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(appealService.getAllAppeals(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appeal> getAppealById(@PathVariable Long id) {
        return ResponseEntity.ok(appealService.getAppealById(id));
    }

    @PostMapping
    public ResponseEntity<Appeal> createAppeal(@RequestBody Appeal appeal) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appealService.saveAppeal(appeal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppeal(@PathVariable Long id) {
        appealService.deleteAppeal(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Appeal>> searchAppeals(
            @RequestParam(required = false) String article,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(appealService.searchAppeals(article, description, userId, PageRequest.of(page, size)));
    }
}
