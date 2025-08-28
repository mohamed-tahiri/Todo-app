package com.medthr.todo.controller;

import com.medthr.todo.dto.ListRequest;
import com.medthr.todo.dto.ListResponse;
import com.medthr.todo.service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lists")
@RequiredArgsConstructor
public class ListController {

    private final ListService listService;

    @PostMapping
    public ListResponse createList(@RequestBody ListRequest request) {
        return listService.createList(request);
    }

    @GetMapping("/board/{boardId}")
    public List<ListResponse> getListsByBoard(@PathVariable Long boardId) {
        return listService.getListsByBoard(boardId);
    }

    @PutMapping("/{id}")
    public ListResponse updateList(@PathVariable Long id, @RequestBody ListRequest request) {
        return listService.updateList(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        listService.deleteList(id);
    }
}
