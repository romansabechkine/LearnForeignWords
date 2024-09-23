import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-for-quizz',
  templateUrl: './sidebar-for-quizz.component.html',
  styleUrls: ['./sidebar-for-quizz.component.scss']
})
export class SidebarForQuizzComponent {

    constructor(private router: Router){}

    goToHome(){
      return this.router.navigate([""])
    }
}
