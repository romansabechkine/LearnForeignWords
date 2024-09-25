import { Component, Input } from '@angular/core';
import { VocabularyService } from '../../services/vocabulary/vocabulary.service';
import { Vocabulary } from '../../services/types';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent {
  language1: string | null = localStorage.getItem('language1');
  language2: string | null = localStorage.getItem('language2');
  category: string | null = localStorage.getItem('categore');

  @Input() vocabulary!: Vocabulary[] | undefined;

  showVocabulary: boolean = false;
  showAlertNoVocabulary: boolean = false;

  uniqueVoc!: Vocabulary;

  constructor(private vocabularyService: VocabularyService) {}

  ngOnChanges(changes: any) {
    console.log('NGOnChangeWorking');
    if (!changes['vocabulary'].isFirstChange()) {
      if (this.vocabulary?.length == 0 || this.vocabulary == undefined) {
        this.showVocabulary = false;
        this.showAlertNoVocabulary = true;
      } else {
        this.uniqueVoc = this.vocabulary[0];
        this.showVocabulary = true;
        this.showAlertNoVocabulary = false;
      }
    }
  }

  deleteWord(index: number) {
    if (confirm('Are you sure you want to delete this word?')) {
      this.uniqueVoc.words.splice(index, 1);

      this.vocabularyService
        .updateVocabulary(this.uniqueVoc.id, this.uniqueVoc)
        .subscribe(
          (response) => {
            console.log('Word deleted successfully:', response);
          },
          (error) => {
            console.error('Error deleting word:', error);
          }
        );
    }
  }
}
