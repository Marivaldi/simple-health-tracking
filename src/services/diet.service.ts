import { Injectable } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { Macros } from 'src/types/macros';
import { TrackedFoodItem } from 'src/types/tracked-food-item';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private readonly data_key: string = "super_fun_diet_stuff";

  constructor() {
    const existingDays: DietDay[] = this.load();
    if (!existingDays || existingDays.length === 0) {
      this.seedDays();
    }

  }

  save(dietDays: DietDay[]): void {
    localStorage.setItem(this.data_key, JSON.stringify(dietDays));
  }

  load(): DietDay[] {
    const json: string = localStorage.getItem(this.data_key);
    if (!json) return [];

    const dietDays = JSON.parse(json) as DietDay[];
    return this.convert(dietDays);
  }

  loadHistorical(): DietDay[] {
    const allDays: DietDay[] = this.load();
    const sortedDays = allDays.slice().sort((a, b) => a._date.getTime() - b._date.getTime());
    const indexOfToday: number = sortedDays.findIndex((day: DietDay) => this.isToday(day));
    const relevantDays = sortedDays.slice(0, indexOfToday);
    return this.convert(relevantDays);
  }

  loadForTracking(): DietDay[] {
    const allDays: DietDay[] = this.load();
    const sortedDays = allDays.slice().sort((a, b) => a._date.getTime() - b._date.getTime());
    const indexOfToday: number = sortedDays.findIndex((day: DietDay) => this.isToday(day));
    const relevantDays = sortedDays.slice(indexOfToday - 1, (sortedDays.length - 1));
    return this.convert(relevantDays);
  }

  private seedDays() {
    const seededDietDays: DietDay[] = [];
    const today = new Date();

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dietYesterday: DietDay = new DietDay();
    dietYesterday._date = yesterday;
    seededDietDays.push(dietYesterday);


    const dietToday: DietDay = new DietDay();
    dietToday._date = today;
    seededDietDays.push(dietToday);

    for (let i = 1; i <= 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const nextDietDay: DietDay = new DietDay();
      nextDietDay._date = nextDay;
      seededDietDays.push(nextDietDay);
    }


    this.save(seededDietDays);
  }



  private convert(dietDays: DietDay[]) {
    return dietDays.map((day) => {
      const mappedDay = Object.assign(new DietDay(), day);
      mappedDay.macros = Object.assign(new Macros(), day.macros);
      mappedDay.goal = Object.assign(new Macros(), day.goal);
      mappedDay._date = new Date(day._date);
      mappedDay.thingsIAte = this.convertTrackedFoodItems(day.thingsIAte);
      return mappedDay;
    });
  }

  private convertTrackedFoodItems(trackedFoodItems: TrackedFoodItem[]) {
    return trackedFoodItems.map((item) => {
      const mappedItem = Object.assign(new TrackedFoodItem(), item);
      mappedItem.macros = Object.assign(new Macros(), item.macros);
      return mappedItem;
    })
  }

  private isToday(day: DietDay) {
    const today = new Date();
    return day._date.getDate() == today.getDate() &&
      day._date.getMonth() == today.getMonth() &&
      day._date.getFullYear() == today.getFullYear()
  }
}
