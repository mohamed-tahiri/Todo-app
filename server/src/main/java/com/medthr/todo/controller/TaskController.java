package com.medthr.todo.controller;

import com.medthr.todo.dto.TaskRequest;
import com.medthr.todo.dto.TaskResponse;
import com.medthr.todo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @GetMapping("/list/{listId}")
    public List<TaskResponse> getTasksByList(@PathVariable Long listId) {
        return taskService.getTasksByList(listId);
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
        return taskService.updateTask(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
