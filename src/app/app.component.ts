import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-End';
  message = 'A message to you';

  isLoggedIn = false; // Replace with your auth logic
  showLoginModal = false;
  showRegisterModal = false;

  constructor() {
    console.log('AppComponent initialized');
  }

  openLoginModal() { this.showLoginModal = true; }
  closeLoginModal() { this.showLoginModal = false; }

  openRegisterModal() { this.showRegisterModal = true; }
  closeRegisterModal() { this.showRegisterModal = false; }
}

