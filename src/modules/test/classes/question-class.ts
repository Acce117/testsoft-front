export abstract class Question<T> {

    answer!: T;

    constructor(readonly id_question: number | string) {
        
    }

    abstract validateQuestion(): boolean;
}