import { Component, OnInit, OnDestroy } from '@angular/core';
import { DietService } from 'src/services/diet.service';
import { DietDay } from 'src/types/diet-day';
import { interval, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-tracking-journal',
  templateUrl: './tracking-journal.component.html',
  styleUrls: ['./tracking-journal.component.scss']
})
export class TrackingJournalComponent implements OnInit, OnDestroy {
  trackingDays: DietDay[] = [];
  subscription: Subscription ;
  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.trackingDays = this.dietService.loadForTracking();
    // Juuuuust in case... Every two hours, grab the new data.
    // This will have the effect of appending a new day to the end if it is a new day
    // and setting the current day as what is focused in the main pane. Not great, but w/e.
    const secondsCounter = interval(7.2e+6);
    this.subscription = secondsCounter.subscribe((n) => this.trackingDays = this.dietService.loadForTracking());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveCurrentState() {
    this.dietService.saveTrackedDays(this.trackingDays);
    this.trackingDays = this.dietService.loadForTracking();
  }



}
