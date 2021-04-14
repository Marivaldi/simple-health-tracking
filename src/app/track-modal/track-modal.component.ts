import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { PantryService } from 'src/services/pantry.service';
import { Macros } from 'src/types/macros';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { MealTime } from 'src/types/enums/meal-time.enum';
import { Meal } from 'src/types/meal';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.scss']
})
export class TrackModalComponent implements OnInit {
  @Output() finishTrackingItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() finishTrackingMeal: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("trackingModal") modal;

  _pantryOptions: FoodItem[] = [];
  @Input() set pantryOptions(options: FoodItem[]) {
    this._pantryOptions = options;
    this.selectPantryOption(0);
  }

  get pantryOptions(): FoodItem[] {
    return this._pantryOptions;
  }

  @Input() mealOptions: Meal[] = [];

  showSingleItemSelect: boolean = true;
  selectedPantryIndex: number = 0;
  selectedMealIndex: number = 0;
  amount: number = 0;
  macros: Macros = new Macros();
  mealTimeOptions = Object.keys(MealTime).filter(e => !isNaN(+e)).map(o => { return {index: +o, name: MealTime[o]}});
  selectedMealTimeIndex: number = 0;
  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.selectPantryOption(0);
    $('.carousel').carousel({ touch: true });
  }

  beginTrackingItem() {
    $(this.modal.nativeElement).modal("show");
  }

  done() {
    if(this.showSingleItemSelect) {
      this.finishTrackingSingleItem();
    } else {
      this.finishTrackingWholeMeal();
    }

    $(this.modal.nativeElement).modal("hide");
  }

  finishTrackingSingleItem() {
    const selectedFoodItem: FoodItem = this.pantryOptions[this.selectedPantryIndex];
    const trackedFoodItem: TrackedFoodItem = selectedFoodItem.track(this.amount);
    const whatsExpected: any = {trackedItem: trackedFoodItem, mealTime: MealTime[this.selectedMealTimeIndex]};
    this.finishTrackingItem.emit(whatsExpected);
  }

  finishTrackingWholeMeal() {
    const selectedMeal: Meal = this.mealOptions[this.selectedMealIndex];
    const trackedFoodItems: TrackedFoodItem[] = selectedMeal.foodItems;
    const whatsExpected: any = {items: trackedFoodItems, mealTime: MealTime[this.selectedMealTimeIndex]};
    this.finishTrackingMeal.emit(whatsExpected);
  }

  selectPantryOption(index: number) {
    if (!this.pantryOptions) return;

    if(!this.pantryOptions[this.selectedPantryIndex]) return;

    this.selectedPantryIndex = index;

    this.amount = this.pantryOptions[this.selectedPantryIndex].servingSize;
    this.setMacrosForAmount();
  }

  selectMealTime(index: number) {
    this.selectedMealTimeIndex = index;
  }

  changeAmount(amount: number) {
    this.amount = amount;
    this.setMacrosForAmount();
  }

  setMacrosForAmount() {
    this.macros = this.pantryOptions[this.selectedPantryIndex].getMacrosFor(this.amount);
  }

}
