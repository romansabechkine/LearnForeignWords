import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  addCategorie(userId: string, newCategory: { category: any; languagesId: string }): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/categories', {
      userId: userId,
      languagesId: newCategory.languagesId,
      category: newCategory.category
    });
  }
}
