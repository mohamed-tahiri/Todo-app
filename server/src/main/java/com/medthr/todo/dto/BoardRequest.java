package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class BoardRequest {
    private String name;
    private String description;
    private Long createdById; // L'utilisateur qui crée le board
}
