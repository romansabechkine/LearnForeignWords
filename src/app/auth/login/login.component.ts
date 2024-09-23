import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  noLogin = false

  user!: User

  constructor(private http: HttpClient,
              private router: Router,
              private authservice: AuthService){}

  onSubmit(){
    const user: User = {username: this.loginForm.value.username!, password: this.loginForm.value.password!}

    if(this.loginForm.value.username && this.loginForm.value.password){
      this.authservice.login(user)
    } else {
      alert("Incorrect credentials!")
    }
  }
}
