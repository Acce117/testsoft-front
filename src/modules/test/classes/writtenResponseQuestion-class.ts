import { Question } from './question-class';

export class WrittenResponseQuestion extends Question<string | undefined>{

    id_answer: Array<number>;

    constructor(id_question: number | string, possible_answers:number[]){
        super(id_question);
        this.id_answer = possible_answers
    }

    validateQuestion(): boolean {
        return this.answer != undefined && this.answer.trim()!='';
    }
}