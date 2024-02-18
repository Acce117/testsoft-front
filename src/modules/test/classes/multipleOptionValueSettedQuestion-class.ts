import { Question } from "./question-class";

export class MultipleOptionsValueSettedQuestion extends Question<{[key:string]:number}>{
    
    constructor(
        id_question: number | string,
        readonly top_value: number | string
    ){
        super(id_question);
        this.answer = {};
    }

    validateQuestion(): boolean {
        return this.top_value == Object.keys(this.answer).reduce((total_points, key) => {
            total_points += this.answer[key]
            return total_points
        }, 0)
    }
}