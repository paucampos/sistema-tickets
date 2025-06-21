import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <app-header *ngIf="!esLogin()"></app-header>
    <router-outlet></router-outlet>
  `
})
export class App {
  constructor(private router: Router) {}

  esLogin(): boolean {
    return this.router.url === '/login';
  }
}
