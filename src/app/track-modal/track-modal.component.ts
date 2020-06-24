import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { PantryService } from 'src/services/pantry.service';
import { Macros } from 'src/types/macros';
import { TrackedFoodItem } from 'src/types/tracked-food-item';

@Component({
  selector: 'app-track-modal',
  templateUrl: './track-modal.component.html',
  styleUrls: ['./track-modal.component.scss']
})
export class TrackModalComponent implements OnInit {
  @Output() finishTrackingItem: EventEmitter<TrackedFoodItem> = new EventEmitter<TrackedFoodItem>();
  @ViewChild("trackingModal") modal;
  pantryOptions: FoodItem[] = [];
  selectedPantryIndex: number = 0;
  amount: number = 0;
  macros: Macros = new Macros();
  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.fetchPantryOptions();
    $('.carousel').carousel({touch: true});
  }

  fetchPantryOptions() {
    this.pantryService.load().subscribe((foodItems: FoodItem[]) => {
      this.pantryOptions = foodItems;
      this.selectPantryOption(0);
    });
  }

  beginTrackingItem() {
    $(this.modal.nativeElement).modal("show");
  }

  done() {
    const selectedFoodItem : FoodItem = this.pantryOptions[this.selectedPantryIndex];
    const trackedFoodItem : TrackedFoodItem = selectedFoodItem.track(this.amount);
    this.finishTrackingItem.emit(trackedFoodItem);
    $(this.modal.nativeElement).modal("hide");
  }

  selectPantryOption(index: number) {
    this.selectedPantryIndex = index;
    this.amount = this.pantryOptions[this.selectedPantryIndex].servingSize;
    this.setMacrosForAmount()
  }

  changeAmount(amount: number) {
    this.amount = amount;
    this.setMacrosForAmount();
  }

  setMacrosForAmount() {
    this.macros = this.pantryOptions[this.selectedPantryIndex].getMacrosFor(this.amount);
  }

}
