import { List } from './list.model';

export interface Board {
  id: number;
  name: string;
  description?: string;
  createdById?: number;
  listIds?: List[];
  createdAt: Date;
  updatedAt: Date;
}
