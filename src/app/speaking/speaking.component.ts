import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.css']
})
export class SpeakingComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  name = '';
  email = '';
  organization = '';
  message = '';
  submitted = false;
  error = '';

  private authSub?: Subscription;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  async onSubmit() {
    try {
      const data = {
        name: this.name,
        email: this.email,
        organization: this.organization,
        message: this.message,
        timestamp: new Date()
      };
      console.log('Submitting:', data);
      await addDoc(collection(this.firestore, 'speakingRequests'), data);
      this.submitted = true;
      this.error = '';
    } catch (e) {
      console.error(e);
      this.error = 'There was a problem sending your request. Please try again later.';
    }
  }
}
