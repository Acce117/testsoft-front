export abstract class Question<T> {

    answer!: T;

    constructor(readonly id_question: number | string) {
    }

    setAnswer(answer: T){
        this.answer= answer
    }

    abstract validateQuestion(): boolean;
}