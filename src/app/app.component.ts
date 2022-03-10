import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disabled = true;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.classList.add('mat-app-background');
  }
}
