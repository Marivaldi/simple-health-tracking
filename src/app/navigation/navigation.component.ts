import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private authenticationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  get userHasLoggedIn(): boolean {
    return this.authenticationService.userHasLoggedIn();
  }

  get username(): string {
    return this.authenticationService.getUsername();
  }

}
