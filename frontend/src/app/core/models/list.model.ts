import { Task } from './task.model';

export interface List {
  id: number;
  name: string;
  position: number;
  boardId: number;
  tasks?: Task[];
  createdAt: Date;
  updatedAt: Date;
}
