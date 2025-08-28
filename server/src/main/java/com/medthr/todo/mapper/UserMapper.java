package com.medthr.todo.mapper;

import com.medthr.todo.dto.UserRequest;
import com.medthr.todo.dto.UserResponse;
import com.medthr.todo.model.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static User toEntity(UserRequest request) {
        return User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword()) // TODO: hash password en prod
                .build();
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .boardIds(user.getBoards() != null
                        ? user.getBoards().stream().map(board -> board.getId()).toList()
                        : null)
                .taskIds(user.getTasks() != null
                        ? user.getTasks().stream().map(task -> task.getId()).toList()
                        : null)
                .build();
    }
}
