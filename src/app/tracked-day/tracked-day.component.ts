import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { TrackModalComponent } from '../track-modal/track-modal.component';
import { Macros } from 'src/types/macros';
import * as _ from 'lodash';
import { EventEmitter } from '@angular/core';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { FoodItem } from 'src/types/food-item';
import { MealTime } from 'src/types/enums/meal-time.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MealMakerModalComponent } from '../meal-maker-modal/meal-maker-modal.component';
import { Meal } from 'src/types/meal';

@Component({
  selector: 'app-tracked-day',
  templateUrl: './tracked-day.component.html',
  styleUrls: ['./tracked-day.component.scss']
})
export class TrackedDayComponent implements OnInit {
  @Input() day: DietDay;
  @Input() pantryOptions: FoodItem[];
  @Input() mealOptions: Meal[];
  @Output() saveCurrent = new EventEmitter();
  @ViewChild(TrackModalComponent) trackingModal: TrackModalComponent;
  @ViewChild(MealMakerModalComponent) mealMakerModal: MealMakerModalComponent;
  originalGoal: Macros = new Macros();
  originalWeight: number = 0;
  changesArePresent: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.originalGoal = Object.assign(new Macros(), this.day.goal);
    this.originalWeight = this.day.weight;
  }

  changeProteinGoal(protein: any) {
    this.day.goal.protein = (isNaN(parseFloat(protein))) ? 0 : parseFloat(protein);
    this.checkIfChangesArePresent();
  }

  changeCarbGoal(carbs: any) {
    this.day.goal.carbs = (isNaN(parseFloat(carbs))) ? 0 : parseFloat(carbs);
    this.checkIfChangesArePresent();
  }

  changeFatGoal(fats: any) {
    this.day.goal.fats = (isNaN(parseFloat(fats))) ? 0 : parseFloat(fats);
    this.checkIfChangesArePresent();
  }

  changeWeight(weight: any) {
    this.day.weight = (isNaN(parseFloat(weight))) ? 0 : parseFloat(weight);
    this.checkIfChangesArePresent();
  }

  openTrackingModal() {
    this.trackingModal.beginTrackingItem();
  }

  saveChanges() {
    this.saveCurrent.emit();
  }

  resetChanges() {
    this.day.goal = Object.assign(new Macros(), this.originalGoal);
    this.day.weight = this.originalWeight;
    this.checkIfChangesArePresent();
  }

  add(data: any) {
    this.day.trackAnItem(data.trackedItem, data.mealTime);
    this.saveCurrent.emit();
  }

  addMeal(data: any) {
    const items: TrackedFoodItem[] = data.items
    const mealTime: MealTime = data.mealTime;
    items.forEach((item: TrackedFoodItem) => {
      this.day.trackAnItem(item, mealTime);
    });
    this.saveCurrent.emit();
  }

  remove(trackedFoodItem: TrackedFoodItem, mealTime: string) {
    this.day.removeATrackedItem(trackedFoodItem, mealTime);
    this.saveCurrent.emit();
  }

  edit(trackedFoodItem: TrackedFoodItem) {
    console.log(trackedFoodItem);
  }

  mealify(trackedFoodItems: TrackedFoodItem[]) {
    this.mealMakerModal.open(trackedFoodItems);
  }

  drop(event: CdkDragDrop<FoodItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.saveCurrent.emit();
  }

  private checkIfChangesArePresent() {
    const goalsHaveChanged = !_.isEqual(this.originalGoal, this.day.goal);
    const weigthHasChanged = this.originalWeight !== this.day.weight
    this.changesArePresent = weigthHasChanged || goalsHaveChanged;
  }
}