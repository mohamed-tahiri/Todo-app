package com.medthr.todo.service;

import com.medthr.todo.dto.BoardRequest;
import com.medthr.todo.dto.BoardResponse;
import com.medthr.todo.mapper.BoardMapper;
import com.medthr.todo.model.Board;
import com.medthr.todo.model.User;
import com.medthr.todo.repository.BoardRepository;
import com.medthr.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    /** Create a new board */
    public BoardResponse createBoard(BoardRequest request) {
        User createdBy = userRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Board board = BoardMapper.toEntity(request, createdBy);
        Board saved = boardRepository.save(board);

        return BoardMapper.toResponse(saved);
    }

    /** Get all boards */
    public List<BoardResponse> getAllBoards() {
        return boardRepository.findAll()
                .stream()
                .map(BoardMapper::toResponse)
                .collect(Collectors.toList());
    }

    /** Get a board by id */
    public BoardResponse getBoardById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        return BoardMapper.toResponse(board);
    }

    /** Update a board */
    public BoardResponse updateBoard(Long id, BoardRequest request) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        board.setName(request.getName());
        board.setDescription(request.getDescription());
        // Optional: changer createdBy ?

        Board updated = boardRepository.save(board);
        return BoardMapper.toResponse(updated);
    }

    /** Delete a board */
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
}
