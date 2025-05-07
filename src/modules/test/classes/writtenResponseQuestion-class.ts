import { Question } from "./question-class";

export class WrittenResponseQuestion extends Question<
  Record<number, string> | undefined
> {

  constructor(id_question: number | string, possible_answers: number[]) {
    super(id_question);
    this.answer={}
    possible_answers.forEach((answer)=>this.answer[answer]='')
  }


  validateQuestion(): boolean {
    if (!this.answer) return false;
    return Object.entries(this.answer).every((answer) => {
      const answerText = answer[1];
      return (
        answerText !== undefined &&
        answerText !== null &&
        answerText.trim() !== ""
      );
    });
  }
}
