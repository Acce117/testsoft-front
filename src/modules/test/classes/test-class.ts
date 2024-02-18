import { sendRequest } from "@/common/utils/fetch";
import { userStore } from "@/modules/security/store/user-store";

export class Test {
    answers: { [key: string]: any };

    public constructor(readonly id_test: number|string) {
        this.answers = {};
    }

    public sendTest() {
        const test = {
            user_ci: userStore().ci,
            ...this
        };
        
        sendRequest(
            `${import.meta.env.VITE_API_PATH}/gestion/test/execute_test`,
            test,
            'POST'
        )
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    }


    public getQuestionsNotAnswered(questions:Array<any>) {
        let questionsNotAnswered =Array()
        questions.forEach((question, index) => {
            if (!this.validateComponent(question))
                questionsNotAnswered.push({questionIndex:index+1,question:question})
        });
        return questionsNotAnswered
    };



    validateComponent(question:any) {
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
                    //ADD OTHERS QUESTION TYPES
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
    //ADD OTHERS QUESTION VALIDATION FUNCTIONS
}