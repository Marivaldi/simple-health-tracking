import { Component, OnInit } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { DietService } from 'src/services/diet.service';

@Component({
  selector: 'app-food-log-table',
  templateUrl: './food-log-table.component.html',
  styleUrls: ['./food-log-table.component.scss']
})
export class FoodLogTableComponent implements OnInit {
  dietDays: DietDay[] = [];
  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.dietDays = this.dietService.load();
  }

}
