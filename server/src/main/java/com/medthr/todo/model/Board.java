package com.medthr.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "boards")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    private User createdBy;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<ListEntity> lists;
}
