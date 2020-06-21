import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { EventEmitter } from '@angular/core';
import { Macros } from 'src/types/macros';

@Component({
  selector: 'app-food-item-modal',
  templateUrl: './food-item-modal.component.html',
  styleUrls: ['./food-item-modal.component.scss']
})
export class FoodItemModalComponent implements OnInit {
  @ViewChild("foodItemModal") modal
  @Output() finishEdit = new EventEmitter();
  @Output() finishAdd: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  mode: Mode;
  name: string = "";
  servingSize: number = 0;
  protein: number = 0;
  carbs: number = 0;
  fats: number = 0;
  calories: number = 0;
  currentEditingFoodItem: FoodItem;

  constructor() { }

  ngOnInit(): void {
  }

  beginAdd() {
    this.mode = Mode.Add;
    this.currentEditingFoodItem = null;
    this.name = "";
    this.carbs = 0;
    this.protein = 0;
    this.fats = 0;
    this.calories = 0;
    this.servingSize = 0;
    $(this.modal.nativeElement).modal("show");
  }

  beginEdit(foodItem: FoodItem) {
    this.mode = Mode.Edit;
    this.currentEditingFoodItem = foodItem;
    this.name = foodItem.name;
    this.carbs = foodItem.macros.carbs;
    this.protein = foodItem.macros.protein;
    this.fats = foodItem.macros.fats;
    this.servingSize = foodItem.servingSize;
    this.calculateCalories();
    $(this.modal.nativeElement).modal("show");
  }

  changeName(name: string) {
    this.name = name;
  }

  done() {
    if(this.userIsEditingItem()) {
      this.doneEditing();
    } else {
      this.doneAdding();
    }
  }

  doneEditing() {
    // Yeah. I know this isn't a pure component and it is modifying data
    // that was passed in... so what. This was way easier.
    this.currentEditingFoodItem.name = this.name;
    this.currentEditingFoodItem.macros.fats = this.fats;
    this.currentEditingFoodItem.macros.protein = this.protein;
    this.currentEditingFoodItem.macros.carbs = this.carbs;
    this.currentEditingFoodItem.servingSize = this.servingSize;
    this.finishEdit.emit();
    $(this.modal.nativeElement).modal("hide");
  }

  doneAdding() {
    this.finishAdd.emit(this.generateFoodItemFromFields());
    $(this.modal.nativeElement).modal("hide");
  }

  changeServingSize(size: number){
    this.servingSize = size;
  }

  changeProtein(protein: number){
    this.protein = protein;
    this.calculateCalories();
  }

  changeCarbs(carbs: number){
    this.carbs = carbs;
    this.calculateCalories();
  }

  changeFats(fats: number) {
    this.fats = fats;
    this.calculateCalories();
  }

  userIsAddingItem() : boolean {
    return this.mode === Mode.Add;
  }

  userIsEditingItem() : boolean {
    return this.mode === Mode.Edit;
  }

  get modalHeader() : string {
    if(this.userIsEditingItem()) {
      return "Edit Food Item";
    }

    return "Add Food Item"
  }

  get doneText(): string {
    if(this.userIsEditingItem()) {
      return "Save";
    }

    return "Add";
  }

  private calculateCalories() {
    this.calories = Macros.calculateCalories(this.protein, this.carbs, this.fats)
  }

  private generateFoodItemFromFields() : FoodItem {
    const foodItem = new FoodItem();
    foodItem.name = this.name;
    foodItem.macros.fats = this.fats;
    foodItem.macros.protein = this.protein;
    foodItem.macros.carbs = this.carbs;
    foodItem.servingSize = this.servingSize;
    return foodItem;
  }


}

enum Mode {
  Add,
  Edit
}
