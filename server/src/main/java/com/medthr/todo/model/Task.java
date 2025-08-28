package com.medthr.todo.model;

import com.medthr.todo.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.TODO;
    private Integer position;

    @ManyToOne
    private ListEntity list;

    @ManyToOne
    private User assignedTo;

    private LocalDate dueDate;
}
