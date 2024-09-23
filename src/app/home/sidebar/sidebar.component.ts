import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VocabularyService } from '../../services/vocabulary/vocabulary.service';
import { Language } from '../../services/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() getLanguagesEvent = new EventEmitter<boolean>()
  @Input() vocabularyId!: string

  constructor(private router: Router){}
 
  getLanguages(){
    return this.getLanguagesEvent.emit(true)
  }

  goToQuizz(){
    this.router.navigate(['quizz'])
  }

}
