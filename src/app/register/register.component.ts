import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  email = '';
  password = '';
  error = '';

  constructor(private auth: Auth) {}

  async registerWithEmail() {
    this.error = '';
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.closed.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async registerWithGoogle() {
    this.error = '';
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.closed.emit();
    } catch (err: any) {
      this.error = err.message;
    }
  }

  close() {
    this.closed.emit();
  }
}
