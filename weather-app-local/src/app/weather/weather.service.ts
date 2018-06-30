import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICurrentWeather } from '../interfaces/icurrent-weather';
import { map } from 'rxjs/operators'
import { IForcastWeather } from '../interfaces/iforcast-weather';


interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: Date,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  forecast :ICurrentWeather [] =[]
  currentWeather : ICurrentWeather
  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(city: string, country: string) {
    const newLocal = this.httpClient.get<ICurrentWeatherData>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.apiId}`);
    return newLocal.pipe(map(data => this.transformToCurrentWeather(data)))
  }

  private transformToCurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    const current = {
      city: data.name,
      country: data.sys.country,
      date: new Date(),
      image: `${environment.imageUrl}${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
     
    return current;
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return 9 / 5 * (kelvin - 273) + 32
  }

    getForcastWeather(city: string, country: string) {
      return this.httpClient.get<IForcastWeather>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/forecast?` +
        `q=${city},${country}&units=imperial&appid=${environment.apiId}`)
      .pipe(map(data => this.transformForecastWeather(data)));
    }

    
    private transformForecastWeather(data: IForcastWeather): ICurrentWeather [] {
      
        for(let i=0; i<data.list.length; i= i+8){
          const forecastWeather = {city: data.city.name,
                                  country: data.city.country,
                                  description: data.list[i].weather[0].description,
                                  temperature: data.list[i].main.temp,
                                  date: data.list[i].dt_txt,
                                  image: `${environment.imageUrl}${data.list[i].weather[0].icon}.png`,
          };
          console.log(forecastWeather);
          this.forecast.push(forecastWeather);
          }
          console.log(this.forecast);
          return this.forecast;
      }
  }