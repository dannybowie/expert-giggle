import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();

  email = '';
  password = '';
  error = '';
  username = '';
  resetEmailSent = false;

  constructor(
    public afAuth: AngularFireAuth,
    private auth: Auth, 
    private firestore: Firestore) {}

  getFriendlyError(error: any): string {
    if (!error || !error.code) return 'An unknown error occurred. Please try again.';
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/popup-closed-by-user':
        return 'The sign-in popup was closed before completing sign in.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'Login failed. Please check your credentials and try again.';
    }
  }

  async loginWithEmail() {
    this.error = '';
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.close.emit();
    } catch (err: any) {
      this.error = this.getFriendlyError(err);
    }
  }

  async loginWithGoogle() {
    this.error = '';
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.close.emit();
    } catch (err: any) {
      this.error = this.getFriendlyError(err);
    }
  }

  async loginWithUsername() {
    this.error = '';
    try {
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('username', '==', this.username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.error = 'Username not found.';
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as any;
      const email = userData.email;

      await signInWithEmailAndPassword(this.auth, email, this.password);
      this.close.emit();
    } catch (err: any) {
      this.error = this.getFriendlyError(err);
    }
  }

  forgotPassword() {
    if (!this.email) {
      this.error = 'Please enter your email address first';
      return;
    }
    
    this.error = '';  // Empty string instead of null
    this.resetEmailSent = false;
    
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.resetEmailSent = true;
        // Reset after 5 seconds
        setTimeout(() => {
          this.resetEmailSent = false;
        }, 5000);
      })
      .catch(error => {
        switch(error.code) {
          case 'auth/user-not-found':
            this.error = 'No user found with this email address';
            break;
          case 'auth/invalid-email':
            this.error = 'Please enter a valid email address';
            break;
          default:
            this.error = 'Error sending password reset email. Please try again.';
            console.error('Password reset error:', error);
        }
      });
  }

  onClose() {
    this.close.emit();
  }
}
