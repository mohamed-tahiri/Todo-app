import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-trash',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss',
})
export class TrashComponent {
  // États pour les menus
  showSearch = false;
  showHelpMenu = false;
  showProfileMenu = false;
  searchQuery = '';

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
    console.log('Déconnexion...');
    // TODO: Implémenter la déconnexion réelle ici
  }
}
