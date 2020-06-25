import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { Meal } from 'src/types/meal';
import { Macros } from 'src/types/macros';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private readonly meals_url: string = "https://72mtzp9aq7.execute-api.us-east-1.amazonaws.com/dev/meals";
  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  save(meals: Meal[]): Observable<Meal[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict), 
    };
    return this.http.post<Meal[]>(this.meals_url, meals,  requestOptions);
  }

  load(): Observable<Meal[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict), 
    };
    return this.http.get<Meal[]>(this.meals_url, requestOptions).pipe(map((value: Meal[]) => this.convert(value)));
  }

  private convert(meals: Meal[]) {
    return meals.map((meal) => {
      const mappedItem = Object.assign(new Meal(), meal);
      mappedItem.foodItems = this.convertTrackedFoodItems(meal.foodItems);
      return mappedItem;
    });
  }

  private convertTrackedFoodItems(trackedFoodItems: TrackedFoodItem[]) {
    if(!trackedFoodItems) return [];

    return trackedFoodItems.map((item) => {
      const mappedItem = Object.assign(new TrackedFoodItem(), item);
      mappedItem.macros = Object.assign(new Macros(), item.macros);
      return mappedItem;
    })
  }

  private get headerDict() {
    return {
      'Content-Type': 'application/json',
      Authorization: this.authorizationService.getToken(),
    }
  }
}
