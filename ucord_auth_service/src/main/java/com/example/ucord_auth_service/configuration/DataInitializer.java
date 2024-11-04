package com.example.ucord_auth_service.configuration;

import com.example.ucord_auth_service.model.RoleType;
import com.example.ucord_auth_service.model.entity.Group;
import com.example.ucord_auth_service.model.entity.User;
import com.example.ucord_auth_service.repository.GroupRepository;
import com.example.ucord_auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        Group group1 = Group.builder().name("РИ-11111").build();
        Group group2 = Group.builder().name("РИ-22222").build();
        Group group3 = Group.builder().name("РИ-33333").build();

        User user = User.builder()
                .username("admin")
                .email("admin@admin.com")
                .roles(Collections.singleton(RoleType.ROLE_ADMIN))
                .password("admin123")
                .build();

        userRepository.save(user);
        groupRepository.saveAll(Arrays.asList(group1, group2, group3));

    }
}