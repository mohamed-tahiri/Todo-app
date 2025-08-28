package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class ListResponse {
    private Long id;
    private String name;
    private Integer position;
    private Long boardId;
    private List<Long> taskIds; // Id des tâches associées
}
