import { Macros } from './macros';
import { TrackedFoodItem } from './tracked-food-item';

export class FoodItem {
  name: string = "I need a name";
  macros: Macros = new Macros();
  servingSize: number = 0;

  // track(amount: number): TrackedFoodItem {
  //   const trackedItem = Object.assign(new TrackedFoodItem(), this);
  //   trackedItem.macros = this.getMacrosFor(amount);
  //   trackedItem.amount = amount;
  //   return trackedItem;
  // }

  getMacrosFor(amount: number) {
    const percentageOfServing: number = amount / this.servingSize;
    const actual = new Macros();
    actual.protein = this.round(this.macros.protein * percentageOfServing);
    actual.fats = this.round(this.macros.fats * percentageOfServing);
    actual.carbs = this.round(this.macros.carbs * percentageOfServing);
    return actual;
  }

  private round(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
