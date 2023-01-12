import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  register() {
    if(this.email == "" || this.password == "") {
      alert("Please fill in all fields!");
      return;
    }
    this.auth.register(this.email, this.password);
  }
}
