import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  showSpinner: boolean = false;
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    this.authorizationService.userHasLoggedIn().subscribe((userStillLoggedIn) => {
      if (userStillLoggedIn) this.router.navigate(['']); 
    });
  }

  login() {
    this.showSpinner = true;
    this.authorizationService.login(this.username, this.password).subscribe((loggedIn: boolean) => {
      console.log('Did it work?', loggedIn);
      if(loggedIn) this.router.navigate(['']);
      this.showSpinner = false;
    });
  }

}
