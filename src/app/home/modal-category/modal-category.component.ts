import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddCategory, Category } from 'src/app/services/types';
import { VocabularyService } from 'src/app/services/vocabulary/vocabulary.service';


@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent {
  @Output() closeModalCategoryEvent = new EventEmitter<boolean>()
  @Output() addedCategoryEvent = new EventEmitter<Category>()

  // this will be sent to create a category
  userId: string = localStorage.getItem("userid") as string
  languagesId: string = localStorage.getItem("languagesId") as string

  //final object to be sent
  categoryToSent!: AddCategory

  categoryForm = new FormGroup({
    category: new FormControl(''),
  })

  constructor(private vocabularyService: VocabularyService){}

  closeModal(){
    return this.closeModalCategoryEvent.emit(false)
  }

  onSubmit(){
    this.categoryToSent = {userId: this.userId, languagesId: this.languagesId, category: this.categoryForm.value.category!}
    this.vocabularyService.addCategory(this.categoryToSent)
    .subscribe(
      (response:Category) => {
        //this.addedLanguagePair = response
        if(response){
          console.log("Response:")
          console.log(response)
          this.addedCategoryEvent.emit(response)
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

}
