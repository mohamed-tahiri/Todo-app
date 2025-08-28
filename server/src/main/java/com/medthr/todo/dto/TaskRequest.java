package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class TaskRequest {
    private String title;
    private String description;
    private String status; // TODO, IN_PROGRESS, DONE
    private Integer position;
    private Long listId;
    private Long assignedToId;
    private LocalDate dueDate;
}
