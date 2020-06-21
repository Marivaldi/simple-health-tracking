import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { PantryService } from 'src/services/pantry.service';
import { FoodItemModalComponent } from '../food-item-modal/food-item-modal.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {
  @ViewChild(FoodItemModalComponent) foodItemModal;
  foodItems: FoodItem[] = [];

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.foodItems = this.pantryService.load();
  }

  add() {
    this.foodItemModal.beginAdd();
  }

  edit(foodItem: FoodItem) {
    this.foodItemModal.beginEdit(foodItem);
  }

  addToPantry(foodItem: FoodItem) {
    this.foodItems.push(foodItem);
    this.saveCurrentFoodItems();
  }

  saveCurrentFoodItems() {
    this.pantryService.save(this.foodItems);
    this.foodItems = this.pantryService.load();
  }

}
