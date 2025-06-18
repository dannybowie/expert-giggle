import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
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

  email = '';
  password = '';
  confirmPassword = ''; 
  error = '';

  constructor(private auth: Auth, private firestore: Firestore) {}

  async registerWithEmail() {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
    try {
      const cred: UserCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      // Add user to Firestore
      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        email: this.email,
        createdAt: new Date(),
        isMember: false // or any default fields you want
      });
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
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
