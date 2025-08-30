import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Board } from '../../core/models/board.model';
import { List } from '../../core/models/list.model';
import { BoardService } from '../../core/services/board.service';
import { ListService } from '../../core/services/list.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TaskComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  boardId = 0;
  board!: Board;
  lists: List[] = [];
  isLoading = true;

  newList: Partial<List> = { name: '' };
  showNewListInput = false;
  openActionMenuId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('boardId'));
    if (this.boardId) {
      this.newList.boardId = this.boardId;
      this.loadBoard(this.boardId);
      this.loadLists(this.boardId);
    }
  }

  loadBoard(id: number) {
    this.boardService.getBoardById(id).subscribe({
      next: b => this.board = b,
      error: e => console.error(e)
    });
  }

  loadLists(id: number) {
    this.isLoading = true;
    this.listService.getListsByBoard(id).subscribe({
      next: (data) => { this.lists = data; this.isLoading = false; },
      error: (err) => { console.error(err); this.isLoading = false; }
    });
  }

  createList() {
    if (!this.newList.name?.trim()) return;
    const payload = { ...this.newList, boardId: this.boardId } as List;
    this.listService.createList(payload).subscribe({
      next: (l) => { this.lists.push(l); this.newList = { name: '', boardId: this.boardId }; this.showNewListInput = false; },
      error: (err) => console.error(err)
    });
  }

  deleteList(id: number) {
    this.listService.deleteList(id).subscribe({
      next: () => this.lists = this.lists.filter(x => x.id !== id),
      error: (err) => console.error(err)
    });
  }

  toggleActionMenu(listId: number) {
    this.openActionMenuId = this.openActionMenuId === listId ? null : listId;
  }

  editList(list: List) { console.log('Modifier', list); }
  duplicateList(list: List) { console.log('Dupliquer', list); }
  moveList(list: List) { console.log('Déplacer', list); }
  completeList(list: List) { console.log('Terminer', list); }

  @HostListener('document:click', ['$event'])
  clickOutside(e: Event) {
    const el = e.target as HTMLElement;
    if (!el.closest('.list-card') && !el.closest('.relative')) this.openActionMenuId = null;
  }
}
