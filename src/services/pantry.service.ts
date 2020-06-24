import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodItem } from 'src/types/food-item';
import { Macros } from 'src/types/macros';
import { switchMap, endWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  private readonly data_key: string = "my_pantry";
  private readonly pantry_url: string = "https://72mtzp9aq7.execute-api.us-east-1.amazonaws.com/dev/pantry";
  
  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  save(foodItems: FoodItem[]): Observable<FoodItem[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict), 
    };
    return this.http.post<FoodItem[]>(this.pantry_url, foodItems,  requestOptions);
  }

  load(): Observable<FoodItem[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict), 
    };
    return this.http.get<FoodItem[]>(this.pantry_url, requestOptions).pipe(map((value: FoodItem[]) => this.convert(value)));
  }

  get example(): FoodItem {
    return new FoodItem();
  }

  convert(foodItems: FoodItem[]) {
    return foodItems.map((item) => {
      const mappedItem = Object.assign(new FoodItem(), item);
      mappedItem.macros = Object.assign(new Macros(), item.macros);
      return mappedItem;
    });
  }

  private get headerDict() {
    return {
      'Content-Type': 'application/json',
      Authorization: this.authorizationService.getToken(),
    }
  }

}
