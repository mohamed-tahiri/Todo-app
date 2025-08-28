package com.medthr.todo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ListRequest {
    private String name;
    private Integer position;
    private Long boardId; // Board auquel cette liste appartient
}
