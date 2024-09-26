import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategory, AddLanguagePair, Category, Language, Vocabulary } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  vocabulary: Vocabulary[] = [];

  constructor(private http: HttpClient) {}

  getLanguages(userId: string): Observable<Language[]> {
    const res = this.http.get<Language[]>(
      'http://localhost:3000/languages?userId=' + userId
    );
    return res;
  }

  getCategories(userId: string, languagesId: string): Observable<Category[]> {
    const res = this.http.get<Category[]>(
      'http://localhost:3000/categories?userId=' +
        userId +
        '&languagesId=' +
        languagesId
    );
    return res;
  }

  getVocabulary(
    userId: string,
    languagesId: string,
    categoryId: string
  ): Observable<Vocabulary[]> {
    const res = this.http.get<Vocabulary[]>(
      'http://localhost:3000/vocabularies?userId=' +
        userId +
        '&languagesId=' +
        languagesId +
        '&categoryId=' +
        categoryId
    );
    res.subscribe(
      (response: Vocabulary[] | undefined): void => {
        console.log(`Response in acceptLanguageAndGetCategories: ${response}`);
        if (this.vocabulary?.length !== 0 || this.vocabulary !== undefined) {
          this.vocabulary = response!;
        }
        //this.vocabulary = response
        console.log('Voc in voc-service');
        console.log(this.vocabulary![0]);
      },
      (error) => {
        console.log('Getting vocabulary error');
      }
    );
    return res;
  }

  getVocabularyById(id: string): Observable<Vocabulary> {
    return this.http.get<Vocabulary>(
      `http://localhost:3000/vocabularies/${id}`
    );
  }

  updateVocabulary(
    id: string,
    updatedVocabulary: Vocabulary
  ): Observable<Vocabulary> {
    return this.http.patch<Vocabulary>(
      `http://localhost:3000/vocabularies/${id}`,
      updatedVocabulary
    );
  }

  addVocabulary(newVocabulary: Vocabulary): Observable<Vocabulary> {
    return this.http.post<Vocabulary>(`http://localhost:3000/vocabularies`, newVocabulary);
  }

  addLanguage(languagePair: AddLanguagePair):Observable<Language>{
    return this.http.post<Language>('http://localhost:3000/languages', JSON.stringify(languagePair))
  }

  addCategory(category: AddCategory):Observable<Category>{
    return this.http.post<Category>('http://localhost:3000/categories', JSON.stringify(category))
  }
}
