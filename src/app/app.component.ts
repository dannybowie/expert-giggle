import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink], // Add RouterLink here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   // <-- Fix typo here
})
export class AppComponent {
  title = 'Front-End';
  message = 'A message to you';

  constructor() {
    console.log('AppComponent initialized');
  }


}
