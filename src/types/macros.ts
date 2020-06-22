export class Macros {
  private static readonly CALORIES_PER_GRAM_OF_CARB: number = 4;
  private static readonly CALORIES_PER_GRAM_OF_FAT: number = 9;
  private static readonly CALORIES_PER_GRAM_OF_PROTEIN: number = 4;
  carbs: number = 0;
  protein: number = 0;
  fats: number = 0;

  get calories(): number {
    return Macros.calculateCalories(this.protein, this.carbs,this.fats);
  }

  static calculateCalories (protein: number, carbs: number, fats: number): number {
    const calories_from_carbs = carbs * Macros.CALORIES_PER_GRAM_OF_CARB;
    const calories_from_fats = fats * Macros.CALORIES_PER_GRAM_OF_FAT;
    const calories_from_protein = protein * Macros.CALORIES_PER_GRAM_OF_PROTEIN;
    return Macros.round(calories_from_carbs + calories_from_fats + calories_from_protein);
  }

  private static round(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
