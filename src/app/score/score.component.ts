import {Component, Input} from '@angular/core';
import {UserAnswer} from '../services/types';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() answerCount: number = 0;
  @Input() userQuizzAnswers: UserAnswer[] = [];
  language1: string | null = localStorage.getItem("language1")
  language2: string | null = localStorage.getItem("language2")


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.score = +params.get('score')!;
      this.answerCount = +params.get('answerCount')!;
      this.userQuizzAnswers = JSON.parse(params.get('userQuizzAnswers')!);
    });
  }
  getBackgroundColor(): string {
    const percentage = (this.score / this.answerCount) * 100;
    if (percentage >= 80) {
      return 'bg-green-300';
    } else if (percentage >= 50) {
      return 'bg-yellow-300';
    } else {
      return 'bg-red-300';
    }
  }}
