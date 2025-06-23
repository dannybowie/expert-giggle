import { Component, Output, EventEmitter, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();
  @Output() registered = new EventEmitter<void>();

  email = '';
  password = '';
  confirmPassword = ''; 
  error = '';
  isLoggedIn = false;

  auth = inject(Auth);

  constructor(private firestore: Firestore) {
    user(this.auth).subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      // Optionally store user info
    });
  }

  ngOnInit() {
  }

  async registerWithEmail(email: string, password: string) {
    if (!email || !password || password.length < 6) {
      this.error = 'Please enter a valid email and a password with at least 6 characters.';
      return;
    }
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.registered.emit(); // Notify parent component
      // Optionally close modal or reset form here
    } catch (error: any) {
      this.error = error.message || 'Registration failed.';
      console.error(error);
    }
  }

  async registerWithGoogle() {
    this.error = '';
    try {
      const cred: UserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      // Add user to Firestore (if new)
      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        email: cred.user.email,
        createdAt: new Date(),
        isMember: false
      }, { merge: true });
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  // This is the correct close method
  onClose() {
    this.close.emit();
  }
}
