import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // <-- Add RouterLinkActive
import { NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive, // <-- Add this line
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
  showAuthModal = false;
  isLoginMode = true; // true = login, false = register

  constructor() {
    console.log('AppComponent initialized');
  }

  openAuthModal(mode: 'login' | 'register' = 'login') {
    this.showAuthModal = true;
    this.isLoginMode = (mode === 'login');
    console.log('openAuthModal called, isLoginMode:', this.isLoginMode);
  }

  closeAuthModal() {
    console.log('closeAuthModal called');
    this.showAuthModal = false;
  }

  switchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log('switchAuthMode called, isLoginMode:', this.isLoginMode);
  }
}

