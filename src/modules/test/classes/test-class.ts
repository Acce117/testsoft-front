
import { userStore } from "@/modules/security/store/user-store";
import type { Question } from "./question-class";
import { useSendRequest } from "@/common/utils/fetch";

export class Test {
    questions: { [key: string]: Question<any> };
    name: string | undefined;
    type: string | number | undefined

    public constructor(readonly id_test: number | string ) {
        this.questions = {};
    }

    public sendTest() {
        const test = {
            user_ci: userStore().ci,
            ...this
        };

        return useSendRequest(
            true, 
            `${import.meta.env.VITE_API_PATH}/gestion/test/execute_test`,
            test,
            'POST'
        );
    }


    public getQuestionsNotAnswered(questions: Array<any>) {
        let questionsNotAnswered = Array()
        questions.forEach((question, index) => {
            if (!this.validateComponent(question.id_question))
                questionsNotAnswered.push({ questionIndex: index + 1, question: question })
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