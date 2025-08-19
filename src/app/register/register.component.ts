import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, UserCredential } from '@angular/fire/auth';
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

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = ''; 
  error = '';
  isLoggedIn = false;
  loading = false;
  success = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {}

  async registerWithEmail() {
    this.error = '';
    this.success = false;
    this.loading = true;
    if (!this.email || !this.password || this.password.length < 6) {
      this.error = 'Please enter a valid email and a password with at least 6 characters.';
      this.loading = false;
      return;
    }
    if (!this.firstName || !this.lastName) {
      this.error = 'Please enter your first and last name.';
      this.loading = false;
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.loading = false;
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      // Set displayName in Firebase Auth profile
      await updateProfile(cred.user, {
        displayName: `${this.firstName} ${this.lastName}`
      });
      // Save user info to Firestore
      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        createdAt: new Date(),
        isMember: false,
        canEdit: false
      });
      this.success = true;
      this.registered.emit();
      // Optionally reset fields
      this.firstName = this.lastName = this.email = this.password = this.confirmPassword = '';
    } catch (error: any) {
      this.error = error.message || 'Registration failed.';
    } finally {
      this.loading = false;
    }
  }

  async registerWithGoogle() {
    this.error = '';
    try {
      const cred: UserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      // Add user to Firestore (if new)
      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        email: cred.user.email,
        firstName: cred.user.displayName?.split(' ')[0] || '',
        lastName: cred.user.displayName?.split(' ').slice(1).join(' ') || '',
        createdAt: new Date(),
        isMember: false,
        canEdit: false
      }, { merge: true });
      this.success = true;
      this.registered.emit();
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  onClose() {
    this.close.emit();
  }
}