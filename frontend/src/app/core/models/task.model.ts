export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  position: number;
  listId: number;
  assignedToId: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
