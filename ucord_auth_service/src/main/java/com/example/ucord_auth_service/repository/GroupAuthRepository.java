package com.example.ucord_auth_service.repository;

import com.example.ucord_auth_service.model.entity.GroupAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupAuthRepository extends JpaRepository<GroupAuth, Long> {

    Optional<GroupAuth> findByName(String name);

}
