import { Component } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  imports: [],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  currentPage: string;

  constructor() {
    this.currentPage = 'auth-home';
  }

  ChangePage(page: string) {
    this.currentPage = page;
  }
}
