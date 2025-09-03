import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { Board } from '../../../core/models/board.model';

@Component({
  selector: 'app-header-project',
  imports: [
    RouterModule,
    HeaderComponent],
  templateUrl: './header-project.component.html',
  styleUrl: './header-project.component.scss'
})
export class HeaderProjectComponent {
  @Input() board!:Board;
}
