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

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = ''; 
  error = '';
  isLoggedIn = false;
  loading = false;
  success = false;

  auth = inject(Auth);

  constructor(private firestore: Firestore) {
    user(this.auth).subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      // Optionally store user info
    });
  }

  ngOnInit() {}

  async registerWithEmail(email: string, password: string) {
    this.error = '';
    this.success = false;
    this.loading = true;
    if (!email || !password || password.length < 6) {
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
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      // Save user info to Firestore
      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        createdAt: new Date(),
        isMember: false,
        canEdit: false // <-- Add this line
      });
      this.success = true;
      // Optionally reset form fields here
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
        createdAt: new Date(),
        isMember: false,
        canEdit: false // <-- Add this line
      }, { merge: true });
      this.close.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  onClose() {
    this.close.emit();
  }
}
