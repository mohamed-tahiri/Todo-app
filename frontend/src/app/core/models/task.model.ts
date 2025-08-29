export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: Date;
  listId: number;
  assignedTo?: number; // ID de l'utilisateur assigné
  createdAt: Date;
  updatedAt: Date;
}
