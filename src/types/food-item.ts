import { Macros } from './macros';

export class FoodItem {
  name: string = "I need a name";
  macros: Macros = new Macros();
  servingSize: number = 0;
  
  getMacrosFor(amount: number) {
    const percentageOfServing: number = amount / this.servingSize;
    const actual = new Macros();
    actual.protein = (this.macros.protein * percentageOfServing);
    actual.fats = (this.macros.fats * percentageOfServing);
    actual.carbs = (this.macros.fats * percentageOfServing);
    return actual;
  }
}
