export class Macros {
  readonly CALORIES_PER_GRAM_OF_CARB: number = 4;
  readonly CALORIES_PER_GRAM_OF_FAT: number = 9;
  readonly CALORIES_PER_GRAM_OF_PROTEIN: number = 4;
  carbs: number = 0;
  protein: number = 0;
  fats: number = 0;

  get calories(): number {
    const calories_from_carbs = this.carbs * this.CALORIES_PER_GRAM_OF_CARB;
    const calories_from_fats = this.fats * this.CALORIES_PER_GRAM_OF_FAT;
    const calories_from_protein = this.carbs * this.CALORIES_PER_GRAM_OF_PROTEIN;
    return calories_from_carbs + calories_from_fats + calories_from_protein;
  }
}
