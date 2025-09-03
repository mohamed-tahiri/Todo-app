export interface List {
  id: number;
  name: string;
  position: number;
  boardId: number;
  taskIds?: number[];
  createdAt: Date;
  updatedAt: Date;
}
