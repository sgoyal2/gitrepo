import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ICurrentWeather } from '../interfaces/icurrent-weather';

@Component({
  selector: 'app-forcast-weather',
  templateUrl: './forcast-weather.component.html',
  styleUrls: ['./forcast-weather.component.css']
})
export class ForcastWeatherComponent implements OnInit {
  
  forecastWeathers :ICurrentWeather []
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getForcastWeather('Seattle', 'US').subscribe((data) => this.forecastWeathers = data)
  }

}
