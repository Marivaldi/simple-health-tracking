import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodLogTableComponent } from './food-log-table/food-log-table.component';
import { PantryComponent } from './pantry/pantry.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodLogTableComponent,
    PantryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
