package com.medthr.todo.service;

import com.medthr.todo.dto.TaskRequest;
import com.medthr.todo.dto.TaskResponse;
import com.medthr.todo.enums.TaskStatus;
import com.medthr.todo.mapper.TaskMapper;
import com.medthr.todo.model.ListEntity;
import com.medthr.todo.model.Task;
import com.medthr.todo.model.User;
import com.medthr.todo.repository.ListEntityRepository;
import com.medthr.todo.repository.TaskRepository;
import com.medthr.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ListEntityRepository listRepository;
    private final UserRepository userRepository;

    /** Create a new task */
    public TaskResponse createTask(TaskRequest request) {
        // Retrieve the list entity
        ListEntity list = listRepository.findById(request.getListId())
                .orElseThrow(() -> new RuntimeException("List not found"));

        // Retrieve the assigned user if any
        User assignedTo = request.getAssignedToId() != null
                ? userRepository.findById(request.getAssignedToId()).orElse(null)
                : null;

        // Convert DTO to entity using mapper
        Task task = TaskMapper.toEntity(request, list, assignedTo);

        // Save to DB
        Task savedTask = taskRepository.save(task);

        // Convert entity to DTO response
        return TaskMapper.toResponse(savedTask);
    }

    /** Get all tasks for a specific list */
    public List<TaskResponse> getTasksByList(Long listId) {
        return taskRepository.findByListIdOrderByPosition(listId)
                .stream()
                .map(TaskMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(TaskMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }


    /** Update an existing task */
    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Retrieve the list entity
        ListEntity list = listRepository.findById(request.getListId())
                .orElseThrow(() -> new RuntimeException("List not found"));

        // Retrieve the assigned user if any
        User assignedTo = request.getAssignedToId() != null
                ? userRepository.findById(request.getAssignedToId()).orElse(null)
                : null;

        // Update fields
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? TaskStatus.valueOf(request.getStatus()) : task.getStatus());
        task.setPosition(request.getPosition());
        task.setDueDate(request.getDueDate());
        task.setList(list);
        task.setAssignedTo(assignedTo);

        Task updatedTask = taskRepository.save(task);
        return TaskMapper.toResponse(updatedTask);
    }

    /** Delete a task by id */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
