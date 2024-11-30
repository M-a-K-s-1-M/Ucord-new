package com.example.ucord_personal_account_service.controller;

import com.example.ucord_personal_account_service.DTO.request.AnnouncementRequest;
import com.example.ucord_personal_account_service.DTO.response.AnnouncementResponse;
import com.example.ucord_personal_account_service.mapper.announcement.AnnouncementMapper;
import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.service.AnnouncementService;
import com.example.ucord_personal_account_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/api/v1/personal-account/announcement")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final AnnouncementMapper announcementMapper;

    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<AnnouncementResponse> getAllAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return announcementService.getAllAnnouncements(PageRequest.of(page, size))
                .map(announcementMapper::announcementToResponse);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnnouncementResponse getAnnouncementById(@PathVariable Long id) {
        return announcementMapper.announcementToResponse(announcementService.getAnnouncementById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AnnouncementResponse createAnnouncement(@RequestBody AnnouncementRequest announcementRequest) {
        Announcement announcement = announcementMapper.requestToAnnouncement(announcementRequest);
        return announcementMapper.announcementToResponse(announcementService.saveAnnouncement(announcement));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnnouncementResponse updateAnnouncement(
            @PathVariable Long id,
            @RequestBody AnnouncementRequest announcementRequest) {
        Announcement announcement = announcementMapper.requestToAnnouncement(announcementRequest);
        announcement.setId(id);
        return announcementMapper.announcementToResponse(announcementService.saveAnnouncement(announcement));
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<AnnouncementResponse> searchAnnouncements(
            HttpServletRequest request,
            @RequestParam(required = false) String article,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long groupId,
            @RequestParam(required = false) UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        groupId = userService.getUserById((UUID) request.getAttribute("userId")).getGroupId().getId();
        return announcementService.searchAnnouncements(article, description, groupId, userId, PageRequest.of(page, size))
                .map(announcementMapper::announcementToResponse);
    }
}

