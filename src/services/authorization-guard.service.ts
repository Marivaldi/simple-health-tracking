import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import {map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate {
  constructor(public authorizationService: AuthorizationService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authorizationService.userHasLoggedIn().pipe(
      map((userHasLoggedIn) => {
        if (!userHasLoggedIn) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}