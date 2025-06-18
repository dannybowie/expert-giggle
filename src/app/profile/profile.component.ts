import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email = 'user@example.com'; // Replace with actual user data
  username = 'username';      // Replace with actual user data
  hasPaymentMethod = false;   // Replace with actual logic
  isSubscribed = false;       // Replace with actual logic
  subscriptionEnd?: Date;     // Replace with actual logic

  addPaymentMethod() {
    // Integrate with Stripe/PayPal/etc.
  }

  subscribe() {
    // Integrate with payment/subscription provider
  }

  manageSubscription() {
    // Open subscription management portal
  }
}
