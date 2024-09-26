import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../services/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input() categories: Category[] | undefined = []
  @Output() chooseCategoryEvent = new EventEmitter<Category>()
  @Output() addNewCategoryEvent = new EventEmitter<boolean>()

  showCategories: boolean = false
  choosenCategoryId: string = ''

  // ngOnChanges(){
  //   console.log('NgOnChange in categories')
  //   console.log(this.categories?.length)
  //   console.log(this.categories?.length == 0)
  //   console.log(this.categories == undefined)
  //   if (this.categories?.length === 0 || this.categories === undefined){
  //     this.showCategories = false
  //   } else {
  //     this.showCategories = true
  //   }
  // }

  ngDoCheck() {
    console.log('ngDoCheck in categories working')
    console.log(this.categories)
    console.log(this.categories?.length)
    console.log(this.categories?.length == 0)
    console.log(this.categories == undefined)
    if (this.categories?.length == 0 || this.categories == undefined){
      this.showCategories = false
    } else {
      this.showCategories = true
    }
  }

  chooseCategory(category:Category){
    this.choosenCategoryId = category.id
    return this.chooseCategoryEvent.emit(category)
  }

  createNewCategory(){
    return this.addNewCategoryEvent.emit(true)
  }
  
}
