import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogHistoryComponent } from './log-history/log-history.component';
import { PantryComponent } from './pantry/pantry.component';
import { FoodItemModalComponent } from './food-item-modal/food-item-modal.component';
import { TrackingJournalComponent } from './tracking-journal/tracking-journal.component';
import { TrackedDayComponent } from './tracked-day/tracked-day.component';
import { TrackModalComponent } from './track-modal/track-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LogHistoryComponent,
    PantryComponent,
    FoodItemModalComponent,
    TrackingJournalComponent,
    TrackedDayComponent,
    TrackModalComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
