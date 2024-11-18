package com.example.ucord_personal_account_service.controller;

import com.example.ucord_personal_account_service.DTO.request.GroupRequest;
import com.example.ucord_personal_account_service.DTO.response.GroupResponse;
import com.example.ucord_personal_account_service.mapper.group.GroupMapper;
import com.example.ucord_personal_account_service.model.entity.Group;
import com.example.ucord_personal_account_service.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/api/v1/personal-account/group")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper groupMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<GroupResponse> getAllGroups(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return groupService.getAllGroups(PageRequest.of(page, size))
                .map(groupMapper::groupToResponse);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GroupResponse getGroupById(@PathVariable Long id) {
        return groupMapper.groupToResponse(groupService.getGroupById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GroupResponse createGroup(@RequestBody GroupRequest groupRequest) {
        Group group = groupMapper.requestToGroup(groupRequest);
        return groupMapper.groupToResponse(groupService.saveGroup(group));
    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GroupResponse updateGroup(
            @PathVariable Long id,
            @RequestBody GroupRequest groupRequest) {
        Group group = groupMapper.requestToGroup(groupRequest);
        group.setId(id); // Ensure the ID is set to the correct value for update
        return groupMapper.groupToResponse(groupService.saveGroup(group));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<GroupResponse> searchGroups(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return groupService.searchGroups(name, PageRequest.of(page, size))
                .map(groupMapper::groupToResponse);
    }
}

