import { Component, OnInit, OnDestroy } from '@angular/core';
import { DietService } from 'src/services/diet.service';
import { DietDay } from 'src/types/diet-day';
import { interval, timer, Subscription } from 'rxjs';
import { PantryService } from 'src/services/pantry.service';
import { FoodItem } from 'src/types/food-item';
import { MealService } from 'src/services/meal.service';
import { Meal } from 'src/types/meal';

@Component({
  selector: 'app-tracking-journal',
  templateUrl: './tracking-journal.component.html',
  styleUrls: ['./tracking-journal.component.scss']
})
export class TrackingJournalComponent implements OnInit, OnDestroy {
  trackingDays: DietDay[] = [];
  pantryOptions: FoodItem[] = [];
  mealOptions: Meal[] = [];
  subscription: Subscription ;
  constructor(private dietService: DietService, private pantryService: PantryService, private mealService: MealService) { }

  ngOnInit(): void {
    this.dietService.loadForTracking().subscribe((trackingDays) => this.trackingDays = trackingDays);
    this.fetchPantryOptions();
    this.fetchMealOptions();
    // Juuuuust in case... Every two hours, grab the new data.
    // This will have the effect of appending a new day to the end if it is a new day
    // and setting the current day as what is focused in the main pane. Not great, but w/e.
    // const secondsCounter = interval(7.2e+6);
    // this.subscription = secondsCounter.subscribe((n) => this.trackingDays = this.dietService.loadForTracking());
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  saveCurrentState() {
    this.dietService.saveTrackedDays(this.trackingDays).subscribe((days) => {
      this.dietService.loadForTracking().subscribe((trackingDays) => this.trackingDays = trackingDays);
    });
  }

  fetchPantryOptions() {
    this.pantryService.load().subscribe((foodItems: FoodItem[]) => {
      this.pantryOptions = foodItems;
    });
  }

  fetchMealOptions() {
    this.mealService.load().subscribe((meals: Meal[]) => {
      this.mealOptions = meals;
    });
  }
}
