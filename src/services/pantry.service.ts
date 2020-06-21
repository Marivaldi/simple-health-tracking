import { Injectable } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { Macros } from 'src/types/macros';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  private readonly data_key: string = "my_pantry";
  
  constructor() { }

  save(foodItems: FoodItem[]): void {
    localStorage.setItem(this.data_key, JSON.stringify(foodItems));
  }

  load(): FoodItem[] {
    const json: string = localStorage.getItem(this.data_key);
    if (!json) return [this.example, this.example];

    const foodItems: FoodItem[] = JSON.parse(json) as FoodItem[];
    return this.convert(foodItems);
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

}
