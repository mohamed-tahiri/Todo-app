package com.medthr.todo.service;

import com.medthr.todo.dto.UserRequest;
import com.medthr.todo.dto.UserResponse;
import com.medthr.todo.mapper.UserMapper;
import com.medthr.todo.model.User;
import com.medthr.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /** Create a new user */
    public UserResponse createUser(UserRequest request) {
        User user = UserMapper.toEntity(request);
        User saved = userRepository.save(user);
        return UserMapper.toResponse(saved);
    }

    /** Get all users */
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

    /** Get user by id */
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toResponse(user);
    }

    /** Update a user */
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // TODO: hash password en prod

        User updated = userRepository.save(user);
        return UserMapper.toResponse(updated);
    }

    /** Delete a user */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
