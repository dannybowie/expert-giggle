import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, User, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface AppUser {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  canEdit?: boolean;
  isMember?: boolean;
  // Add more fields if needed
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<AppUser | null>(null);

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      this.loggedIn$.next(!!user);
      if (user) {
        // Fetch user profile from Firestore
        const userDoc = doc(this.firestore, 'users', user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          this.user$.next({ uid: user.uid, email: user.email || '', ...userSnap.data() } as AppUser);
        } else {
          // If no profile, fallback to Auth user
          this.user$.next({ uid: user.uid, email: user.email || '' });
        }
      } else {
        this.user$.next(null);
      }
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  currentUser(): Observable<AppUser | null> {
    return this.user$.asObservable();
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    // User state is handled by onAuthStateChanged
  }

  async loginWithGoogle(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/home']);
  }

  canActivate(): boolean {
    const user = this.user$.getValue();
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}