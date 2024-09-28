import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreMessage'
})
export class ScoreMessagePipe implements PipeTransform {

  transform(score: number, answerCount: number): string {
    const percentage = (score / answerCount) * 100;
      if (percentage >= 80){
         return "Nice job, keep doing like that!"
      } else if (percentage >= 50){
        return "You could do better, try one more time!"
      } else {
        return "You should learn harder though!"
      }
    }
}
