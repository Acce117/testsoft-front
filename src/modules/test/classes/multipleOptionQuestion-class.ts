import { Question } from './question-class';

export class MultipleOptionQuestion extends Question<Array<number> | undefined>{

    constructor(id_question: number | string){
        super(id_question);
    }

    validateQuestion(): boolean {
        return this.answer!=undefined && this.answer.length>0;
    }
}