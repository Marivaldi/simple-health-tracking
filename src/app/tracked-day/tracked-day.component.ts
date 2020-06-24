import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { TrackModalComponent } from '../track-modal/track-modal.component';
import { Macros } from 'src/types/macros';
import * as _ from 'lodash';
import { EventEmitter } from '@angular/core';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { FoodItem } from 'src/types/food-item';

@Component({
  selector: 'app-tracked-day',
  templateUrl: './tracked-day.component.html',
  styleUrls: ['./tracked-day.component.scss']
})
export class TrackedDayComponent implements OnInit {
  @Input() day: DietDay;
  @Input() pantryOptions: FoodItem[];
  @Output() saveCurrent = new EventEmitter();
  @ViewChild(TrackModalComponent) trackingModal: TrackModalComponent;
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

  add(trackedFoodItem: TrackedFoodItem) {
    this.day.trackAnItem(trackedFoodItem);
    this.saveCurrent.emit();
  }

  remove(trackedFoodItem: TrackedFoodItem) {
    this.day.removeATrackedItem(trackedFoodItem);
    this.saveCurrent.emit();
  }

  private checkIfChangesArePresent() {
    const goalsHaveChanged = !_.isEqual(this.originalGoal, this.day.goal);
    const weigthHasChanged = this.originalWeight !== this.day.weight
    this.changesArePresent = weigthHasChanged || goalsHaveChanged;
  }
}