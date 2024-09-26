import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddLanguagePair, Language } from '../../services/types';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent {
  
  @Input() languages!: Language[] | undefined
  @Output() chooseLanguagePairEvent = new EventEmitter<Language>()
  @Output() addNewLanguagePairEvent = new EventEmitter<boolean>()

  // this variable is used to show languages if the user have any
  showLanguages: boolean = false
  showAlertNoLanguage: boolean = false

  // this variable is used to set style
  choosenlanguagePairId: string = ''

  
  chooseLanguagePair(languagePair:Language){
    this.choosenlanguagePairId = languagePair.id
    return this.chooseLanguagePairEvent.emit(languagePair)
  }

  ngOnChanges(changes:any){
    console.log("NGOnChangeWorking")
    if(!changes['languages'].isFirstChange()) {
      if (this.languages?.length == 0 || this.languages == undefined){
        this.showLanguages = false
        this.showAlertNoLanguage = true
      } else {
        this.showLanguages = true
        this.showAlertNoLanguage = false
      }
    } 
  }
  createNewLanguagePair(){
    return this.addNewLanguagePairEvent.emit(true)
    //return this.showModal = true
  }

 
}
