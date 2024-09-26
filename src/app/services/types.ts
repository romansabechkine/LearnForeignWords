import { NgIterable } from "@angular/core"

export interface User {
    username: string,
    password: string
}

export interface signedUser {
    id: string
    username: string
    password: string
}

export interface Language {
    id: string,
    userId: string,
    language1: string,
    language2: string
}

export interface Category {
    id: string,
    userId: string,
    languagesId: string,
    category: string
}
  
export interface Vocabulary {
    id: string
    userId: string
    languagesId: string
    categoryId: string
    words: [string, string][]
  }

export interface Quizz {
    id: number
    question: string
    answers: string[]
    correctAnswer : string
}

export interface UserAnswer {
    id: number,
    question: string,
    userAnswer: string,
    correctAnswer: string
}

export interface AddLanguagePair {
    userId : string
    language1 : string
    language2 : string
}

export interface AddCategory {
    userId : string
    languagesId : string
    category: string
}