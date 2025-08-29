import { Task } from './task.model';

export interface List {
  id: number;
  title: string;
  boardId: number;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
}
