package com.medthr.todo.repository;

import com.medthr.todo.model.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListEntityRepository extends JpaRepository<ListEntity, Long> {
    List<ListEntity> findByBoardIdOrderByPosition(Long boardId);
}
