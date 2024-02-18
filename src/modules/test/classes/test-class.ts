import { sendRequest } from "@/common/utils/fetch";
import { userStore } from "@/modules/security/store/user-store";
import type { Question } from "./question-class";

export class Test {
    questions: { [key: string]: Question<any> };

    public constructor(readonly id_test: number|string) {
        this.questions = {};
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



    validateComponent(id_question: string | number) {
        let isComponentValid
        if (!this.questions.hasOwnProperty(id_question))
            isComponentValid = false
        else
            isComponentValid = this.questions[id_question].validateQuestion();
        return isComponentValid
    };

}