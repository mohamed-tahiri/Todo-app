package com.medthr.todo.controller;

import com.medthr.todo.dto.BoardRequest;
import com.medthr.todo.dto.BoardResponse;
import com.medthr.todo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public BoardResponse createBoard(@RequestBody BoardRequest request) {
        return boardService.createBoard(request);
    }

    @GetMapping
    public List<BoardResponse> getAllBoards() {
        return boardService.getAllBoards();
    }

    @GetMapping("/{id}")
    public BoardResponse getBoardById(@PathVariable Long id) {
        return boardService.getBoardById(id);
    }

    @PutMapping("/{id}")
    public BoardResponse updateBoard(@PathVariable Long id, @RequestBody BoardRequest request) {
        return boardService.updateBoard(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
    }
}
