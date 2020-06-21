import { Macros } from './macros';
import { FoodItem } from './food-item';

export class DietDay {
  _date: Date;
  thingsIAte: FoodItem[] = []
  macros: Macros;
  
  constructor() {
    this._date = new Date();
    this.macros = new Macros();
    this.thingsIAte = [];
  }

  get date (): string {
    return `${ this._date.getMonth() + 1 }/${ this._date.getDate() }/${ this._date.getFullYear() }`;
  }

  
}
