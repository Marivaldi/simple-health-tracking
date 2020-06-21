import { Component, OnInit } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { DietService } from 'src/services/diet.service';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.scss']
})
export class LogHistoryComponent implements OnInit {
  dietDays: DietDay[] = [];
  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.dietDays = this.dietService.load();
  }

}
