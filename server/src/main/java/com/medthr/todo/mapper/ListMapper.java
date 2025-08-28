package com.medthr.todo.mapper;

import com.medthr.todo.dto.ListRequest;
import com.medthr.todo.dto.ListResponse;
import com.medthr.todo.model.Board;
import com.medthr.todo.model.ListEntity;

import java.util.stream.Collectors;

public class ListMapper {

    // Convert ListRequest -> ListEntity
    public static ListEntity toEntity(ListRequest request, Board board) {
        return ListEntity.builder()
                .name(request.getName())
                .position(request.getPosition())
                .board(board)
                .build();
    }

    // Convert ListEntity -> ListResponse
    public static ListResponse toResponse(ListEntity listEntity) {
        return ListResponse.builder()
                .id(listEntity.getId())
                .name(listEntity.getName())
                .position(listEntity.getPosition())
                .boardId(listEntity.getBoard() != null ? listEntity.getBoard().getId() : null)
                .taskIds(listEntity.getTasks() != null
                        ? listEntity.getTasks().stream().map(task -> task.getId()).collect(Collectors.toList())
                        : null)
                .build();
    }
}
