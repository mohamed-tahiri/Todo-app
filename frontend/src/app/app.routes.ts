import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { ListComponent } from './pages/list/list.component';
import { TaskComponent } from './pages/task/task.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'boards', pathMatch: 'full' },
  { path: 'boards', component: BoardComponent },
  { path: 'lists/:boardId', component: ListComponent },
  { path: '**', redirectTo: 'boards' }
];
