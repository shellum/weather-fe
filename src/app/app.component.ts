import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChannelsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-fe';
}
