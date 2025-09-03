import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { ListComponent } from './pages/list/list.component';
import { TrashComponent } from './pages/trash/trash.component';
import { PeopleComponent } from './pages/people/people.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivityComponent as ActivityProjectComponent  } from './pages/projects/activity/activity.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { DiscussionsComponent } from './pages/projects/discussions/discussions.component';
import { FilesComponent } from './pages/projects/files/files.component';
import { NotesComponent } from './pages/projects/notes/notes.component';
import { TimeRecordsComponent } from './pages/projects/time-records/time-records.component';
import { ExpensesComponent } from './pages/projects/expenses/expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: BoardComponent },
  { path: 'my-work', component: MyWorkComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'trash', component: TrashComponent },
  {
    path: 'projects/:boardId',
    children: [
      { path: '', component: ListComponent },
      { path: 'discussions', component: DiscussionsComponent },
      { path: 'files', component: FilesComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'time-records', component: TimeRecordsComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'activity', component: ActivityProjectComponent },
    ]
  },
  { path: '**', redirectTo: 'projects' },
];
