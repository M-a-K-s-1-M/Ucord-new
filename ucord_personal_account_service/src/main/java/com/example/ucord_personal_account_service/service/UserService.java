package com.example.ucord_personal_account_service.service;

import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.model.entity.User;
import com.example.ucord_personal_account_service.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final GroupService groupService;

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${spring.application.kafka.kafkaAccountRegistryEventTopic}")
    private String topicName;


    @KafkaListener(topics = "${spring.application.kafka.kafkaUserRegistryEventTopic}",
            groupId = "${spring.application.kafka.kafkaMessageGroupId}",
            containerFactory = "kafkaListenerContainerFactory")

    public void listenUserRegistrationEvent(@Payload String event) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(event, new TypeReference<>() {
        });

        String email = map.get("email").toString();
        String username = map.get("username").toString();
        Long groupId = (Long) map.get("groupId");

        Group group = groupService.getGroupById(groupId);
        List<User> users = group.getUsers();

        User user = User.builder()
                .email(email)
                .username(username)
                .groupId(group)
                .build();
        users.add(user);
        group.setUsers(users);
        groupService.saveGroup(group);

        try {
            String eventJson = objectMapper.writeValueAsString(user);
            kafkaTemplate.send(topicName, eventJson);
        } catch (JsonProcessingException e) {
            System.out.println(e);
        }
    }


    public Page<User> searchUsers(String username, String email, Long groupId, Pageable pageable) {
        return userRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (username != null && !username.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + username.toLowerCase() + "%"));
            }
            if (email != null && !email.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
            }
            if (groupId != null) {
                predicates.add(criteriaBuilder.equal(root.get("groupId").get("id"), groupId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}