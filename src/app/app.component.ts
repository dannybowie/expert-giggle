import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { getDoc, doc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AuthService, AppUser } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front-End';
  message = 'A message to you';

  isLoggedIn = false;
  showAuthModal = false;
  isLoginMode = true;
  displayName = '';
  firstName = '';
  showMenu = false;
  showMobileMenu = false;
  toastMessage = '';
  toastTimeout: any;

  currentUser: AppUser | null = null;
  canEdit = false;
  accessDenied = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth,
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0 });
        }
      });

    // Listen for auth state changes
    onAuthStateChanged(this.auth, async user => {
      this.isLoggedIn = !!user;
      if (user) {
        // Try to get displayName from user object or Firestore
        this.displayName = user.displayName ?? (await this.getNameFromFirestore(user.uid)) ?? user.email ?? '';
        // Set firstName
        this.firstName = await this.getFirstName(user);
      } else {
        this.displayName = '';
        this.firstName = '';
      }
    });

    this.authService.currentUser().subscribe((user: AppUser | null) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
      this.canEdit = !!(user as any)?.canEdit;
      if (!user?.isMember) {
        this.accessDenied = true;
        return;
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

  // Helper to get name from Firestore if not in user object
  async getNameFromFirestore(uid: string): Promise<string> {
    const userDoc = await getDoc(doc(this.firestore, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return [data['firstName'], data['lastName']].filter(Boolean).join(' ');
    }
    return '';
  }

  // Helper to get first name from user or Firestore
  async getFirstName(user: any): Promise<string> {
    if (user.displayName) {
      return user.displayName.split(' ')[0];
    }
    const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data['firstName'] || '';
    }
    return '';
  }

  showToast(message: string, duration = 3000) {
    this.toastMessage = message;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, duration);
  }

  async logout() {
    await this.auth.signOut();
    this.showMenu = false;
    this.showToast('You are now logged out');
  }
}

