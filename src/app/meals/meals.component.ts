import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/types/meal';
import { MealService } from 'src/services/meal.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  meals: Meal[] = [];
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.load().subscribe((meals) => this.meals = meals);
  }

}
