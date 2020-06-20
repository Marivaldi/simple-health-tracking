import { Macros } from './macros';

export class DietDay {
  private _date: Date;
  macros: Macros;
  
  constructor() {
    this._date = new Date();
    this.macros = new Macros();
  }

  get date (): string {
    return `${ this._date.getMonth() + 1 } / ${ this._date.getDate() } / ${ this._date.getFullYear() }`;
  }

  
}
