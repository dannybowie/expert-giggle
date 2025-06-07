import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // <-- fix here
})
export class AppComponent {
  title = 'profileBowie';

  onTestClick() {
    console.log('Nav link clicked!');
  }
}
