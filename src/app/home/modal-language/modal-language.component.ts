import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AddLanguagePair, Language } from '../../services/types';
import { VocabularyService } from '../../services/vocabulary/vocabulary.service';

@Component({
  selector: 'app-modal-language',
  templateUrl: './modal-language.component.html',
  styleUrls: ['./modal-language.component.scss']
})
export class ModalLanguageComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>()
  @Output() addedlanguageEvent = new EventEmitter<Language>()

  // info usefull to add the language pair
  userId: string = localStorage.getItem("userid") as string
  languagePair!: AddLanguagePair
  addedLanguagePair!: Language


    languageForm = new FormGroup({
      language1: new FormControl(''),
      language2: new FormControl(''),
    }, { validators: [this.checkLength] })
  
  
  constructor(private vocabularyService: VocabularyService){}

  ngDoCheck(){
    console.log("Check in language-modal component")
    this.languageForm
  }

  closeModal(){
    return this.closeModalEvent.emit(false)
  }

  onSubmit(){
    this.languagePair = {userId: this.userId, language1: this.languageForm.value.language1!, language2: this.languageForm.value.language2!}
    this.vocabularyService.addLanguage(this.languagePair)
    .subscribe(
      (response:Language) => {
        //this.addedLanguagePair = response
        if(response){
          console.log("Response:")
          console.log(response)
          this.addedlanguageEvent.emit(response)
        }
      },
      (error) => {
        console.log("Could not add language Pair")
      }
    )
    // after added close the modal and pass the Language to Home
    //console.log("addedLanguagePair:")
    //console.log(this.addedLanguagePair)
    //this.closeModal()
    //return this.addedlanguageEvent.emit(this.addedLanguagePair)
  }

  private checkLength(control: AbstractControl){
    const language1 = control.get('language1');
    const language2 = control.get('language2');
    const error = language1?.value.length < 2 || language2?.value.length < 2
    return error ? { errorLength: true } : null;
  }

  get getErrorLabel() {
    if (this.languageForm.errors?.['errorLength']) return 'The word should have more than 1 letter';
    return 'Something went wrong';
  }


}

