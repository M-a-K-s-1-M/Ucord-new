package com.example.ucord_auth_service.configuration;

import com.example.ucord_auth_service.model.RoleType;
import com.example.ucord_auth_service.model.entity.GroupAuth;
import com.example.ucord_auth_service.model.entity.UserAuth;
import com.example.ucord_auth_service.repository.GroupAuthRepository;
import com.example.ucord_auth_service.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private GroupAuthRepository groupRepository;

    @Autowired
    private UserAuthRepository userRepository;

    @Override
    public void run(String... args) {
        GroupAuth group1 = GroupAuth.builder().name("РИ-11111").build();
        GroupAuth group2 = GroupAuth.builder().name("РИ-22222").build();
        GroupAuth group3 = GroupAuth.builder().name("РИ-33333").build();

        UserAuth user = UserAuth.builder()
                .username("admin")
                .email("admin@admin.com")
                .roles(Collections.singleton(RoleType.ROLE_ADMIN))
                .password("admin123")
                .build();
        UserAuth user1 = UserAuth.builder()
                .username("test")
                .email("test@test.com")
                .roles(Collections.singleton(RoleType.ROLE_USER))
                .password("testtest")
                .build();

        userRepository.save(user);
        userRepository.save(user1);
        groupRepository.saveAll(Arrays.asList(group1, group2, group3));

    }
}