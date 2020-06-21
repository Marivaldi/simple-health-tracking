import { Component, OnInit } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { DietService } from 'src/services/diet.service';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit {
  dietDays: DietDay[] = [];
  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.dietDays = this.dietService.load();
  }

}
