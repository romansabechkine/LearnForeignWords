import { Component } from '@angular/core';
import { VocabularyService } from 'src/app/services/vocabulary/vocabulary.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent {
  originalWord: string = '';
  targetWord: string = '';

  constructor(
    private vocabularyService: VocabularyService,
    private homeComponent: HomeComponent
  ) {}

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onSubmit() {
    const userId = localStorage.getItem('userid');
    const languagesId = localStorage.getItem('languagesId');
    const categoryId = localStorage.getItem('categoryId');
    const vocabularyId = localStorage.getItem('vocabularyId');

    if (userId && languagesId && categoryId) {
      if (vocabularyId) {
        this.vocabularyService.getVocabularyById(vocabularyId).subscribe(
          (vocabulary) => {
            vocabulary.words.push([this.originalWord, this.targetWord]);

            this.vocabularyService
              .updateVocabulary(vocabularyId, vocabulary)
              .subscribe(
                (response) => {
                  console.log('Vocabulary updated successfully:', response);
                  this.originalWord = '';
                  this.targetWord = '';

                  this.refreshVocabulary(userId, languagesId, categoryId);
                },
                (error) => {
                  console.log('Error updating vocabulary:', error);
                }
              );
          },
          (error) => {
            console.log('Error fetching vocabulary:', error);
          }
        );
      } else {
        const newVocabulary = {
          id: this.generateUniqueId(),
          userId: userId,
          languagesId: languagesId,
          categoryId: categoryId,
          words: [[this.originalWord, this.targetWord] as [string, string]],
        };

        this.vocabularyService.addVocabulary(newVocabulary).subscribe(
          (response) => {
            console.log('Vocabulary created successfully:', response);
            this.originalWord = '';
            this.targetWord = '';

            this.refreshVocabulary(userId, languagesId, categoryId);
          },
          (error) => {
            console.log('Error creating vocabulary:', error);
          }
        );
      }
    } else {
      console.log(
        'Required information missing (userId, languagesId, categoryId)'
      );
    }
  }

  refreshVocabulary(userId: string, languagesId: string, categoryId: string) {
    const selectedCategory = {
      userId: userId,
      languagesId: languagesId,
      id: categoryId,
      category: localStorage.getItem('category') || '',
    };

    this.homeComponent.acceptCategoryAndGetVocabulary(selectedCategory);
  }
}
