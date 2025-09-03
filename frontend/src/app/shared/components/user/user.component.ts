import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  @Input() userId!: number;

  user!: User;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userId) this.loadUser(this.userId);
  }

  loadUser(taskId: number) {
    this.loading = true;
    this.userService.getUserById(taskId).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

}
