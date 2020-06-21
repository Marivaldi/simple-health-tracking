import { Injectable } from '@angular/core';
import { DietDay } from 'src/types/diet-day';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private readonly data_key: string = "super_fun_diet_stuff";
  
  constructor() { }

  save(dietDays: DietDay[]): void {
    localStorage.setItem(this.data_key, JSON.stringify(dietDays));
  }

  load(): DietDay[] {
    const json: string = localStorage.getItem(this.data_key);
    if (!json) return [this.example];

    return JSON.parse(json) as DietDay[];
  }

  private get example() : DietDay  {
    let exampleDay = new DietDay();
    exampleDay.macros.carbs = 110
    exampleDay.macros.fats = 80;
    exampleDay.macros.protein = 140;
    return exampleDay;
  }
  
}
