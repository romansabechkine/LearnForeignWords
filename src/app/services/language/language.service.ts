import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Language} from "../types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {
  }

  addLanguage(userId: string, languageName1: string, languageName2: string): Observable<Language> {
    return this.http.post<Language>('http://localhost:3000/languages', {
      userId: userId,
      language1: languageName1,
      language2: languageName2
    });
  }

  getLanguages(userId: string): Observable<Language[]> {
    return this.http.get<Language[]>(`http://localhost:3000/languages/${userId}`);
  }

}
