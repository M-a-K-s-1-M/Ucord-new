package com.example.ucord_personal_account_service.configuration;


import com.example.ucord_personal_account_service.model.entity.Announcement;
import com.example.ucord_personal_account_service.model.entity.Appeal;
import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.model.entity.Message;
import com.example.ucord_personal_account_service.model.entity.User;
import com.example.ucord_personal_account_service.repository.AnnouncementRepository;
import com.example.ucord_personal_account_service.repository.AppealRepository;
import com.example.ucord_personal_account_service.repository.GroupRepository;
import com.example.ucord_personal_account_service.repository.MessageRepository;
import com.example.ucord_personal_account_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final AnnouncementRepository announcementRepository;
    private final AppealRepository appealRepository;
    private final MessageRepository messageRepository;

    @Override
    public void run(String... args) {
        Group group1 = Group.builder().name("РИ-11111").build();
        Group group2 = Group.builder().name("РИ-22222").build();
        Group group3 = Group.builder().name("РИ-33333").build();

        groupRepository.saveAll(List.of(group1, group2, group3));

        // Создание пользователей
        User user1 = User.builder()
                .username("Test User")
                .email("test@test.ru")
                .groupId(group1)
                .build();

        User user2 = User.builder()
                .username("Alice")
                .email("alice@example.com")
                .groupId(group1)
                .build();

        User user3 = User.builder()
                .username("Bob")
                .email("bob@example.com")
                .groupId(group2)
                .build();

        User user4 = User.builder()
                .username("Charlie")
                .email("charlie@example.com")
                .groupId(group2)
                .build();

        User user5 = User.builder()
                .username("Diana")
                .email("diana@example.com")
                .groupId(group3)
                .build();

        userRepository.saveAll(List.of(user1, user2, user3, user4, user5));

        // Создание объявлений
        Announcement announcement1 = Announcement.builder()
                .article("Announcement 1")
                .description("Description for Announcement 1")
                .groups(List.of(group1, group2))
                .users(List.of(user1, user2))
                .build();
        Announcement announcement4 = Announcement.builder()
                .article("Announcement 5")
                .description("Description for Announcement 5")
                .groups(List.of(group1, group2))
                .users(List.of(user2))
                .build();
        Announcement announcement5 = Announcement.builder()
                .article("Announcement 5")
                .description("Description for Announcement 5")
                .groups(List.of(group1))
                .users(List.of(user1, user2))
                .build();
        Announcement announcement6 = Announcement.builder()
                .article("Announcement 6")
                .description("Description for Announcement 6")
                .groups(List.of(group1, group2))
                .build();

        Announcement announcement2 = Announcement.builder()
                .article("Announcement 2")
                .description("Description for Announcement 2")
                .groups(List.of(group3))
                .users(List.of(user3, user5))
                .build();

        Announcement announcement3 = Announcement.builder()
                .article("Announcement 3")
                .description("Description for Announcement 3")
                .groups(List.of(group1))
                .users(List.of(user4))
                .build();

        announcementRepository.saveAll(List.of(announcement1, announcement2, announcement3, announcement4, announcement5, announcement6));

        // Создание апелляций
        Appeal appeal1 = Appeal.builder()
                .article("Appeal 1")
                .description("Description for Appeal 1")
                .userId(user1)
                .tutorId(user3)
                .build();

        Appeal appeal2 = Appeal.builder()
                .article("Appeal 2")
                .description("Description for Appeal 2")
                .userId(user2)
                .tutorId(user4)
                .build();

        appealRepository.saveAll(List.of(appeal1, appeal2));

        // Создание сообщений
        Message message1 = Message.builder()
                .timestamp(LocalDateTime.now())
                .message("Message for Appeal 1")
                .userId(user1)
                .appealId(appeal1)
                .build();

        Message message2 = Message.builder()
                .timestamp(LocalDateTime.now())
                .message("Message for Appeal 2")
                .userId(user2)
                .appealId(appeal2)
                .build();

        messageRepository.saveAll(List.of(message1, message2));

        System.out.println("Data initialization completed!");
    }
}