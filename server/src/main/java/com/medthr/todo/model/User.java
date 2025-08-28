package com.medthr.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password; // à hasher pour la prod

    @OneToMany(mappedBy = "createdBy")
    private List<Board> boards;

    @OneToMany(mappedBy = "assignedTo")
    private List<Task> tasks;
}


