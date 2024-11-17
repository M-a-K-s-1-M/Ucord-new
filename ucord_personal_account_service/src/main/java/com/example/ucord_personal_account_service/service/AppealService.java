package com.example.ucord_personal_account_service.service;

import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.repository.AppealRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppealService {

    private final AppealRepository appealRepository;

    public Page<Appeal> getAllAppeals(Pageable pageable) {
        return appealRepository.findAll(pageable);
    }

    public Appeal getAppealById(Long id) {
        return appealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appeal not found"));
    }

    public Appeal saveAppeal(Appeal appeal) {
        return appealRepository.save(appeal);
    }

    public void deleteAppeal(Long id) {
        appealRepository.deleteById(id);
    }

    public Page<Appeal> searchAppeals(String article, String description, Long userId, Pageable pageable) {
        return appealRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (article != null && !article.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("article")), "%" + article.toLowerCase() + "%"));
            }
            if (description != null && !description.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + description.toLowerCase() + "%"));
            }
            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.get("userId").get("id"), userId));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}
