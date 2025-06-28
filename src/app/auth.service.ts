import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.loggedIn$.next(!!user);
      this.user$.next(user);
    });
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  currentUser() {
    return this.user$.asObservable();
  }
}