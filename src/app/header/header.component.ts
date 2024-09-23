import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username:string | null = ''

  constructor(private router: Router){}


  get getUserName(): string | null {
    return localStorage.getItem('username')
  };


  goToRegister(){
    this.router.navigate(["register"])
  }
  goToLogin(){
    this.router.navigate(["login"])
  }
}
