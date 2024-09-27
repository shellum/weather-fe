import { Component } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

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
  imports: [UpperCasePipe, HttpClientModule, NgxEchartsDirective],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.css',
  providers: [provideEcharts()]
})

export class ChannelsComponent {
  weatherStats: WeatherStat[] = []
  constructor(private http: HttpClient) {}
  getData() {
    console.log('asdf');
    this.http.get<WeatherStat[]>('http://192.168.3.251:32256/')
      .subscribe((data: WeatherStat[]) => {
        this.weatherStats = data
      })
  }
  chartOption: EChartsOption = {
    title: {
      text: 'Static test: High temperature forecast error by channel',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['0 days out', '1 day out', '2 days out', '3 days out', '4 days out', '5 days out', '6 days out']
    },
    series: [
      {
        name: 'chan2',
        type: 'bar',
        data: [3,6,5,8,1,2,5]
      },
      {
        name: 'chan5',
        type: 'bar',
        data: [6,8,9,5,7,8,6]
      }
    ]
    // xAxis: {
    //   type: 'category',
    //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    // },
    // yAxis: {
    //   type: 'value',
    // },
    // series: [
    //   {
    //     data: [820, 932, 901, 934, 1290, 1330, 1320],
    //     type: 'line',
    //   },
    // ],
  };
}
