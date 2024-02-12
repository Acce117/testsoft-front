export class Test {
    answers: {[key: string]: any};

    public constructor() {
        this.answers = {};
    }

    public sendTest() {
        //TODO send request with answers
        console.log(this.answers);
    }


    //TODO IMPORT ANSWERS AND DONT PASS THESE AS PARAMETERS
    isTestValid(id_type_question: string, questions) {
        for (let i = 0; i < questions.length; i++)
            if (!this.validateComponent(id_type_question, questions[i].id_question))
                return false

        return true
    };



    validateComponent(id_type_question: string, id_question: string) {
        let isComponentValid

        if (!this.answers.hasOwnProperty(id_question))
            isComponentValid = false
        else
            switch (parseInt(id_type_question)) {
                case 2:
                    isComponentValid = this.validateSingleOptionAnswer(id_question)
                    break;
                case 5://TODO DO YOUR FUNCTION 
                    break;
            }

        return isComponentValid
    };

    validateSingleOptionAnswer(id_question: string) {
        return this.answers[id_question] !== null || this.answers[id_question] !== undefined;
    }
}