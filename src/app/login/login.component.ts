import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

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

  constructor(private auth: Auth, private firestore: Firestore) {}

  async loginWithEmail() {
    this.error = '';
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async loginWithGoogle() {
    this.error = '';
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async loginWithUsername() {
    this.error = '';
    try {
      // Query Firestore for the user with this username
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('username', '==', this.username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.error = 'Username not found.';
        return;
      }

      // Get the email from the user document
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as any;
      const email = userData.email;

      // Now log in with email and password
      await signInWithEmailAndPassword(this.auth, email, this.password);
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  onClose() {
    this.close.emit();
  }
}
