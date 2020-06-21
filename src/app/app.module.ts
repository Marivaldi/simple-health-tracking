import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { PantryComponent } from './pantry/pantry.component';
import { FoodItemModalComponent } from './food-item-modal/food-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyLogComponent,
    PantryComponent,
    FoodItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
