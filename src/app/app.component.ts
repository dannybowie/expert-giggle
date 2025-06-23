import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // <-- Add RouterLinkActive
import { NgIf, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0 }); // or just window.scrollTo(0, 0);
        }
      });
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

  onUserRegistered() {
    this.showRegisterModal = false;
    this.isLoggedIn = true; // Or update your auth state accordingly
    // Optionally fetch user info or redirect
  }
}

