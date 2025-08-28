package com.medthr.todo.dto;

import com.medthr.todo.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Integer position;
    private Long listId;
    private Long assignedToId;
    private LocalDate dueDate;
}
