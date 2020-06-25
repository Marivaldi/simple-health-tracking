import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { Macros } from 'src/types/macros';

@Component({
  selector: 'app-meal-maker-modal',
  templateUrl: './meal-maker-modal.component.html',
  styleUrls: ['./meal-maker-modal.component.scss']
})
export class MealMakerModalComponent implements OnInit {
  mealName: string = "";
  @ViewChild("mealMakerModal") modal;
  foodItems: TrackedFoodItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  changeMealName(newName: string) {
    this.mealName = newName;
  }

  done() {
    console.log();
  }

  open(items: TrackedFoodItem[]) {
    $(this.modal.nativeElement).modal("show");
    const foodItems = JSON.parse(JSON.stringify(items));
    this.foodItems = this.convertTrackedFoodItems(foodItems);
  }

  private convertTrackedFoodItems(trackedFoodItems: TrackedFoodItem[]) {
    if(!trackedFoodItems) return [];

    return trackedFoodItems.map((item) => {
      const mappedItem = Object.assign(new TrackedFoodItem(), item);
      mappedItem.macros = Object.assign(new Macros(), item.macros);
      return mappedItem;
    })
  }

}
