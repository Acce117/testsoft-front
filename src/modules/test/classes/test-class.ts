export class Test {
    answers: { [key: string]: any };

    public constructor() {
        this.answers = {};
    }

    public sendTest() {
        //TODO send request with answers
        console.log(this.answers);
    }


    public getQuestionsNotAnswered(questions:Array<any>) {
        let questionsNotAnswered =Array()
        questions.forEach((question, index) => {
            if (!this.validateComponent(question))
                questionsNotAnswered.push({questionIndex:index+1,question:question})
        });
        return questionsNotAnswered
    };



    validateComponent(question) {
        let isComponentValid
        if (!this.answers.hasOwnProperty(question.id_question))
            isComponentValid = false
        else
            switch (parseInt(question.fk_id_type_question)) {
                case 2:
                    isComponentValid = this.validateSingleOptionAnswer(question.id_question)
                    break;
                case 5:
                    isComponentValid = this.validateMultipleOptionsValueSetted(question.id_question, question.arrayquestion_top_value[0].top_value)
                    break;
            }

        return isComponentValid
    };

    validateSingleOptionAnswer(id_question: string) {
        return this.answers[id_question] !== null || this.answers[id_question] !== undefined;
    }
    validateMultipleOptionsValueSetted(id_question: string, question_top_value: number) {
        return question_top_value == Object.keys(this.answers[id_question]).reduce((total_points, key) => {
            total_points += this.answers[id_question][key]
            return total_points
        }, 0)
    }
}