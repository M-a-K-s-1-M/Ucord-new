package com.example.ucord_personal_account_service.service;

import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.repository.AnnouncementRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public Page<Announcement> getAllAnnouncements(Pageable pageable) {
        return announcementRepository.findAll(pageable);
    }

    public Announcement getAnnouncementById(Long id) {
        return announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
    }

    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }

    public Page<Announcement> searchAnnouncements(String article, String description, Long groupId, UUID userId, Pageable pageable) {
        return announcementRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (article != null && !article.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("article")), "%" + article.toLowerCase() + "%"));
            }
            if (description != null && !description.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + description.toLowerCase() + "%"));
            }
            if (groupId != null) {
                predicates.add(criteriaBuilder.equal(root.join("groups").get("id"), groupId));
            }
            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.join("users").get("id"), userId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}
