import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  showSpinner: boolean = false;
  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

  login() {
    this.showSpinner = true;
    this.authorizationService.login(this.username, this.password).subscribe((loggedIn: boolean) => {
      console.log('Did it work?', loggedIn);
      this.showSpinner = false;
    });
  }

}
