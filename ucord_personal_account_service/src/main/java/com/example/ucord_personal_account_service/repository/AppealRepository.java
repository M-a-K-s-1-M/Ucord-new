package com.example.ucord_personal_account_service.repository;

import com.example.ucord_personal_account_service.model.entity.Appeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AppealRepository extends JpaRepository<Appeal, Long>, JpaSpecificationExecutor<Appeal> {
}
