package com.medthr.todo.mapper;

import com.medthr.todo.dto.TaskRequest;
import com.medthr.todo.dto.TaskResponse;
import com.medthr.todo.enums.TaskStatus;
import com.medthr.todo.model.ListEntity;
import com.medthr.todo.model.Task;
import com.medthr.todo.model.User;

public class TaskMapper {

    // Convert TaskRequest -> Task
    public static Task toEntity(TaskRequest request, ListEntity list, User assignedTo) {
        return Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? TaskStatus.valueOf(request.getStatus()) : TaskStatus.TODO)
                .position(request.getPosition())
                .dueDate(request.getDueDate())
                .list(list)
                .assignedTo(assignedTo)
                .build();
    }

    // Convert Task -> TaskResponse
    public static TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .position(task.getPosition())
                .dueDate(task.getDueDate())
                .listId(task.getList() != null ? task.getList().getId() : null)
                .assignedToId(task.getAssignedTo() != null ? task.getAssignedTo().getId() : null)
                .build();
    }
}
