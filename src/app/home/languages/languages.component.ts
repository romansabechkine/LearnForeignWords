import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../services/types';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LanguageService} from "../../services/language/language.service";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  languagesForm!: FormGroup;

  constructor(private fb: FormBuilder, private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.languagesForm = this.fb.group({
      language1: new FormControl('', [Validators.required]),
      language2: new FormControl('', [Validators.required])
    });
  }

  addLanguage() {

    const userId = localStorage.getItem('userid')!;
    const languageName1 = this.languagesForm.value.language1;
    const languageName2 = this.languagesForm.value.language2;
    this.languageService.addLanguage(userId, languageName1, languageName2).subscribe(
      (response) => {
        console.log('Language added successfully', response);
        this.languagesForm.reset();

      });
  }

  @Input() languages!: Language[] | undefined
  @Output() chooseLanguagePairEvent = new EventEmitter<Language>()
  @Output() selectedLanguageIdEvent = new EventEmitter<string>();

  // this variable is used to show languages if the user have any
  showLanguages: boolean = false
  showAlertNoLanguage: boolean = false

  // this variable is used to set style
  choosenlanguagePairId: string = ''

  chooseLanguagePair(languagePair: Language) {
    this.choosenlanguagePairId = languagePair.id;
    this.chooseLanguagePairEvent.emit(languagePair)
    this.selectedLanguageIdEvent.emit(languagePair.id);

  }


  ngOnChanges(changes: any) {
    console.log("NGOnChangeWorking")
    if (!changes['languages'].isFirstChange()) {
      if (this.languages?.length == 0 || this.languages == undefined) {
        this.showLanguages = false
        this.showAlertNoLanguage = true
      } else {
        this.showLanguages = true
        this.showAlertNoLanguage = false
      }
    }
  }
}
