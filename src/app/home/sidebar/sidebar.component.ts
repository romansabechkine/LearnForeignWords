import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../services/types';
import {Router} from '@angular/router';
import {CategorieService} from '../../services/categorie/categorie.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  newCategorie: Category = {id: '', userId: '', languagesId: '', category: ''}
  @Output() getLanguagesEvent = new EventEmitter<boolean>()
  @Input() vocabularyId!
    :
    string

  constructor(private router: Router, private categorieService: CategorieService) {
  }

  addCategorie() {
    this.newCategorie.userId = <string>localStorage.getItem('userid');
    this.newCategorie.languagesId = this.vocabularyId;
    this.categorieService.addCategorie(this.newCategorie.userId, this.newCategorie).subscribe(() => {
      this.newCategorie = {id: '', userId: '', languagesId: '', category: ''};
    });
  }

  getLanguages() {
    return this.getLanguagesEvent.emit(true)
  }

  goToQuizz() {
    this.router.navigate(['quizz'])
  }

}
