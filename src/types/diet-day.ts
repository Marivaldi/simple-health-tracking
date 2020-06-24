import { Macros } from './macros';
import { FoodItem } from './food-item';
import { TrackedFoodItem } from './tracked-food-item';

export class DietDay {
  _date: Date;
  thingsIAte: TrackedFoodItem[] = []
  macros: Macros;
  weight: number;
  goal: Macros;

  constructor() {
    this._date = new Date();
    this.weight = 0;
    this.macros = new Macros();
    this.goal = new Macros();
    this.thingsIAte = [];
  }

  get date (): string {
    return `${ this._date.getMonth() + 1 }/${ this._date.getDate() }/${ this._date.getFullYear() }`;
  }

  trackAnItem(trackedFoodItem: TrackedFoodItem) {
    this.thingsIAte.push(trackedFoodItem);
    this.macros.add(trackedFoodItem.macros);
  }

  removeATrackedItem(trackedFoodItem: TrackedFoodItem) {
    this.thingsIAte = this.thingsIAte.filter((item: TrackedFoodItem) => item != trackedFoodItem);
    this.macros.remove(trackedFoodItem.macros);
  }

}
