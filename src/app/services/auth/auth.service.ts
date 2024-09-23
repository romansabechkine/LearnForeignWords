import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signedUser, User } from '../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              ) { }
  
  user!: User
  signeduser!: signedUser

  register(user: User){
    this.http.post('http://localhost:3000/users', JSON.stringify(user)).subscribe(
      (response:any) => {
        if (response.hasOwnProperty('id')){
          this.router.navigate(['login']);
        }
      },
      (error) => {
        alert("Something went wrong, could not register ...")
      }
    )
  }

  login(user: User){
    this.http.get('http://localhost:3000/users?username=' + user.username + '&password=' + user.password).subscribe(
      (response:any) => {
        if(response.length !== 0){
          this.signeduser = response[0]
          localStorage.setItem('username', this.signeduser.username)
          localStorage.setItem('userid', this.signeduser.id)
          this.router.navigate(['']);
          console.log("Login: ")
          console.log(response)
          console.log(localStorage.getItem("username"))
          console.log(localStorage.getItem("userid"))
        }
        else{
          alert("Incorrect username or password")
        }
      },
      (error) => {
        console.log("Login error")
        console.log(error)
      })
  }

  logout(){
    if (localStorage.getItem('username')){
      localStorage.setItem('username', '')
      localStorage.setItem('userid', '')
      this.router.navigate(['login'])
    } else {
      alert("You are not signed in!")
    }
  }
}
