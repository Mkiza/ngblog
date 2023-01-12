import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  login() {
    if(this.email == "" || this.password == "") {
      alert("Please fill in all fields!");
      return;
    }
    this.auth.login(this.email, this.password);
  }

}
