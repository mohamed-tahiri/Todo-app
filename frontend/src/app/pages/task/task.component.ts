import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() listId!: number;

  tasks: Task[] = [];
  loading: boolean = true;
  showTaskForm: boolean = false;

  newTask: Partial<Task> = {
    title: '',
    description: '',
    status: 'TODO',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log(this.listId)
    if (this.listId) this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasksByList(this.listId).subscribe({
      next: data => { this.tasks = data; this.loading = false; },
      error: err => { console.error(err); this.loading = false; }
    });
  }

  toggleTaskForm() {
    this.showTaskForm = !this.showTaskForm;
  }

  createTask() {
    if (!this.newTask.title?.trim()) return;
    const payload: Partial<Task> = {
      title: this.newTask.title!.trim(),
      description: this.newTask.description || '',
      status: (this.newTask.status as TaskStatus) || 'TODO',
      listId: this.listId
    };
    this.taskService.createTask(payload).subscribe({
      next: t => { this.tasks.push(t); this.newTask = { title: '', description: '', status: 'TODO' }; },
      error: err => console.error(err)
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks = this.tasks.filter(x => x.id !== id),
      error: err => console.error(err)
    });
  }
}
