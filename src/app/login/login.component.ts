import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

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

  constructor(private auth: Auth) {}

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

  onClose() {
    this.close.emit();
  }
}
