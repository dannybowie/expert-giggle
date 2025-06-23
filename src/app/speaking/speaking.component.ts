import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.css']
})
export class SpeakingComponent {
  @Input() isLoggedIn = false;

  name = '';
  email = '';
  organization = '';
  message = '';
  submitted = false;
  error = '';

  constructor(private firestore: Firestore) {}

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
