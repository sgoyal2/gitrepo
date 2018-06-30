import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { ForcastWeatherComponent } from './forcast-weather/forcast-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForcastWeatherComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
