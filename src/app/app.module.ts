import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './home/languages/languages.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { VocabularyComponent } from './home/vocabulary/vocabulary.component';
import { QuizzComponent } from './quizz/quizz.component';
import { SidebarForQuizzComponent } from './quizz/sidebar-for-quizz/sidebar-for-quizz.component';
import { ScoreComponent } from './score/score.component';
import { ModalLanguageComponent } from './home/modal-language/modal-language.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { WordsComponent } from './home/words/words.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LanguagesComponent,
    CategoriesComponent,
    VocabularyComponent,
    QuizzComponent,
    SidebarForQuizzComponent,
    ScoreComponent,
    ModalLanguageComponent,
    ModalCategoryComponent,
    WordsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
