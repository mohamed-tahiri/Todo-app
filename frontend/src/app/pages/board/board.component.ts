import { Component, OnInit } from '@angular/core';
import { Board } from '../../core/models/board.model';
import { BoardService } from '../../core/services/board.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent  implements OnInit {
  boards: Board[] = [];
  users: User[] = [];
  newBoard: Partial<Board> = { name: '', description: '', createdById: 0 };
  loading = false;

  constructor(
    private boardService: BoardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadBoards();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }


  loadBoards(): void {
    this.loading = true;
    this.boardService.getAllBoards().subscribe({
      next: (data) => {
        this.boards = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des boards', err);
        this.loading = false;
      }
    });
  }

  createBoard(): void {
    if (!this.newBoard.name) return;

    this.boardService.createBoard(this.newBoard as Board).subscribe({
      next: (board) => {
        this.boards.push(board);
        this.newBoard = { name: '', description: '', createdById: 0 };
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }

  deleteBoard(id: number): void {
    this.boardService.deleteBoard(id).subscribe({
      next: () => {
        this.boards = this.boards.filter(b => b.id !== id);
      },
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }
}
