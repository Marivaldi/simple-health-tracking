import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { PantryService } from 'src/services/pantry.service';
import { Macros } from 'src/types/macros';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { MealTime } from 'src/types/enums/meal-time.enum';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.scss']
})
export class TrackModalComponent implements OnInit {
  @Output() finishTrackingItem: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("trackingModal") modal;
  @Input() _pantryOptions: FoodItem[] = [];
  @Input() set pantryOptions(options: FoodItem[]) {
    this._pantryOptions = options;
    this.selectPantryOption(0);
  }
  selectedPantryIndex: number = 0;
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
    const selectedFoodItem: FoodItem = this._pantryOptions[this.selectedPantryIndex];
    const trackedFoodItem: TrackedFoodItem = selectedFoodItem.track(this.amount);
    const whatsExpected: any = {trackedItem: trackedFoodItem, mealTime: MealTime[this.selectedMealTimeIndex]};
    this.finishTrackingItem.emit(whatsExpected);
    $(this.modal.nativeElement).modal("hide");
  }

  selectPantryOption(index: number) {
    if (!this._pantryOptions) return;

    if(!this._pantryOptions[this.selectedPantryIndex]) return;

    this.selectedPantryIndex = index;

    this.amount = this._pantryOptions[this.selectedPantryIndex].servingSize;
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
    this.macros = this._pantryOptions[this.selectedPantryIndex].getMacrosFor(this.amount);
  }

}
