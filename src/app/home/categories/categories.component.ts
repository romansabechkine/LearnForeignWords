import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, Language} from '../../services/types';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategorieService} from "../../services/categorie/categorie.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesForm!: FormGroup;
  @Input() languages: Language[] | undefined = []
  selectedLanguageId: string = '';
  @Input() categories: Category[] | undefined = []
  @Output() chooseCategoryEvent = new EventEmitter<Category>()

  constructor(private fb: FormBuilder, private categorieService: CategorieService) {
  }


  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      category: ''
    });
  }

  addCategory() {
    const userId = localStorage.getItem('userid')!;
    const category = this.categoriesForm.value.category;
    const languageId = this.selectedLanguageId;
    this.categorieService.addCategorie(userId, { languagesId: languageId, category: category}).subscribe(
      (response) => {
        console.log('Category added successfully', response);
        this.categoriesForm.reset();
      });
  }

  showCategories: boolean = false
  choosenCategoryId: string = ''

  ngOnChanges() {
    console.log('NgOnChange')
    console.log(this.categories?.length)
    console.log('testt',this.selectedLanguageId)
    console.log(this.categories?.length == 0)
    console.log(this.categories == undefined)
    if (this.categories?.length == 0 || this.categories == undefined) {
      this.showCategories = false
    } else {
      this.showCategories = true
    }
  }

  chooseCategory(category: Category) {
    this.choosenCategoryId = category.id
    return this.chooseCategoryEvent.emit(category)
  }

  onLanguageSelected(languageId: string) {
    this.selectedLanguageId = languageId;
    console.log('Selected language id', this.selectedLanguageId)
  }
}
