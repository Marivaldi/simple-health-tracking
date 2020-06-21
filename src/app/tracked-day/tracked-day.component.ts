import { Component, OnInit, Input } from '@angular/core';
import { DietDay } from 'src/types/diet-day';

@Component({
  selector: 'app-tracked-day',
  templateUrl: './tracked-day.component.html',
  styleUrls: ['./tracked-day.component.scss']
})
export class TrackedDayComponent implements OnInit {
  @Input() day: DietDay;
  constructor() { }

  ngOnInit(): void {
  }

  changeProteinGoal(protein: number) {
    this.day.goal.protein = protein;
  }

  changeCarbGoal(carbs: number) {
    this.day.goal.carbs = carbs;
  }

  changeFatGoal(fats: number) {
    this.day.goal.fats = fats;
  }
}
