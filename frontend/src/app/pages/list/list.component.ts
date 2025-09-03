import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { Board } from '../../core/models/board.model';
import { List } from '../../core/models/list.model';
import { BoardService } from '../../core/services/board.service';
import { ListService } from '../../core/services/list.service';
import { TaskComponent } from '../../shared/components/task/task.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../core/services/task.service';
import { Task, TaskStatus } from '../../core/models/task.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeaderProjectComponent } from '../../shared/components/header-project/header-project.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TaskComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    HeaderProjectComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  boardId = 0;
  board!: Board;
  lists: List[] = [];
  isLoading = true;
  showTaskForm = false;
  listId = 0; 

  newList: Partial<List> = { name: '' };
  newTask: Partial<Task> = { title: '', description: '', status: 'TODO' };
  showNewListInput = false;
  openActionMenuId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private listService: ListService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('boardId'));
    if (this.boardId) {
      this.newList.boardId = this.boardId;
      this.loadBoard(this.boardId);
      this.loadLists(this.boardId);
    }
  }

  toggleTaskForm(listId: number) {
    this.listId = listId;
    this.showTaskForm = !this.showTaskForm;
  }

  toggleListForm() {
    this.showNewListInput = !this.showNewListInput;
  }

  loadBoard(id: number) {
    this.boardService.getBoardById(id).subscribe({
      next: (b) => (this.board = b),
      error: (e) => console.error(e),
    });
  }

  loadLists(id: number) {
    this.isLoading = true;
    this.listService.getListsByBoard(id).subscribe({
      next: (data) => {
        this.lists = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  drop(event: CdkDragDrop<number, any, any>) {
    const previousListId = event.previousContainer.data;
    const currentListId = event.container.data;
    const draggedTask = event.item.data;

    if (event.previousContainer !== event.container) {
      // 1. Find the previous list
      const previousList = this.lists.find((l) => l.id === previousListId);
      if (previousList?.taskIds) {
        previousList.taskIds = previousList.taskIds.filter((t) => t !== draggedTask);
      }

      // 2. Find the current list
      const currentList = this.lists.find((l) => l.id === currentListId);
      if (currentList?.taskIds) {
        currentList.taskIds.splice(event.currentIndex, 0, draggedTask);
      }

      // D'abord, récupérer la tâche à jour
      this.taskService.getTasksById(draggedTask).subscribe({
        next: (taskData: Task) => {
          // On met à jour seulement le champ listId, mais on garde les autres
          const updatedTask: Task = {
            ...taskData,
            listId: currentListId,
          };
          this.taskService.updateTask(draggedTask, updatedTask).subscribe({
            next: (result) => console.log('Task updated:', result),
            error: (err) => console.error('Update failed:', err),
          });
        },
        error: (err) => console.error('Fetch failed:', err),
      });
    }
  }

  createTask(listId: number) {
    if (!this.newTask.title?.trim()) return;
    const payload: Partial<Task> = {
      title: this.newTask.title!.trim(),
      description: this.newTask.description || '',
      status: (this.newTask.status as TaskStatus) || 'TODO',
      listId: listId,
    };
    this.taskService.createTask(payload).subscribe({
      next: (t) => {
        this.loadLists(this.boardId);
      },
      error: (err) => console.error(err),
    });
  }

  createList() {
    if (!this.newList.name?.trim()) return;
    const payload = { ...this.newList, boardId: this.boardId } as List;
    this.listService.createList(payload).subscribe({
      next: (l) => {
        this.lists.push({ ...l, taskIds: [] });
        this.newList = { name: '', boardId: this.boardId };
        this.showNewListInput = false;
      },
      error: (err) => console.error(err),
    });
  }

  deleteList(id: number) {
    this.listService.deleteList(id).subscribe({
      next: () => (this.lists = this.lists.filter((x) => x.id !== id)),
      error: (err) => console.error(err),
    });
  }

  toggleActionMenu(listId: number) {
    this.openActionMenuId = this.openActionMenuId === listId ? null : listId;
  }

  duplicateList(list: List) {
    console.log(list);
  }

  editList(list: List) {
    console.log(list);
  }

  moveList(listId: number) {
    console.log(listId);
  }

  completeList(listId: number) {
    console.log(listId);
  }
}
