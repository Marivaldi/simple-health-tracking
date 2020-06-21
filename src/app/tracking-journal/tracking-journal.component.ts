import { Component, OnInit } from '@angular/core';
import { DietService } from 'src/services/diet.service';
import { DietDay } from 'src/types/diet-day';

@Component({
  selector: 'app-tracking-journal',
  templateUrl: './tracking-journal.component.html',
  styleUrls: ['./tracking-journal.component.scss']
})
export class TrackingJournalComponent implements OnInit {
  trackingDays: DietDay[] = [];
  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.trackingDays = this.dietService.loadForTracking();
  }

}
