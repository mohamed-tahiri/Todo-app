package com.medthr.todo.service;

import com.medthr.todo.dto.ListRequest;
import com.medthr.todo.dto.ListResponse;
import com.medthr.todo.mapper.ListMapper;
import com.medthr.todo.model.Board;
import com.medthr.todo.model.ListEntity;
import com.medthr.todo.repository.BoardRepository;
import com.medthr.todo.repository.ListEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListService {

    private final ListEntityRepository listRepository;
    private final BoardRepository boardRepository;

    /** Create a new list */
    public ListResponse createList(ListRequest request) {
        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        ListEntity listEntity = ListMapper.toEntity(request, board);
        ListEntity saved = listRepository.save(listEntity);

        return ListMapper.toResponse(saved);
    }

    /** Get all lists of a board */
    public List<ListResponse> getListsByBoard(Long boardId) {
        return listRepository.findByBoardIdOrderByPosition(boardId)
                .stream()
                .map(ListMapper::toResponse)
                .collect(Collectors.toList());
    }

    /** Update a list */
    public ListResponse updateList(Long id, ListRequest request) {
        ListEntity listEntity = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found"));

        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        listEntity.setName(request.getName());
        listEntity.setPosition(request.getPosition());
        listEntity.setBoard(board);

        ListEntity updated = listRepository.save(listEntity);
        return ListMapper.toResponse(updated);
    }

    /** Delete a list */
    public void deleteList(Long id) {
        listRepository.deleteById(id);
    }
}
