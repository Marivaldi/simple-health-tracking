import { Macros } from './macros';
import { FoodItem } from './food-item';
import { TrackedFoodItem } from './tracked-food-item';
import { MealTime } from './enums/meal-time.enum';
import { ThingsIAte } from './things-iate';

export class DietDay {
  _date: Date;
  thingsIAte: ThingsIAte
  macros: Macros;
  weight: number;
  goal: Macros;

  constructor() {
    this._date = new Date();
    this.weight = 0;
    this.macros = new Macros();
    this.goal = new Macros();
    this.thingsIAte = new ThingsIAte();
  }

  get date(): string {
    return `${this._date.getMonth() + 1}/${this._date.getDate()}/${this._date.getFullYear()}`;
  }

  trackAnItem(trackedFoodItem: TrackedFoodItem, mealTime: MealTime) {
    switch (mealTime.toString()) {
      case "Breakfast":
        this.thingsIAte.forBreakfast.push(trackedFoodItem);
        break;
      case "MorningSnack":
        this.thingsIAte.asAMorningSnack.push(trackedFoodItem);
        break;
      case "Lunch":
        console.log("Hey?");
        this.thingsIAte.forLunch.push(trackedFoodItem);
        break;
      case "AfternoonSnack":
        this.thingsIAte.asAnAfternoonSnack.push(trackedFoodItem);
        break;
      case "Dinner":
        this.thingsIAte.forDinner.push(trackedFoodItem);
        break;
      case "Dessert":
        this.thingsIAte.forDessert.push(trackedFoodItem);
        break;
      default:
        break;
    }

    this.macros.add(trackedFoodItem.macros);
  }

  removeATrackedItem(trackedFoodItem: TrackedFoodItem,  mealTime: MealTime) {
    switch (mealTime.toString()) {
      case "Breakfast":
        this.thingsIAte.forBreakfast = this.thingsIAte.forBreakfast.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      case "MorningSnack":
        this.thingsIAte.asAMorningSnack = this.thingsIAte.asAMorningSnack.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      case "Lunch":
        this.thingsIAte.forLunch = this.thingsIAte.forLunch.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      case "AfternoonSnack":
        this.thingsIAte.asAnAfternoonSnack = this.thingsIAte.asAnAfternoonSnack.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      case "Dinner":
        this.thingsIAte.forDinner = this.thingsIAte.forDinner.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      case "Dessert":
        this.thingsIAte.forDessert = this.thingsIAte.forDessert.filter((item: TrackedFoodItem) => item != trackedFoodItem);
        break;
      default:
        break;
    }

    this.macros.remove(trackedFoodItem.macros);
  }

}
