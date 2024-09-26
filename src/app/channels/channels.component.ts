import { Component } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

type WeatherStat = {
  id: number;
  channel: string;
  days_out: number;
  delta_high: number;
  delta_low: number;
  delta_weather: number;
  max_delta_high: number;
  max_delta_low: number;
  max_delta_weather: number;
}

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [UpperCasePipe, HttpClientModule],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.css'
})

export class ChannelsComponent {
  weatherStats: WeatherStat[] = []
  constructor(private http: HttpClient) {}
  getData() {
    console.log('asdf');
    this.http.get<WeatherStat[]>('http://weather-api:5555/')
      .subscribe((data: WeatherStat[]) => {
        this.weatherStats = data
      })
  }
}
