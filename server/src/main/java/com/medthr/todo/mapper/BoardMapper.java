package com.medthr.todo.mapper;

import com.medthr.todo.dto.BoardRequest;
import com.medthr.todo.dto.BoardResponse;
import com.medthr.todo.model.Board;
import com.medthr.todo.model.User;

import java.util.stream.Collectors;

public class BoardMapper {

    public static Board toEntity(BoardRequest request, User createdBy) {
        return Board.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdBy(createdBy)
                .build();
    }

    public static BoardResponse toResponse(Board board) {
        return BoardResponse.builder()
                .id(board.getId())
                .name(board.getName())
                .description(board.getDescription())
                .createdById(board.getCreatedBy() != null ? board.getCreatedBy().getId() : null)
                .listIds(board.getLists() != null
                        ? board.getLists().stream().map(list -> list.getId()).collect(Collectors.toList())
                        : null)
                .build();
    }
}
