import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {
  constructor(public authorizationService: AuthorizationService, public router: Router) {}
  canActivate(): boolean {
    const userHasLoggedIn = this.authorizationService.userHasLoggedIn();
    if (!userHasLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}