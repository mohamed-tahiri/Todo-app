package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserRequest {
    private String username;
    private String email;
    private String password;
}
