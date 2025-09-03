import { Component, OnInit } from '@angular/core';
import { HeaderProjectComponent } from '../../../shared/components/header-project/header-project.component';
import { Board } from '../../../core/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../../core/services/board.service';

@Component({
  selector: 'app-activity',
  imports: [HeaderProjectComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent  implements OnInit {
  boardId = 0;
  board!: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('boardId'));
    if (this.boardId) {
      this.loadBoard(this.boardId);
    }
  }

  loadBoard(id: number) {
    this.boardService.getBoardById(id).subscribe({
      next: (b) => (this.board = b),
      error: (e) => console.error(e),
    });
  }
}

