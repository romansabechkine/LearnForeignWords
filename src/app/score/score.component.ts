import { Component, Input } from '@angular/core';
import { UserAnswer } from '../services/types';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {

  @Input() userQuizzAnswers!: UserAnswer[]

  language1: string | null = localStorage.getItem("language1")
  language2: string | null = localStorage.getItem("language2")
  
  }
