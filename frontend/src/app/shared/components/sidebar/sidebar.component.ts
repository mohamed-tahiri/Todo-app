import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  open?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  collapsed = false;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-home',
      route: '/dashboard',
    },
    {
      label: 'Projects',
      icon: 'fas fa-briefcase',
      children: [
        { label: 'All Projects', icon: 'fas fa-list', route: '/projects' },
        { label: 'New Project', icon: 'fas fa-plus', route: '/projects/new' },
      ],
      open: false,
    },
    {
      label: 'Tasks',
      icon: 'fas fa-tasks',
      children: [
        { label: 'My Tasks', icon: 'fas fa-user', route: '/tasks/my' },
        { label: 'Team Tasks', icon: 'fas fa-users', route: '/tasks/team' },
      ],
      open: false,
    },
    {
      label: 'Settings',
      icon: 'fas fa-cog',
      route: '/settings',
    },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleSubMenu(item: MenuItem) {
    if (item.children) {
      item.open = !item.open;
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  logout() {
    // Ici, on peut gérer la déconnexion (clear token, redirect, etc.)
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
