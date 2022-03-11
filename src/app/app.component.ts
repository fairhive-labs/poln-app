import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeMode } from './theme-switch/theme-switch.component';

export const THEME_MODE = btoa('fairhive_landing_page_theme_mode');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disabled = true;
  mode: ThemeMode;
  
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.mode = localStorage.getItem(THEME_MODE) as ThemeMode || ThemeMode.Dark;
    this.enableMode(this.mode);
  }

  enableMode(mode: ThemeMode) {
    this.mode = mode;
    localStorage.setItem(THEME_MODE, mode); //store theme mode in local storage

    switch (mode) {
      case ThemeMode.Dark: {
        this.document.documentElement.classList.add('dark-theme', 'mat-app-background');
        break;
      }
      case ThemeMode.Light: {
        this.document.documentElement.classList.remove('dark-theme', 'mat-app-background');
        break;
      }
    }
  }
}
