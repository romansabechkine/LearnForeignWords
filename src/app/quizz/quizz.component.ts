import {Component, OnInit} from '@angular/core';
import {VocabularyService} from '../services/vocabulary/vocabulary.service';
import {Quizz, UserAnswer, Vocabulary} from '../services/types';
import {Router} from "@angular/router";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  vocabulary!: Vocabulary
  initialWords: [string, string][] = []
  clonedWords: [string, string][] = []
  shuffledClonedWords: [string, string][] = []
  clonedAnswers: string[] = []
  quizzData: Quizz[] = []
  quizzElement!: Quizz
  userQuizzAnswers: UserAnswer[] = []
  quizzIsFinished: boolean = false
  answerCount: number = 0;
  score: number = 0;

  constructor(private vocabularyService: VocabularyService, private router: Router) {
  }


  ngOnInit() {
    //this.quizzIsFinished = false
    //console.log(this.quizzIsFinished)
    this.vocabulary = this.vocabularyService.vocabulary[0]
    this.initialWords = this.vocabulary.words
    this.clonedWords = [...this.initialWords]
    this.shuffledClonedWords = [...this.initialWords]
    this.shuffleArray(this.shuffledClonedWords)
    this.clonedAnswers = this.clonedWords.map((wordpair) => {
      return wordpair[1]
    })
    console.log("Voc in quizz")
    console.log(this.vocabulary)
    console.log("Shuffled words")
    console.log(this.clonedWords)
    this.quizzData = this.makeQuizz(this.shuffledClonedWords)
    console.log("Quizz Data")
    console.log(this.quizzData)
    this.quizzElement = this.quizzData[0]
  }

  ngOnChanges() {
    this.quizzElement
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  makeQuizz(array: [string, string][]): Quizz[] {
    return array.map((wordpair: [string, string], i: number) => {
      let answersWithoutCorrect: string[] = this.clonedAnswers.filter((el) => {
        return el !== wordpair[1]
      })
      this.shuffleArray(answersWithoutCorrect)
      let answersForQuizz: string[] = answersWithoutCorrect.slice(0, 3)
      answersForQuizz.push(wordpair[1])
      this.shuffleArray(answersForQuizz)
      return {
        id: i,
        question: wordpair[0],
        correctAnswer: wordpair[1],
        answers: answersForQuizz
      }
    })
  }

  iterI: number = 0

  nextQuizzElement(i: number, question: string, answer: string, correctAnswer: string) {
    console.log(i)
    console.log(this.quizzData.length - 1)
    if (i <= this.quizzData.length - 1) {
      let userAnswer = {
        id: i,
        question: question,
        userAnswer: answer,
        correctAnswer: correctAnswer
      }
      this.userQuizzAnswers.push(userAnswer)
      this.iterI += 1
      this.quizzElement = this.quizzData[i + 1]
      console.log(this.quizzElement)

      if (i === this.quizzData.length - 1) {
        this.quizzIsFinished = true
        this.finishQuizz()
      }
    }
    console.log(this.quizzIsFinished)
    console.log(this.userQuizzAnswers)

  }

  styleBin(id: number): boolean {
    return id <= this.iterI
  }

  finishQuizz() {
    const score = this.userQuizzAnswers.reduce((acc, answer) =>
      acc + (answer.userAnswer === answer.correctAnswer ? 1 : 0), 0);
    const answerCount = this.userQuizzAnswers.length;
    this.router.navigate(['/score', {
      score: score,
      answerCount: answerCount,
      userQuizzAnswers: JSON.stringify(this.userQuizzAnswers)
    }]);
  }


}
