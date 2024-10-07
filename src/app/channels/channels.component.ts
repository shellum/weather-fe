import { Component } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import type { EChartsOption, SeriesOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

type WeatherStat = {
  id: number;
  channel: string;
  days_out: number;
  high_delta: number;
  low_delta: number;
  weather_delta: number;
  max_delta_high: number;
  max_delta_low: number;
  max_delta_weather: number;
}

type WeatherStatAccumulator = {
  [key: string]: WeatherStat[];
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
        var channel_dict = this.weatherStats.reduce((acc: WeatherStatAccumulator, stat: WeatherStat) => {
          if (acc[stat.channel]) {
            acc[stat.channel].push(stat)
          }
          else {
            acc[stat.channel] = [stat]
          }
          return acc
        }, {})
        this.chartOption = this.getNewChartOptions(channel_dict)
      })
  }

  chartOption: EChartsOption = {}
  
  getNewChartOptions(channel_dict: WeatherStatAccumulator) : EChartsOption {
    // TODO: extract to utility with a reducer argument
    var chan2High: number[] = [], chan5High: number[] = []
    const seriesData: SeriesOption[] = []
    Object.keys(channel_dict).forEach((channel: string) => {
      var graphData = channel_dict[channel].map(stat => stat.high_delta) || []
      seriesData.push({
        name: channel,
        type: 'bar',
        data: graphData
      })
    })
    const options: EChartsOption = {
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
      series: seriesData,
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
    }
  return options;
  };
}
