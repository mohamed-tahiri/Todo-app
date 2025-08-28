package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private List<Long> boardIds;
    private List<Long> taskIds;
}
