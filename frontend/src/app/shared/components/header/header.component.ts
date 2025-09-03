import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showSearch = false;
  searchQuery = '';
  showHelpMenu = false;
  showProfileMenu = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.closeOtherMenus('search');
  }

  toggleHelpMenu() {
    this.showHelpMenu = !this.showHelpMenu;
    this.closeOtherMenus('help');
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.closeOtherMenus('profile');
  }

  closeOtherMenus(except: string) {
    if (except !== 'search') this.showSearch = false;
    if (except !== 'help') this.showHelpMenu = false;
    if (except !== 'profile') this.showProfileMenu = false;
  }

  logout() {
    console.log('Déconnexion…');
  }
}
