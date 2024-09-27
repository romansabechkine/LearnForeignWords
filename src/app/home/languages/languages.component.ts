import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddLanguagePair, Language } from '../../services/types';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent{
  
  @Input() languages!: Language[] | undefined
  @Output() chooseLanguagePairEvent = new EventEmitter<Language>()
  @Output() addNewLanguagePairEvent = new EventEmitter<boolean>()

  // this variable is used to show languages if the user have any
  showLanguages: boolean = false
  showAlertNoLanguage: boolean = false

  // this variable is used to set style
  choosenlanguagePairId: string = ''

  // varivable to make profound check
  doCheck: boolean = false

  
  chooseLanguagePair(languagePair:Language){
    this.choosenlanguagePairId = languagePair.id
    return this.chooseLanguagePairEvent.emit(languagePair)
  }

 
  ngDoCheck() {
    console.log('ngDoCheck in languages working')
      if (this.doCheck){
        if (this.languages?.length == 0 || this.languages == undefined){
          console.log("In if ngDoCheck")
          this.showLanguages = false
          this.showAlertNoLanguage = true
        } else {
          this.showLanguages = true
          this.showAlertNoLanguage = false
        }
      }
      console.log("Do Check in ngDoCheck")
      console.log(this.doCheck)
    }

  ngOnChanges(changes:any){
    console.log("NGOnChangeWorking in languages")
    if(!changes['languages'].isFirstChange()) {
      this.doCheck = true
      if (this.languages?.length == 0 || this.languages == undefined){
        console.log("First change")
        this.showLanguages = false
        this.showAlertNoLanguage = true
      } else {
        this.showLanguages = true
        this.showAlertNoLanguage = false
      }
    } else {
      this.doCheck = false
    }
    console.log("Do Check in ngOnChanges")
    console.log(this.doCheck)
  }
  createNewLanguagePair(){
    return this.addNewLanguagePairEvent.emit(true)
    //return this.showModal = true
  }

 
}
