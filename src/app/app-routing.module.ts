import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogHistoryComponent } from './log-history/log-history.component';
import { PantryComponent } from './pantry/pantry.component';
import { TrackingJournalComponent } from './tracking-journal/tracking-journal.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthorizationGuardService as MustLogin 
} from '../services/authorization-guard.service';

const routes: Routes = [
  { path: '', component: TrackingJournalComponent, canActivate: [MustLogin] },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: LogHistoryComponent, canActivate: [MustLogin] },
  { path: 'pantry', component: PantryComponent, canActivate: [MustLogin] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
