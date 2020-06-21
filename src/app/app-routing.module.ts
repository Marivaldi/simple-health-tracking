import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogHistoryComponent } from './log-history/log-history.component';
import { PantryComponent } from './pantry/pantry.component';
import { TrackingJournalComponent } from './tracking-journal/tracking-journal.component';

const routes: Routes = [
  { path: '', component: TrackingJournalComponent },
  { path: 'history', component: LogHistoryComponent },
  { path: 'pantry', component: PantryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
