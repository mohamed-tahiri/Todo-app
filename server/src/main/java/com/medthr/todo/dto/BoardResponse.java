package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class BoardResponse {
    private Long id;
    private String name;
    private String description;
    private Long createdById;
    private List<Long> listIds; // Ids des listes associées
}
