package com.medthr.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Table(name = "lists")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer position;

    @ManyToOne
    private Board board;

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL)
    private List<Task> tasks;
}
