import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.css']
})
export class SpeakingComponent {
  name = '';
  email = '';
  organization = '';
  message = '';
  submitted = false;
  error = '';

  async onSubmit() {
    // Example: Use EmailJS, Formspree, or your backend API here
    try {
      // await sendEmail(this.name, this.email, this.organization, this.message);
      this.submitted = true;
      this.error = '';
    } catch (e) {
      this.error = 'There was a problem sending your request. Please try again later.';
    }
  }
}
