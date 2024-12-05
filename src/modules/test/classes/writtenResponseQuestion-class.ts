import { Question } from './question-class';

export class WrittenResponseQuestion extends Question<string | undefined>{

    constructor(id_question: number | string){
        super(id_question);
    }

    validateQuestion(): boolean {
        return this.answer != undefined && this.answer.trim()!='';
    }
}