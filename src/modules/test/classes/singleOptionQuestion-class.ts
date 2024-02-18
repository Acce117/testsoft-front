import { Question } from './question-class';

export class SingleOptionQuestion extends Question<number | undefined>{

    constructor(id_question: number | string){
        super(id_question);
    }

    validateQuestion(): boolean {
        return this.answer != undefined;
    }
}