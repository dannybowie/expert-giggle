import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface AppUser {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  canEdit?: boolean;
  isMember?: boolean; 
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<AppUser | null>(null);

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, async (user: FirebaseUser | null) => {
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

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  currentUser() {
    return this.user$.asObservable();
  }
}