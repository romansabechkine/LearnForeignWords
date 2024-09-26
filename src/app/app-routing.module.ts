import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { VocabularyComponent } from './home/vocabulary/vocabulary.component';
import { QuizzComponent } from './quizz/quizz.component';
import {ScoreComponent} from "./score/score.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'vocabulary', component: VocabularyComponent},
  {path: 'quizz', component: QuizzComponent},
  {path: 'score', component: ScoreComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
